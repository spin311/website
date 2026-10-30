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

export default defineConfig({
  plugins: [react(), inlineStylesheets()],
  build: {
    outDir: "build", // keep same output as CRA
    // Hashed build output, kept apart from the unhashed files in public/assets so
    // netlify.toml can cache it as immutable
    assetsDir: "static",
    sourcemap: true,
    // Fonts come in unicode-range subsets the browser fetches only when a page needs
    // them; inlining the small ones would put every subset into index.html instead.
    assetsInlineLimit: (filePath) =>
      /\.woff2?$/.test(filePath) ? false : undefined,
  },
});
