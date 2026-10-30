import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";

import useActiveSection from "../../hooks/useActiveSection";
import { Section } from "../../types/ComponentTypes";

type SidebarMenuProps = {
  sections: Section[];
  classes?: string;
};

const SidebarMenu = ({ sections, classes = "" }: SidebarMenuProps) => {
  const sectionIds = sections.map((section) => section.id);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className={`sidebar-menu ${classes}`}>
      <ul>
        {sections.map((section) => (
          <li
            key={section.id}
            className={activeSection === section.id ? "active" : ""}
          >
            {section.link && section.href && (
              <Link to={section.href}>
                {" "}
                <FontAwesomeIcon icon={section.icon} />{" "}
                <span className="sidebar-text">{section.text}</span>{" "}
              </Link>
            )}
            {!section.link && (
              <a href={`#${section.id}`}>
                {" "}
                <FontAwesomeIcon icon={section.icon} />{" "}
                <span className="sidebar-text">{section.text}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
