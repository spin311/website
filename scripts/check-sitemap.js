const fs = require('fs');
const path = require('path');

// --- Load route paths from index.js ---
const indexPath = path.resolve(__dirname, '../src/index.tsx');
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

// --- Compare sets ---
const missingFromSitemap = [...routes].filter(r => !sitemapUrls.has(r) && r !== '*');

if (missingFromSitemap.length > 0) {
    console.error('❌ The following routes are missing from the sitemap:');
    missingFromSitemap.forEach(route => console.error(`  - ${route}`));
    process.exit(1);
} else {
    console.log('✅ All routes are present in the sitemap.');
}