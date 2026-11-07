import React from "react";

import { useLanguage } from "../../../context/LanguageContext";

const PRIVACY_KEYS = [
  "privacy1",
  "privacy2",
  "privacy3",
  "privacy4",
  "privacy5",
];

function Privacy() {
  const { text, formatHtml } = useLanguage();
  return (
    <div id="privacy">
      <h2>{text.CLAIMER.privacy_title}</h2>
      <ul className="claimer-list underline-link">
        {PRIVACY_KEYS.map((key) => (
          <li key={key}>{formatHtml(text.CLAIMER[key])}</li>
        ))}
      </ul>
    </div>
  );
}

export default Privacy;
