import React from "react";
import  './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFile} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import {useLanguage} from "../../context/LanguageContext";

function Header(){
    const {language} = useLanguage();
    const cvLink = language === "en" ?
        "/assets/CV/CV_ENG.pdf " :
        "/assets/CV/CV_SLO.pdf";

    return (
        <header className="App-header">
            <h2>Svit Spindler</h2>

            <div className="header-links">
                <a href="https://github.com/spin311" target="_blank">Github <FontAwesomeIcon icon={faGithub} /></a>
                <a href="mailto:svit.spindler@gmail.com">E-Mail <FontAwesomeIcon icon={faEnvelope} /> </a>
                <a href={cvLink}>CV <FontAwesomeIcon icon={faFile} /> </a>
            </div>



        </header>
    );
}
export default Header;