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
        <div id="home">
            <header className="App-header">
                <h2 className="name">Svit Spindler</h2>

                <div className="header-links">
                    <a href="https://github.com/spin311" target="_blank" rel="noopener noreferrer">Github <FontAwesomeIcon icon={faGithub} /></a>
                    <a href="mailto:svit.spindler@gmail.com">E-Mail <FontAwesomeIcon icon={faEnvelope} /> </a>
                    <a href={cvLink} target="_blank" rel="noopener noreferrer">CV <FontAwesomeIcon icon={faFile} /> </a>
                </div>
            </header>
        </div>
    );
}
export default Header;