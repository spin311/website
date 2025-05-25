import { useLanguage } from "../../../../context/LanguageContext";
import React from "react";
import "./Features.css";
import { Link } from "react-router-dom";

function Features({ className = "" }: { className?: string }) {
  const { text } = useLanguage();
  return (
    <div id="features" className={className}>
      <h2 className="f-title">{text.GENERAL.features}</h2>
      <ul className="f-list">
        <li>{text.MICROSOFT.feature1}</li>
        <li>{text.MICROSOFT.feature2}</li>
        <li>{text.MICROSOFT.feature3}</li>
        <li>{text.MICROSOFT.feature4}</li>
        <li>{text.MICROSOFT.feature5}</li>
        <li className="underline-link">
          <Link
            to={`/contact?subject=${encodeURIComponent("Microsoft Rewards feature suggestion")}`}
          >
            {text.EXTENSION.new_feature}
          </Link>
        </li>
      </ul>
      <img
        src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/microsoft-popup.png`}
        alt="microsoft popup"
        className="f-image"
      />
    </div>
  );
}

export default Features;
