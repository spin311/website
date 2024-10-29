import "./Project.css";
import {useLanguage} from "../../../context/LanguageContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faCodeFork} from "@fortawesome/free-solid-svg-icons/faCodeFork";
import React from "react";

function Project({name, type, ghUrl, description, img, website, stars, forks, created_at}) {
    const {text} = useLanguage();
    const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', ' /') : '"';
    return (
        <div className="project-card">
            <span className="project-header">
                <img src={img} alt={name} className="project-image"/>
                {created_at && <><span className="project-date">{formattedDate}</span></>}
            </span>
                    <h4>{name}</h4>
            <div className="project-links">
                <a href={website} target="_blank"><FontAwesomeIcon icon={faGlobe}/> {text.GENERAL.website}
                </a> <a href={ghUrl} target="_blank"
                        rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub}/> Github {stars > 0 && <>
                <FontAwesomeIcon icon={faStar}/>: {stars}</>} {forks > 0 && <><FontAwesomeIcon
                icon={faCodeFork} className="forks" />: {forks}</>}</a>
            </div>
            <p>{text.GENERAL.type}: {type}</p>
            <p>{description}</p>
        </div>
    );
}

export default Project;