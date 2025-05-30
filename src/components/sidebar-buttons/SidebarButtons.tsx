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
    language === "en"
      ? `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/flag-uk.svg`
      : `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/flag-slo.png`;
  const darkModeImage = darkMode
    ? `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/dark-mode.png`
    : `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/light-mode.png`;
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
      <img
        id="language-btn"
        className="btn language-btn"
        src={languageImage}
        onClick={toggleLanguage}
        data-tooltip-id="lang-btn-tooltip"
        data-tooltip-content={text.GENERAL.change_language}
        data-tooltip-place="left"
        alt={`Button to change language to ${language === Language.ENGLISH ? "Slovenian" : "English"}`}
      />
      <Tooltip id="lang-btn-tooltip" />

      <img
        id="darkmode-btn"
        className="btn darkmode-btn"
        src={darkModeImage}
        onClick={toggleTheme}
        data-tooltip-id="darkMode-btn-tooltip"
        data-tooltip-content={darkModeTooltip}
        data-tooltip-place="left"
        alt={`Button to toggle ${darkMode ? "light" : "dark"} mode`}
      />
      <Tooltip id="darkMode-btn-tooltip" />
    </div>
  );
}
export default SidebarButtons;
