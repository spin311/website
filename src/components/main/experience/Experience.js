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

                <p className="company">{company} <img className="company-logo" src={logo} alt="company_logo"/></p>


            <span> <b>{years} </b></span>
        </div>
    <a href={website} target="_blank" rel="noopener noreferrer">
        <p className="mt-0 website"><FontAwesomeIcon icon={faGlobe}/> {text.GENERAL.website}</p>
    </a>
        <p className="desc">{desc}</p>
    </div>
)
    ;
}

export default Experience;