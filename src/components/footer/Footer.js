import {useLanguage} from "../../context/LanguageContext";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.css";

function Footer() {
    let {text} = useLanguage();
  return (
    <footer>
      <p className="footer"> <span>{text.GENERAL.made_with} </span>
          <a href="https://github.com/spin311/website" target="_blank" rel="noopener noreferrer" className="ghLink">{text.GENERAL.gh_code} <FontAwesomeIcon icon={faGithub}/></a></p>
    </footer>
  );
}
export default Footer;