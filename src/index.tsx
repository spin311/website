import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/kay-pho-du/700.css";
import "@fontsource/poppins/400.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationProvider } from "./context/NotificationContext";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

// Only the home page ships in the main bundle; every other route is fetched when visited.
const ContactMe = lazy(() => import("./components/contact-me/ContactMe"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));
const MicrosoftAutomaticRewards = lazy(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/MicrosoftAutomaticRewards"
    ),
);
const Donate = lazy(() => import("./components/extensions/donate/Donate"));
const Uninstall = lazy(
  () => import("./components/extensions/uninstall/uninstall"),
);
const Website = lazy(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/website/website"
    ),
);
const Privacy = lazy(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/privacy/Privacy"
    ),
);
const TestList = lazy(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/test-list/TestList"
    ),
);
const ProlificStudiesNotifier = lazy(
  () =>
    import(
      "./components/extensions/prolificStudiesNotifier/ProlificStudiesNotifier"
    ),
);

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

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ScrollToTop />
            <SidebarButtons />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/contact" element={<ContactMe />} />
                <Route
                  path="/donate"
                  element={<Donate soloComponent={true} />}
                />
                <Route path="/uninstall" element={<Uninstall />} />
                <Route
                  path="/microsoft-automatic-rewards"
                  element={<MicrosoftAutomaticRewards />}
                />
                <Route
                  path="/microsoft-automatic-rewards/mobile/privacy"
                  element={<Privacy />}
                />
                <Route
                  path="/microsoft-automatic-rewards/mobile/website"
                  element={<Website />}
                />
                <Route
                  path="/microsoft-automatic-rewards/mobile/test-app"
                  element={<TestList />}
                />
                <Route
                  path="/prolific-studies-notifier"
                  element={<ProlificStudiesNotifier />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
