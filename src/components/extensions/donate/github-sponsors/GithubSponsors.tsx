import React from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import "../Donate.css";

// GitHub's embeddable sponsor card: avatar, short bio and a Sponsor button.
const SPONSOR_CARD_URL = "https://github.com/sponsors/spin311/card";
// Plain link for when a blocker or outage keeps the card from loading. Its
// metadata_source shows up in GitHub Sponsors exports.
const SPONSOR_PAGE_URL =
  "https://github.com/sponsors/spin311?metadata_source=website-donate";

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
      <a
        href={SPONSOR_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="github-sponsors-link"
      >
        {text.EXTENSION.github_sponsors_link}
      </a>
    </div>
  );
}

export default GithubSponsors;
