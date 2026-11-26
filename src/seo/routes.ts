import enText from "../assets/translations/en.json";
import {
  FREE_GAME_CLAIMER,
  PROLIFIC_STUDIES_NOTIFIER,
  SEARCH_AUTOMATIC_REWARDS,
  type ExtensionInfo,
} from "../components/extensions/extensionInfo";

/**
 * Single source of every page's <head> data. The prerender (scripts/prerender.mjs, through
 * src/entry-server.tsx) and the client's <RouteMeta> both read it, so the HTML that
 * crawlers get and what the app sets after it starts can't drift apart.
 */

export type Translations = Record<string, Record<string, string>>;

export const SITE_URL = "https://svitspindler.com";
export const SITE_NAME = "Svit Spindler";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Pages that crawlers should not index; also left out of the sitemap. */
export const NOINDEX_PATHS = ["/uninstall"];

type ShareImage = "home" | "free-game-claimer" | "prolific-studies-notifier";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  noindex: boolean;
  image: { url: string; alt: string; width: number; height: number };
  jsonLd: object[];
};

type RouteDefinition = {
  path: string;
  /** Title and description; translations are passed so extension pages follow the language. */
  meta: (text: Translations) => { title: string; description: string };
  image?: ShareImage;
  jsonLd?: (meta: { title: string; description: string }) => object[];
};

const HOME_DESCRIPTION =
  "Full-stack software engineer in Ljubljana working with Java, Spring Boot, Kotlin, TypeScript and React. Builder of Digitalna Košarica and browser extensions with 40,000+ users.";

const IMAGE_ALTS: Record<ShareImage, string> = {
  home: "Svit Spindler, full-stack software engineer in Ljubljana",
  "free-game-claimer":
    "Free Game Claimer, a browser extension that claims free games from Epic, Steam, GOG, IndieGala and Prime Gaming",
  "prolific-studies-notifier":
    "Prolific Studies Notifier, a browser extension that alerts you to new Prolific studies",
};

const withoutQuery = (url: string) => url.split("?")[0];

const personReference = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

const person = {
  ...personReference,
  jobTitle: "Full-Stack Software Engineer",
  image: `${SITE_URL}/assets/images/profile@2x.webp`,
  email: "mailto:svit.spindler@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ljubljana",
    addressCountry: "SI",
  },
  worksFor: {
    "@type": "Organization",
    name: "Opti Solutions",
    url: "https://opti-solutions.si/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Ljubljana, Faculty of Computer and Information Science",
  },
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Kotlin",
    "TypeScript",
    "React",
    "Next.js",
    "PostgreSQL",
    "Docker",
  ],
  sameAs: [
    "https://www.linkedin.com/in/svit-spindler-591a7a28b/",
    "https://github.com/spin311",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  author: { "@id": PERSON_ID },
};

function softwareApplication(extension: ExtensionInfo) {
  const stores = [
    withoutQuery(extension.chromeUrl),
    withoutQuery(extension.firefoxUrl),
    extension.githubUrl,
  ];
  return ({ description }: { title: string; description: string }) => [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: extension.name,
      description,
      url: `${SITE_URL}${extension.page}`,
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome, Firefox",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      author: personReference,
      installUrl: stores[0],
      sameAs: stores,
    },
  ];
}

const ROUTES: RouteDefinition[] = [
  {
    path: "/",
    meta: () => ({
      title: "Svit Spindler, Full-Stack Software Engineer in Ljubljana",
      description: HOME_DESCRIPTION,
    }),
    jsonLd: () => [
      { "@context": "https://schema.org", ...person },
      { "@context": "https://schema.org", ...website },
    ],
  },
  {
    path: "/contact",
    meta: () => ({
      title: "Contact Svit Spindler",
      description:
        "Send Svit Spindler a message about work, a project or one of the browser extensions.",
    }),
  },
  {
    path: "/donate",
    meta: (text) => ({
      title: text.DONATE.page_meta_title,
      description: text.DONATE.page_meta_description,
    }),
  },
  {
    path: "/uninstall",
    meta: () => ({
      title: "Uninstall feedback | Svit Spindler",
      description:
        "Tell Svit Spindler why you uninstalled one of his browser extensions.",
    }),
  },
  {
    path: "/microsoft-automatic-rewards",
    meta: (text) => ({
      title: text.MICROSOFT.meta_title,
      description: text.MICROSOFT.meta_description,
    }),
    jsonLd: softwareApplication(SEARCH_AUTOMATIC_REWARDS),
  },
  {
    path: "/microsoft-automatic-rewards/mobile/privacy",
    meta: () => ({
      title: "Privacy policy of the Search Automatic Rewards app",
      description:
        "What data the Search Automatic Rewards mobile app by Svit Spindler collects and how it is used.",
    }),
  },
  {
    path: "/microsoft-automatic-rewards/mobile/website",
    meta: () => ({
      title: "Search Automatic Rewards on your phone's browser",
      description:
        "Website version of Search Automatic Rewards for mobile devices. It opens new Bing tabs to run your daily searches.",
    }),
  },
  {
    path: "/microsoft-automatic-rewards/mobile/test-app",
    meta: () => ({
      title: "Search Automatic Rewards mobile app",
      description:
        "Open the Search Automatic Rewards mobile app on your phone: scan the QR code or use the website version.",
    }),
  },
  {
    path: "/prolific-studies-notifier",
    meta: (text) => ({
      title: text.PROLIFIC.meta_title,
      description: text.PROLIFIC.meta_description,
    }),
    image: "prolific-studies-notifier",
    jsonLd: softwareApplication(PROLIFIC_STUDIES_NOTIFIER),
  },
  {
    path: "/free-game-claimer",
    meta: (text) => ({
      title: text.CLAIMER.meta_title,
      description: text.CLAIMER.meta_description,
    }),
    image: "free-game-claimer",
    jsonLd: softwareApplication(FREE_GAME_CLAIMER),
  },
];

/** Not a route of its own: the page behind the `*` route and Netlify's 404. */
export const NOT_FOUND_PATH = "/404";
const NOT_FOUND: RouteDefinition = {
  path: NOT_FOUND_PATH,
  meta: (text) => ({
    title: `404 ${text.GENERAL.not_found} | ${SITE_NAME}`,
    description: "This page does not exist.",
  }),
};

/** Paths the prerender writes a page for, with the not-found page last. */
export const PRERENDER_PATHS = ROUTES.map((route) => route.path);

function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/** Everything a page puts in <head>. `text` is the current language's translations. */
export function getPageMeta(
  path: string,
  text: Translations = enText as Translations,
): PageMeta {
  const route =
    ROUTES.find((candidate) => candidate.path === path) ?? NOT_FOUND;
  const meta = route.meta(text);
  const image = route.image ?? "home";
  return {
    path: route.path,
    ...meta,
    canonical: canonicalUrl(route.path),
    noindex: route === NOT_FOUND || NOINDEX_PATHS.includes(route.path),
    image: {
      url: `${SITE_URL}/assets/og/${image}.png`,
      alt: IMAGE_ALTS[image],
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    },
    jsonLd: route.jsonLd?.(meta) ?? [],
  };
}
