import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// The page shows nothing until its JS runs, so a separate stylesheet request only
// delays first paint. Inline the stylesheets index.html links into <style> tags.
function inlineStylesheets(): Plugin {
  return {
    name: "inline-stylesheets",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = bundle["index.html"];
      if (html?.type !== "asset" || typeof html.source !== "string") {
        return;
      }
      html.source = html.source.replace(
        /<link rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g,
        (tag, fileName: string) => {
          const stylesheet = bundle[fileName];
          if (stylesheet?.type !== "asset") {
            return tag;
          }
          delete bundle[fileName];
          return `<style>${String(stylesheet.source)}</style>`;
        },
      );
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), inlineStylesheets()],
  // The prerender (scripts/prerender.mjs) imports the server bundle in plain Node, where
  // react-helmet and the JSON translations need bundling rather than a CJS/ESM import.
  ssr: { noExternal: true },
  build: {
    // The server bundle is a build tool, not a deploy artifact (see npm run build)
    outDir: isSsrBuild ? "dist-ssr" : "build", // client output keeps the CRA name
    // Hashed build output, kept apart from the unhashed files in public/assets so
    // netlify.toml can cache it as immutable
    assetsDir: "static",
    sourcemap: !isSsrBuild,
    // Pages are prerendered, so their markup is on screen before a route's JS chunk loads.
    // Route stylesheets must already be in index.html (inlined below), or the page
    // would first paint unstyled and jump when its chunk's CSS arrives.
    cssCodeSplit: false,
    // Fonts come in unicode-range subsets the browser fetches only when a page needs
    // them; inlining the small ones would put every subset into index.html instead.
    assetsInlineLimit: (filePath) =>
      /\.woff2?$/.test(filePath) ? false : undefined,
  },
}));
