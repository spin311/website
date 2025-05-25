import "./Project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import {
  faArrowDown,
  faGlobe,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons/faCodeFork";
import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import LinkComponent from "../../link-component/LinkComponent";
import { ProjectType } from "../../../types/ComponentTypes";

type ProjectProps = {
  project: ProjectType;
  isLoading?: boolean;
};

function Project({ project, isLoading }: ProjectProps) {
  const { text } = useLanguage();
  const {
    name,
    description,
    img,
    website,
    download_link,
    ghUrl,
    stars,
    forks,
    type,
    created_at,
  } = project;
  const formattedDate = created_at
    ? new Date(created_at)
        .toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })
        .replace("/", " /")
    : '"';
  return (
    <div className="project-card">
      <span className="project-header">
        <img src={img} alt={name} className="project-image" />
        {created_at && (
          <span className="project-date">
            <b>{formattedDate} </b>
          </span>
        )}
      </span>
      <h3>
        {website ? (
          <LinkComponent href={website}>{name}</LinkComponent>
        ) : (
          <span>{name}</span>
        )}
      </h3>
      <div className="project-links">
        {website && (
          <LinkComponent href={website}>
            <FontAwesomeIcon icon={faGlobe} /> {text.GENERAL.website}
          </LinkComponent>
        )}
        {download_link && (
          <a
            href={download_link}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faArrowDown} /> {text.PROJECT.download}
          </a>
        )}
        <a href={ghUrl} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} /> Github
          {stars > 0 && (
            <>
              <FontAwesomeIcon icon={faStar} className="ml-small" />: {stars}
            </>
          )}
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin ml-small" />
          ) : (
            forks > 0 && (
              <>
                <FontAwesomeIcon icon={faCodeFork} className="ml-small" />:{" "}
                {forks}
              </>
            )
          )}
        </a>
      </div>
      <p>
        {text.GENERAL.type}: <span className="bold-light">{type}</span>
      </p>
      <p>{description}</p>
    </div>
  );
}

export default React.memo(Project);
