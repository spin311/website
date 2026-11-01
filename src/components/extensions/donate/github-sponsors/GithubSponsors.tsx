import React from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import "../Donate.css";

// GitHub's embeddable sponsor card: avatar, short bio and a Sponsor button.
const SPONSOR_CARD_URL = "https://github.com/sponsors/spin311/card";

function GithubSponsors() {
  const { text, formatHtml } = useLanguage();

  return (
    <div className="donation-card github-sponsors">
      <div className="donation-title">GitHub Sponsors</div>
      <p>{formatHtml(text.EXTENSION.github_sponsors)}</p>
      <iframe
        className="github-sponsors-card"
        src={SPONSOR_CARD_URL}
        title="Sponsor spin311"
        loading="lazy"
      />
    </div>
  );
}

export default GithubSponsors;
