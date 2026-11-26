// Renders the share images in public/assets/og/ from scripts/og/template.html.
// Not part of the Netlify build: run it by hand when a page's share image should change
// and commit the PNGs. See scripts/og/README.txt.
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../../public/assets/og");
const variants = ["home", "free-game-claimer", "prolific-studies-notifier"];

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH ?? "playwright-core");

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const variant of variants) {
  await page.goto(`${pathToFileURL(path.join(here, "template.html")).href}?v=${variant}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${variant}.png`) });
  console.log(`wrote public/assets/og/${variant}.png`);
}
await browser.close();
