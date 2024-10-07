import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Experience.css";
import {useLanguage} from "../../../context/LanguageContext";

function Experience({title, company, desc, years, website}) {
    const {text} = useLanguage();
    return (
        <div>
        <h4>{title}</h4>
    <div className="xp-info">
        <a href={website} target="_blank">
            <p><FontAwesomeIcon icon={faGlobe}/> {text.EXPERIENCE.website}</p>
        </a>
        <span>{years}</span>
    </div>
    <p>{company}</p>
    <p>{desc}</p>
        </div>
);
}

export default Experience;