// Store listings of the extensions, tagged so installs from this site show up in the
// stores' traffic reports. Fallback user counts are the Chrome Web Store numbers on
// 2026-11-07; pages show the live count from the website API when it answers.
const UTM = "utm_source=website&utm_medium=landing-page";

export type ExtensionInfo = {
  name: string;
  page: string;
  chromeId: string;
  chromeUrl: string;
  firefoxUrl: string;
  githubUrl: string;
  fallbackUsers: number;
};

export const SEARCH_AUTOMATIC_REWARDS: ExtensionInfo = {
  name: "Search Automatic Rewards",
  page: "/microsoft-automatic-rewards",
  chromeId: "ocmmbfdhomnkljmjkmafegefcgcfkefo",
  chromeUrl: `https://chromewebstore.google.com/detail/microsoft-automatic-rewar/ocmmbfdhomnkljmjkmafegefcgcfkefo?${UTM}`,
  firefoxUrl: `https://addons.mozilla.org/firefox/addon/microsoft-automatic-rewards/?${UTM}`,
  githubUrl: "https://github.com/spin311/MicrosoftRewardsWebsite",
  fallbackUsers: 30000,
};

export const FREE_GAME_CLAIMER: ExtensionInfo = {
  name: "Free Game Claimer",
  page: "/free-game-claimer",
  chromeId: "mndghaafpgiinfecbbbcppppiblmjepk",
  chromeUrl: `https://chromewebstore.google.com/detail/free-game-claimer-for-ste/mndghaafpgiinfecbbbcppppiblmjepk?${UTM}`,
  firefoxUrl: `https://addons.mozilla.org/firefox/addon/free-game-claime-steam-epic/?${UTM}`,
  githubUrl: "https://github.com/spin311/epic-free-games-claim",
  fallbackUsers: 5000,
};

export const PROLIFIC_STUDIES_NOTIFIER: ExtensionInfo = {
  name: "Prolific Studies Notifier",
  page: "/prolific-studies-notifier",
  chromeId: "mlicfddkgjkeajfgkihplfbgpmbonbao",
  chromeUrl: `https://chromewebstore.google.com/detail/prolific-studies-notifier/mlicfddkgjkeajfgkihplfbgpmbonbao?${UTM}`,
  firefoxUrl: `https://addons.mozilla.org/firefox/addon/prolific-studies-notifier/?${UTM}`,
  githubUrl: "https://github.com/spin311/ProlificAutomaticStudies",
  fallbackUsers: 7000,
};

export const GITHUB_SPONSORS_URL =
  "https://github.com/sponsors/spin311?metadata_source=website-donate";
export const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=4WXEWMN3QGLGY";
export const KOFI_URL = "https://ko-fi.com/N4N31FBSAV";
export const BITCOIN_ADDRESS = "bc1qqy8nv2d8smd0h0lf95uapajqtdzy9j8n0v7rmh";
