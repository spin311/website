import { Link } from "../../types/ComponentTypes";
import LinkComponent from "../link-component/LinkComponent";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HeaderLinks.css";

function HeaderLinks({ links }: { links: Link[] }) {
  return (
    <div className="header-links">
      {links.map((link: Link, i: number) => (
        <React.Fragment key={i}>
          <LinkComponent internal={link.internal} href={link.href}>
            <>
              {link.text} <FontAwesomeIcon icon={link.icon} />
            </>
          </LinkComponent>
        </React.Fragment>
      ))}
    </div>
  );
}

export default HeaderLinks;
