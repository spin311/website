// Writes the sitemap. `npm run build` runs it with build/sitemap.xml so <lastmod> is the
// build date; without an argument it refreshes the committed public/sitemap.xml.
// Pages with noindex (see NOINDEX_PATHS in src/seo/routes.ts) stay out of it.
const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { dirname, resolve } = require('path');

const lastmod = new Date().toISOString().slice(0, 10);

// Define links for your routes
const links = [
    { url: '/' },
    { url: '/contact' },
    { url: '/donate' },
    { url: '/microsoft-automatic-rewards' },
    { url: '/microsoft-automatic-rewards/mobile/privacy' },
    { url: '/microsoft-automatic-rewards/mobile/website' },
    { url: '/microsoft-automatic-rewards/mobile/test-app' },
    { url: '/prolific-studies-notifier' },
    { url: '/free-game-claimer' },
].map((link) => ({ ...link, lastmod }));

// Create the stream and define your site hostname
const sitemap = new SitemapStream({ hostname: 'https://svitspindler.com' });

const sitemapPath = process.argv[2]
    ? resolve(process.argv[2])
    : resolve(__dirname, '..', 'public', 'sitemap.xml');

const outputDir = dirname(sitemapPath);
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

// Write sitemap
streamToPromise(sitemap)
    .then((data) => {
        writeFileSync(sitemapPath, data.toString());
        console.log(`✅ Sitemap successfully created at ${sitemapPath}`);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Push URLs into the stream
links.forEach(link => sitemap.write(link));
sitemap.end();
