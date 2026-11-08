import React from "react";

import { useLanguage } from "../../../context/LanguageContext";

type FaqListProps = {
  group: string;
  count: number;
};

/** Questions `q1…qN` and answers `a1…aN` of a translation group, as disclosures. */
function FaqList({ group, count }: FaqListProps) {
  const { text, formatHtml } = useLanguage();
  const numbers = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className="ext-faq">
      {numbers.map((n) => (
        <details key={n}>
          <summary>{text[group][`q${n}`]}</summary>
          <p>{formatHtml(text[group][`a${n}`])}</p>
        </details>
      ))}
    </div>
  );
}

export default FaqList;
