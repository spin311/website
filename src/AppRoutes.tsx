import React, { ComponentType, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationProvider } from "./context/NotificationContext";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

type PageModule = { default: ComponentType };
type Page = ComponentType & { preload: () => Promise<unknown> };

/**
 * React.lazy that can be loaded ahead of rendering. Once `preload()` has resolved the page
 * renders without suspending, so a client render that replaces prerendered HTML
 * (src/index.tsx) never shows a blank frame while the route's chunk downloads.
 */
function lazyPage(load: () => Promise<PageModule>): Page {
  let loaded: ComponentType | undefined;
  const preload = () =>
    load().then((module) => {
      loaded = module.default;
      return module;
    });
  const Lazy = lazy(preload);
  const Page = () => {
    const Loaded = loaded;
    return Loaded ? <Loaded /> : <Lazy />;
  };
  return Object.assign(Page, { preload });
}

// Only the home page ships in the main bundle; every other route is fetched when visited.
const ContactMe = lazyPage(() => import("./components/contact-me/ContactMe"));
const NotFound = lazyPage(() => import("./components/not-found/NotFound"));
const MicrosoftAutomaticRewards = lazyPage(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/MicrosoftAutomaticRewards"
    ),
);
const DonatePage = lazyPage(
  () => import("./components/extensions/donate/DonatePage"),
);
const Uninstall = lazyPage(
  () => import("./components/extensions/uninstall/uninstall"),
);
const Website = lazyPage(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/website/website"
    ),
);
const Privacy = lazyPage(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/privacy/Privacy"
    ),
);
const TestList = lazyPage(
  () =>
    import(
      "./components/extensions/microsoftAutomaticRewards/mobile/test-list/TestList"
    ),
);
const ProlificStudiesNotifier = lazyPage(
  () =>
    import(
      "./components/extensions/prolificStudiesNotifier/ProlificStudiesNotifier"
    ),
);

const FreeGameClaimer = lazyPage(
  () => import("./components/extensions/freeGameClaimer/FreeGameClaimer"),
);

const PAGES_BY_PATH: Record<string, Page> = {
  "/contact": ContactMe,
  "/donate": DonatePage,
  "/uninstall": Uninstall,
  "/microsoft-automatic-rewards": MicrosoftAutomaticRewards,
  "/microsoft-automatic-rewards/mobile/privacy": Privacy,
  "/microsoft-automatic-rewards/mobile/website": Website,
  "/microsoft-automatic-rewards/mobile/test-app": TestList,
  "/prolific-studies-notifier": ProlificStudiesNotifier,
  "/free-game-claimer": FreeGameClaimer,
};

/** Downloads the chunk of the page that `pathname` shows (the not-found page if none). */
export function preloadRoute(pathname: string): Promise<unknown> {
  return (PAGES_BY_PATH[pathname] ?? NotFound).preload();
}

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
