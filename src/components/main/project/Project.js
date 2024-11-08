import "./Project.css";
import {useLanguage} from "../../../context/LanguageContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faArrowDown, faGlobe, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {faCodeFork} from "@fortawesome/free-solid-svg-icons/faCodeFork";
import React from "react";

function Project({name, type, ghUrl, description, img, website, stars, forks, created_at, isLoading, download_link}) {
    const {text} = useLanguage();
    const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', ' /') : '"';
    return (
        <div className="project-card">
            <span className="project-header">
                <img src={img} alt={`Image of ${name},  Svit Spindler's project for (${type})`} className="project-image"/>
                {created_at && <span className="project-date"><b>{formattedDate} </b></span>}
            </span>
            <h3>{name}</h3>
            <div className="project-links">
                {website && <a href={website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe}/> {text.GENERAL.website}</a> }
                {download_link && <a href={download_link} download target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faArrowDown} /> {text.PROJECT.download}
                </a>}
                <a href={ghUrl} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub}/> Github
                    {stars > 0 && <>
                        <FontAwesomeIcon icon={faStar} className="ml-small"/>: {stars}
                    </>}
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin ml-small" />
                    ) : (
                        forks > 0 && (
                            <>
                                <FontAwesomeIcon icon={faCodeFork} className="ml-small" />: {forks}
                            </>
                        )
                    )}
                </a>
            </div>
            <p>{text.GENERAL.type}: <span className="bold-light">{type}</span></p>
            <p>{description}</p>
        </div>
    );
}

export default Project;