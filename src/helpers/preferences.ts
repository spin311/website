import { isLanguage, Language } from "../types/enums";

const LANGUAGE_KEY = "language";
const DARK_MODE_KEY = "darkMode";
const WEBSITE_FORM_KEY = "websiteFormInputs";
const WEBSITE_FORM_PATH = "/microsoft-automatic-rewards/mobile/website";

/** localStorage read that is safe on the server and in browsers that block storage. */
export function readStorage(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readStoredLanguage(): Language {
  const stored = readStorage(LANGUAGE_KEY);
  return isLanguage(stored) ? stored : Language.ENGLISH;
}

export function readStoredDarkMode(): boolean {
  const stored = readStorage(DARK_MODE_KEY);
  if (!stored) {
    return false;
  }
  try {
    return JSON.parse(stored) === true;
  } catch {
    return false;
  }
}

/**
 * The prerendered HTML is the default visit: English, light theme, nothing saved.
 * Hydrating it for any other visitor would mismatch, so those visitors get a client
 * render instead.
 */
export function canHydratePrerenderedHtml(
  pathname: string,
  search: string,
): boolean {
  const langParam = new URLSearchParams(search).get("lang");
  if (isLanguage(langParam) && langParam !== Language.ENGLISH) {
    return false;
  }
  if (readStoredLanguage() !== Language.ENGLISH || readStoredDarkMode()) {
    return false;
  }
  // The mobile-searches form restores its last inputs from localStorage
  return !(
    pathname.startsWith(WEBSITE_FORM_PATH) &&
    readStorage(WEBSITE_FORM_KEY) !== null
  );
}
