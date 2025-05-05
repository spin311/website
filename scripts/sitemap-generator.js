const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve } = require('path');

// Define links for your routes
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/donate', changefreq: 'monthly' },
    { url: '/uninstall', changefreq: 'monthly' },
    { url: '/microsoft-automatic-rewards', changefreq: 'monthly' },
    { url: '/microsoft-automatic-rewards/mobile/privacy', changefreq: 'monthly' },
    { url: '/microsoft-automatic-rewards/mobile/website', changefreq: 'monthly' },
    { url: '/microsoft-automatic-rewards/mobile/test-app', changefreq: 'monthly' },
];

// Create the stream and define your site hostname
const sitemap = new SitemapStream({ hostname: 'https://svitspindler.com' }); // Replace with your real domain

// Absolute path to public/sitemap.xml
const sitemapPath = resolve(__dirname, '..', 'public', 'sitemap.xml');

// Ensure public directory exists
const publicDir = resolve(__dirname, '..', 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir);

// Write sitemap
streamToPromise(sitemap)
    .then((data) => {
        writeFileSync(sitemapPath, data.toString());
        console.log(`✅ Sitemap successfully created at ${sitemapPath}`);
    })
    .catch(console.error);

// Push URLs into the stream
links.forEach(link => sitemap.write(link));
sitemap.end();
