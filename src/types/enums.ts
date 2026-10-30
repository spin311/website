export enum Language {
  ENGLISH = "en",
  SLOVENIAN = "sl",
}

export function isLanguage(value: string | null): value is Language {
  return Object.values(Language).includes(value as Language);
}
