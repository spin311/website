import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons/faPaypal";

import { useLanguage } from "../../../context/LanguageContext";
import { GITHUB_SPONSORS_URL, KOFI_URL, PAYPAL_URL } from "../extensionInfo";
import Bitcoin from "./bitcoin/Bitcoin";

// Mirrors the monthly tiers on github.com/sponsors/spin311: update both together.
const TIER_KEYS = ["tier1", "tier2", "tier3"];

/** GitHub Sponsors first (recurring support), then one-time options. */
function DonateOptions() {
  const { text, formatHtml } = useLanguage();
  return (
    <div className="donate-options">
      <div className="donate-card donate-sponsors">
        <h3>
          <FontAwesomeIcon icon={faHeart} className="donate-heart" />
          {text.DONATE.sponsors_title}
        </h3>
        <p>{text.DONATE.sponsors_text}</p>
        <ul className="donate-tiers">
          {TIER_KEYS.map((key) => (
            <li key={key}>{formatHtml(text.DONATE[key])}</li>
          ))}
        </ul>
        <a
          className="donate-button donate-button-sponsor"
          href={GITHUB_SPONSORS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faHeart} />
          {text.DONATE.sponsors_button}
        </a>
        <p className="donate-small">{text.DONATE.sponsors_other}</p>
      </div>

      <div className="donate-card">
        <h3>{text.DONATE.once_title}</h3>
        <div className="donate-buttons">
          <a
            className="donate-button"
            href={PAYPAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faPaypal} className="donate-paypal-icon" />
            {text.DONATE.paypal}
          </a>
          <a
            className="donate-button"
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="donate-kofi-icon"
              src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/ko-fi.svg`}
              alt=""
              width={20}
              height={20}
            />
            {text.DONATE.kofi}
          </a>
        </div>
        <p className="donate-small">{text.DONATE.once_text}</p>
        <Bitcoin />
      </div>
    </div>
  );
}

export default DonateOptions;
