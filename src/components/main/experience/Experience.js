import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Experience.css";
import {useLanguage} from "../../../context/LanguageContext";

function Experience({title, company, desc, years, website, logo}) {
    const {text} = useLanguage();
    return (
        <div>
            <div className="xp-info">
            <h3 className="ext-title">{title}</h3>
                <p className="company">{company} <img className="company-logo" src={logo} alt="company_logo"/></p>
                <span className="year">
                    <b>{years} </b>
                </span>
                <a href={website} target="_blank" rel="noopener noreferrer" className="mt-0 website">
                    <FontAwesomeIcon icon={faGlobe}/> {text.GENERAL.website}
                </a>
            </div>

            <ul className="ex-desc">
                {desc.map((d, index) => (
                    <li key={index}>{d}</li>
                ))}
            </ul>
        </div>
)
    ;
}

export default Experience;