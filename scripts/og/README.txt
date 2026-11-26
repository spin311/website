Share images (Open Graph / Twitter cards) for the site, 1200x630 PNG in public/assets/og/.
src/seo/routes.ts picks one per page: home.png for most pages, the extension's own image
for /free-game-claimer and /prolific-studies-notifier.

They are generated from template.html and committed; this is not part of `npm run build`.
To change one, edit template.html (the three variants are the .card blocks) and run, from the
repository root, with any Playwright installation and its Chromium:

  PLAYWRIGHT_CORE_PATH="$(npm root -g)/@playwright/cli/node_modules/playwright-core" \
  CHROME_PATH="$HOME/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
  node scripts/og/generate.mjs

(PLAYWRIGHT_CORE_PATH can be left out when playwright-core resolves from the repository.)
Then shrink them if one is over ~150 KB, for example with pngquant or
`python3 -c "from PIL import Image; im = Image.open(f).convert('RGB').quantize(256); im.save(f, optimize=True)"`.
Never put Microsoft's logo, its four-colour squares or its name in an image: see
the Microsoft Rewards notes in the marketing plan.
