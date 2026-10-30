import "./SidebarButtons.css";
import { Tooltip } from "react-tooltip";
import { useLocation } from "react-router-dom";
import React from "react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { Language } from "../../types/enums";

function SidebarButtons() {
  const { darkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, text } = useLanguage();

  const languageImage =
    language === Language.ENGLISH
      ? `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/flag-uk.svg`
      : `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/flag-slo.webp`;
  const darkModeImage = darkMode
    ? `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/dark-mode.webp`
    : `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/light-mode.webp`;
  const darkModeTooltip = darkMode
    ? text.GENERAL.toggle_lightMode
    : text.GENERAL.toggle_darkMode;
  const location = useLocation();
  const excludedPaths = ["privacy", "uninstall"];
  if (excludedPaths.some((path) => location.pathname.includes(path))) {
    return null;
  }
  return (
    <div className="sidebar-buttons">
      <button
        type="button"
        id="language-btn"
        className="sidebar-button"
        onClick={toggleLanguage}
        aria-label={text.GENERAL.change_language}
        data-tooltip-id="lang-btn-tooltip"
        data-tooltip-content={text.GENERAL.change_language}
        data-tooltip-place="left"
      >
        <img className="language-btn" src={languageImage} alt="" />
      </button>
      <Tooltip id="lang-btn-tooltip" />

      <button
        type="button"
        id="darkmode-btn"
        className="sidebar-button"
        onClick={toggleTheme}
        aria-label={darkModeTooltip}
        data-tooltip-id="darkMode-btn-tooltip"
        data-tooltip-content={darkModeTooltip}
        data-tooltip-place="left"
      >
        <img className="darkmode-btn" src={darkModeImage} alt="" />
      </button>
      <Tooltip id="darkMode-btn-tooltip" />
    </div>
  );
}
export default SidebarButtons;
