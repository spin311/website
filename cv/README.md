# CV sources

`en.html` and `sl.html` are the English and Slovenian CVs; both use `cv.css`. The text lives in the
HTML, so an update is a text edit.

1. Edit `en.html` and `sl.html` (keep them in sync). `<title>` becomes the PDF title.
2. Run `npm ci` once, then `npm run build-cv`. It prints both files to `public/assets/CV/CV_ENG.pdf`
   and `CV_SLO.pdf` (A4) and sets the PDF author, subject and keywords.
3. Set `CHROME_PATH` if the Playwright Chromium is not at the default path in `scripts/build-cv.mjs`.
4. Open the PDFs and check that each CV is 2 pages and no entry is cut off. Commit the PDFs.
