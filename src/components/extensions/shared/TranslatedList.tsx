import React from "react";

import { useLanguage } from "../../../context/LanguageContext";

/** ["step1", "step2", …] for translation groups that number their entries. */
export function numberedKeys(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
}

type TranslatedListProps = {
  group: string;
  keys: string[];
  ordered?: boolean;
  className?: string;
};

/** A list whose items are HTML strings from one translation group. */
function TranslatedList({
  group,
  keys,
  ordered = false,
  className = "ext-list",
}: TranslatedListProps) {
  const { text, formatHtml } = useLanguage();
  const items = keys.map((key) => (
    <li key={key}>{formatHtml(text[group][key])}</li>
  ));
  return ordered ? (
    <ol className={className}>{items}</ol>
  ) : (
    <ul className={className}>{items}</ul>
  );
}

export default TranslatedList;
