import "./SidebarButtons.css"
import {useMemo} from "react";
import {useTheme} from "../../context/ThemeContext";
import {useLanguage} from "../../context/LanguageContext";
import { Tooltip } from 'react-tooltip'

function SidebarButtons() {
    const { darkMode, toggleTheme } = useTheme();
    const {language, changeLanguage, text} = useLanguage();

    let languageImage = language === "en" ? "/assets/images/flag-uk.svg" : "/assets/images/flag-slo.png";
    let darkModeImage = darkMode ? "/assets/images/dark-mode.png" : "/assets/images/light-mode.png";
    let darkModeTooltip = darkMode ? text.GENERAL.toggle_lightMode : text.GENERAL.toggle_darkMode;

  return (
      <div className="sidebar-buttons">
          <img id="language-btn"
               className="btn language-btn"
               src={languageImage}
                onClick={changeLanguage}
               data-tooltip-id="lang-btn-tooltip"
               data-tooltip-content={text.GENERAL.change_language}
               data-tooltip-place="left"
               alt="language-image" />
          <Tooltip id="lang-btn-tooltip"/>

          <img id="darkmode-btn"
               className="btn darkmode-btn"
               src={darkModeImage}
               onClick={toggleTheme}
               data-tooltip-id="darkMode-btn-tooltip"
               data-tooltip-content={darkModeTooltip}
               data-tooltip-place="left"
               alt="darkmode-image" />
            <Tooltip id="darkMode-btn-tooltip"/>
      </div>
  );
}
export default SidebarButtons;