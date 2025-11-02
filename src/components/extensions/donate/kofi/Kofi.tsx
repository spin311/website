import React from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import "../Donate.css";

function Kofi() {
  const { text } = useLanguage();

  return (
    <div className="donation-card">
      <div className="donation-title">
        Ko-fi
        <img
          className="donate-svg"
          src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/ko-fi.svg`}
          alt="ko-fi"
        />
      </div>
      <a
        href="https://ko-fi.com/N4N31FBSAV"
        target="_blank"
        rel="noopener noreferrer"
        className="kofi-button"
      >
        {text.WEBSITE.support_me} Ko-fi
      </a>
    </div>
  );
}

export default Kofi;
