import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import "@fontsource/kay-pho-du/700.css";
import "@fontsource/poppins/400.css";
import "./index.css";
import "./fontAwesome";
import { BrowserRouter } from "react-router-dom";

import AppRoutes, { preloadRoute } from "./AppRoutes";
import { canHydratePrerenderedHtml } from "./helpers/preferences";

// A deploy replaces the hashed route chunks, so a tab opened before it can ask for
// files that no longer exist. Reload to pick up the new index.html, at most once per
// RELOAD_GUARD_MS so a chunk that is really missing can't cause a reload loop.
const RELOAD_GUARD_MS = 10_000;
const LAST_RELOAD_KEY = "lastChunkErrorReload";
window.addEventListener("vite:preloadError", (event) => {
  const lastReload = Number(sessionStorage.getItem(LAST_RELOAD_KEY) ?? 0);
  if (Date.now() - lastReload < RELOAD_GUARD_MS) {
    return;
  }
  sessionStorage.setItem(LAST_RELOAD_KEY, String(Date.now()));
  event.preventDefault();
  window.location.reload();
});

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// Netlify serves every page prerendered (scripts/prerender.mjs). That HTML shows the
// default visit (English, light theme), so only visitors who match it can hydrate it;
// everyone else, and `vite dev` where #root is empty, gets a client render. The route's
// chunk is loaded first so the prerendered page stays on screen until the app can
// replace it, with no blank frame in between.
const { pathname, search } = window.location;
if (container.hasChildNodes() && canHydratePrerenderedHtml(pathname, search)) {
  hydrateRoot(container, app);
} else {
  const render = () => createRoot(container).render(app);
  preloadRoute(pathname.replace(/(.)\/$/, "$1")).then(render, render);
}
