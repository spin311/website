// Prints cv/en.html and cv/sl.html to public/assets/CV/*.pdf with Chromium.
// Usage: npm run build-cv   (set CHROME_PATH to use another browser binary)
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";
import { writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultChrome = path.join(
  homedir(),
  "Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
);
const executablePath = process.env.CHROME_PATH || defaultChrome;

const AUTHOR = "Svit Spindler";
const KEYWORDS = ["Java", "Spring Boot", "Kotlin", "TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "full-stack", "Ljubljana"];
const CVS = [
  {
    src: "cv/en.html",
    out: "public/assets/CV/CV_ENG.pdf",
    subject: "CV of Svit Spindler, full-stack software engineer in Ljubljana",
  },
  {
    src: "cv/sl.html",
    out: "public/assets/CV/CV_SLO.pdf",
    subject: "Življenjepis Svita Spindlerja, full-stack razvijalca programske opreme v Ljubljani",
  },
];

const browser = await chromium.launch({ executablePath });
try {
  for (const cv of CVS) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(path.join(root, cv.src)).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const title = await page.title();
    const printed = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    });
    await page.close();

    const pdf = await PDFDocument.load(printed);
    pdf.setTitle(title);
    pdf.setAuthor(AUTHOR);
    pdf.setSubject(cv.subject);
    pdf.setKeywords(KEYWORDS);
    pdf.setCreator("HTML sources in cv/, printed with Chromium");
    pdf.setProducer("pdf-lib");
    await writeFile(path.join(root, cv.out), await pdf.save());
    console.log(`${cv.src} -> ${cv.out} (${pdf.getPageCount()} pages)`);
  }
} finally {
  await browser.close();
}
