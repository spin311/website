import "./SidebarButtons.css"
import {useTheme} from "../../context/ThemeContext";
import {useLanguage} from "../../context/LanguageContext";
import { Tooltip } from 'react-tooltip'

function SidebarButtons() {
    const { darkMode, toggleTheme } = useTheme();
    const {language, changeLanguage, text} = useLanguage();

    let languageImage = language === "en" ? `${process.env.PUBLIC_URL}/assets/images/flag-uk.svg` : `${process.env.PUBLIC_URL}/assets/images/flag-slo.png`;
    let darkModeImage = darkMode ? `${process.env.PUBLIC_URL}/assets/images/dark-mode.png` : `${process.env.PUBLIC_URL}/assets/images/light-mode.png`;
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
               alt={`Button to change language to ${language === "en" ? "Slovenian" : "English"}`} />
          <Tooltip id="lang-btn-tooltip"/>

          <img id="darkmode-btn"
               className="btn darkmode-btn"
               src={darkModeImage}
               onClick={toggleTheme}
               data-tooltip-id="darkMode-btn-tooltip"
               data-tooltip-content={darkModeTooltip}
               data-tooltip-place="left"
               alt={`Button to toggle ${darkMode ? "light" : "dark"} mode`} />
            <Tooltip id="darkMode-btn-tooltip"/>
      </div>
  );
}
export default SidebarButtons;