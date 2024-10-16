import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Experience.css";
import {useLanguage} from "../../../context/LanguageContext";

function Experience({title, company, desc, years, website, logo}) {
    const {text} = useLanguage();
    return (
        <div>
        <h4 className="ext-title">{title}</h4>
    <div className="xp-info">
        <a href={website} target="_blank" rel="noopener noreferrer">
            <p><FontAwesomeIcon icon={faGlobe}/> {text.GENERAL.website}</p>
        </a>
        <span>{years}</span>
    </div>
    <p className="mt-0">{company} <img className="company-logo" src={logo} alt="company_logo"/></p>
    <p>{desc}</p>
        </div>
);
}

export default Experience;