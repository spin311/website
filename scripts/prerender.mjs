// Writes every route's real HTML into build/, after `vite build` (client, build/) and
// `vite build --ssr` (server bundle, dist-ssr/). See "build" in package.json.
//
//   /           -> build/index.html
//   /foo        -> build/foo/index.html   (netlify.toml rewrites /foo to it, status 200)
//   not found   -> build/404.html         (netlify.toml's catch-all, status 404)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const serverEntry = path.join(root, "dist-ssr", "entry-server.mjs");

const HEAD_MARKER = "<!--prerender-head-->";
const ROOT_MARKER = '<div id="root"></div>';

const { render, PRERENDER_PATHS, NOT_FOUND_PATH } = await import(
  pathToFileURL(serverEntry).href
);

const template = await readFile(path.join(buildDir, "index.html"), "utf8");
for (const marker of [HEAD_MARKER, ROOT_MARKER]) {
  if (!template.includes(marker)) {
    throw new Error(`build/index.html has no ${marker}; cannot prerender`);
  }
}

function outputFile(urlPath) {
  if (urlPath === "/") return path.join(buildDir, "index.html");
  if (urlPath === NOT_FOUND_PATH) return path.join(buildDir, "404.html");
  return path.join(buildDir, urlPath, "index.html");
}

// Sequential: react-helmet keeps its collected tags in module state
for (const urlPath of [...PRERENDER_PATHS, NOT_FOUND_PATH]) {
  // The not-found page is the one the router answers for a path no route has
  const requestUrl = urlPath === NOT_FOUND_PATH ? "/page-that-does-not-exist" : urlPath;
  const { html, head } = await render(requestUrl);
  const page = template
    .replace(HEAD_MARKER, () => head)
    .replace(ROOT_MARKER, () => `<div id="root">${html}</div>`);
  const file = outputFile(urlPath);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`prerendered ${urlPath} -> ${path.relative(root, file)}`);
}
