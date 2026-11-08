import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import useExtensionUsers from "../../../hooks/useExtensionUsers";
import { Language } from "../../../types/enums";
import { ExtensionInfo } from "../extensionInfo";

type ExtensionFactsProps = {
  extension: ExtensionInfo;
  /** Translation keys in the EXTENSION group, e.g. "fact_free". */
  factKeys: string[];
};

export function formatUsers(users: number, language: Language): string {
  return users.toLocaleString(
    language === Language.ENGLISH ? "en-US" : "sl-SI",
  );
}

/** One line of facts under an extension's intro: users, browsers, price, license. */
function ExtensionFacts({ extension, factKeys }: ExtensionFactsProps) {
  const { text, language } = useLanguage();
  const users = useExtensionUsers(extension.chromeId, extension.fallbackUsers);
  const usersText = text.EXTENSION.fact_users.replace(
    "{users}",
    formatUsers(users, language),
  );
  return (
    <ul className="ext-facts" aria-label={text.EXTENSION.facts_label}>
      <li>{usersText}</li>
      {factKeys.map((key) => (
        <li key={key}>{text.EXTENSION[key]}</li>
      ))}
    </ul>
  );
}

export default ExtensionFacts;
