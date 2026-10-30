const fs = require('fs');
const path = require('path');

// --- Load route paths from index.tsx ---
const indexPath = path.resolve(__dirname, '../src/index.tsx');
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

// --- Load the SPA rewrites (status 200 to /index.html) from netlify.toml ---
const netlifyPath = path.resolve(__dirname, '../netlify.toml');
const netlifyContent = fs.readFileSync(netlifyPath, 'utf-8');

const rewriteRegex = /from\s*=\s*"([^"]+)"\s+to\s*=\s*"\/index\.html"\s+status\s*=\s*200\b/g;
const rewrites = new Set();
while ((match = rewriteRegex.exec(netlifyContent)) !== null) {
    rewrites.add(match[1]);
}

// --- Compare sets ---
const missingFromNetlify = [...routes].filter(r => !rewrites.has(r));
const unknownInNetlify = [...rewrites].filter(r => !routes.has(r));

if (missingFromNetlify.length > 0 || unknownInNetlify.length > 0) {
    if (missingFromNetlify.length > 0) {
        console.error('❌ These routes have no rewrite in netlify.toml, so Netlify would answer them with a 404:');
        missingFromNetlify.forEach(route => console.error(`  - ${route}`));
    }
    if (unknownInNetlify.length > 0) {
        console.error('❌ These netlify.toml rewrites match no route in src/index.tsx:');
        unknownInNetlify.forEach(route => console.error(`  - ${route}`));
    }
    process.exit(1);
} else {
    console.log('✅ All routes have a rewrite in netlify.toml.');
}
