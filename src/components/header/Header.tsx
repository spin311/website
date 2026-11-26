import React, { ReactNode } from "react";
import "./Header.css";

import { Link } from "../../types/ComponentTypes";
import HeaderLinks from "./HeaderLinks";

type HeaderProps = {
  title: {
    text: string;
    class: string;
  };
  /** Lines shown under the name, e.g. role, stack and a one-line proof. */
  tagline?: ReactNode;
  links: Link[];
  image: {
    src: string;
    srcSet?: string;
    alt: string;
  };
};

function Header({ title, tagline, links, image }: HeaderProps) {
  return (
    <div id="home">
      <header className="App-header">
        <h1 className={`${title.class} name`}>{title.text}</h1>
        {tagline && <div className="header-tagline">{tagline}</div>}
        <HeaderLinks links={links} />
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          className="profile-picture"
        />
      </header>
    </div>
  );
}
export default Header;
