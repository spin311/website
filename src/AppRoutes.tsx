import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

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
const DonatePage = lazy(
  () => import("./components/extensions/donate/DonatePage"),
);
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

const FreeGameClaimer = lazy(
  () => import("./components/extensions/freeGameClaimer/FreeGameClaimer"),
);

/**
 * The whole app below the router. The browser (src/index.tsx) wraps it in a
 * BrowserRouter and the prerender (src/entry-server.tsx) in a StaticRouter, so both
 * render the same tree. Keep every route's path in src/seo/routes.ts as well.
 */
function AppRoutes() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <ScrollToTop />
          <SidebarButtons />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/donate" element={<DonatePage />} />
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
              <Route path="/free-game-claimer" element={<FreeGameClaimer />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default AppRoutes;
