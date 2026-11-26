const fs = require('fs');
const path = require('path');

// --- Load route paths from AppRoutes.tsx ---
const indexPath = path.resolve(__dirname, '../src/AppRoutes.tsx');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

const routeRegex = /<Route\s+path="([^"]+)"/g;
const routes = new Set();
let match;
while ((match = routeRegex.exec(indexContent)) !== null) {
    // "/" is index.html itself and "*" is the 404 catch-all, so neither needs a rule
    if (match[1] !== '/' && match[1] !== '*') {
        routes.add(match[1]);
    }
}

// --- Load the rewrites (status 200 to the route's own prerendered file) from netlify.toml ---
const netlifyPath = path.resolve(__dirname, '../netlify.toml');
const netlifyContent = fs.readFileSync(netlifyPath, 'utf-8');

const rewriteRegex = /from\s*=\s*"([^"]+)"\s+to\s*=\s*"([^"]+)"\s+status\s*=\s*200\b/g;
const rewrites = new Set();
const wrongTarget = [];
while ((match = rewriteRegex.exec(netlifyContent)) !== null) {
    rewrites.add(match[1]);
    if (match[2] !== `${match[1]}/index.html`) {
        wrongTarget.push(`${match[1]} -> ${match[2]}`);
    }
}

// Every route needs page metadata in src/seo/routes.ts, or the prerender would give it
// the not-found page's head
const seoPath = path.resolve(__dirname, '../src/seo/routes.ts');
const seoContent = fs.readFileSync(seoPath, 'utf-8');
const seoPaths = new Set();
const seoRegex = /\bpath:\s*"([^"]+)"/g;
while ((match = seoRegex.exec(seoContent)) !== null) {
    seoPaths.add(match[1]);
}
const missingFromSeo = [...routes].filter(r => !seoPaths.has(r));

// --- Compare sets ---
const missingFromNetlify = [...routes].filter(r => !rewrites.has(r));
const unknownInNetlify = [...rewrites].filter(r => !routes.has(r));

if (
    missingFromNetlify.length > 0 ||
    unknownInNetlify.length > 0 ||
    wrongTarget.length > 0 ||
    missingFromSeo.length > 0
) {
    if (missingFromNetlify.length > 0) {
        console.error('❌ These routes have no rewrite in netlify.toml, so Netlify would answer them with a 404:');
        missingFromNetlify.forEach(route => console.error(`  - ${route}`));
    }
    if (unknownInNetlify.length > 0) {
        console.error('❌ These netlify.toml rewrites match no route in src/AppRoutes.tsx:');
        unknownInNetlify.forEach(route => console.error(`  - ${route}`));
    }
    if (wrongTarget.length > 0) {
        console.error('❌ These rewrites must point at their own prerendered file (<route>/index.html):');
        wrongTarget.forEach(route => console.error(`  - ${route}`));
    }
    if (missingFromSeo.length > 0) {
        console.error('❌ These routes have no entry in src/seo/routes.ts, so they would be prerendered without their own head tags:');
        missingFromSeo.forEach(route => console.error(`  - ${route}`));
    }
    process.exit(1);
} else {
    console.log('✅ All routes have a rewrite in netlify.toml and an entry in src/seo/routes.ts.');
}
