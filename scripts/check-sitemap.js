const fs = require('fs');
const path = require('path');

// --- Load route paths from AppRoutes.tsx ---
const indexPath = path.resolve(__dirname, '../src/AppRoutes.tsx');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

const routeRegex = /<Route\s+path="([^"]+)"/g;
const routes = new Set();
let match;
while ((match = routeRegex.exec(indexContent)) !== null) {
    routes.add(match[1]);
}

// --- Load sitemap links ---
const sitemapPath = path.resolve(__dirname, './sitemap-generator.js');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

const sitemapRegex = /url:\s*['"]([^'"]+)['"]/g;
const sitemapUrls = new Set();
while ((match = sitemapRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.add(match[1]);
}

// --- Pages that must stay out of the sitemap (noindex) ---
const seoContent = fs.readFileSync(path.resolve(__dirname, '../src/seo/routes.ts'), 'utf-8');
const noindexMatch = /NOINDEX_PATHS\s*=\s*\[([^\]]*)\]/.exec(seoContent);
const noindexPaths = new Set(
    noindexMatch ? [...noindexMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : []
);

// --- Compare sets ---
const missingFromSitemap = [...routes].filter(r => !sitemapUrls.has(r) && r !== '*' && !noindexPaths.has(r));
const noindexInSitemap = [...noindexPaths].filter(r => sitemapUrls.has(r));

if (missingFromSitemap.length > 0 || noindexInSitemap.length > 0) {
    if (missingFromSitemap.length > 0) {
        console.error('❌ The following routes are missing from the sitemap:');
        missingFromSitemap.forEach(route => console.error(`  - ${route}`));
    }
    if (noindexInSitemap.length > 0) {
        console.error('❌ The following noindex pages must not be in the sitemap:');
        noindexInSitemap.forEach(route => console.error(`  - ${route}`));
    }
    process.exit(1);
} else {
    console.log('✅ All routes are present in the sitemap.');
}