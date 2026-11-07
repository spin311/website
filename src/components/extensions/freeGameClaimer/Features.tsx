import React from "react";

import { useLanguage } from "../../../context/LanguageContext";

const FEATURE_KEYS = [
  "feature1",
  "feature2",
  "feature3",
  "feature4",
  "feature5",
  "feature6",
  "feature7",
  "feature8",
  "feature9",
];

function Features() {
  const { text, formatHtml } = useLanguage();
  return (
    <div id="features" className="claimer-features">
      <h2>{text.CLAIMER.what_title}</h2>
      <ul className="claimer-list">
        {FEATURE_KEYS.map((key) => (
          <li key={key}>{formatHtml(text.CLAIMER[key])}</li>
        ))}
      </ul>
    </div>
  );
}

export default Features;
