import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LinkComponent from "../link-component/LinkComponent";
import { Link } from "../../types/ComponentTypes";
import HeaderLinks from "./HeaderLinks";

type HeaderProps = {
  title: {
    text: string;
    class: string;
  };
  links: Link[];
  image: {
    src: string;
    alt: string;
  };
};

function Header({ title, links, image }: HeaderProps) {
  return (
    <div id="home">
      <header className="App-header">
        <h1 className={`${title.class} name`}>{title.text}</h1>
        <HeaderLinks links={links} />
        <img
          src={`${import.meta.env.PUBLIC_URL ?? ""}/${image.src}`}
          alt={image.alt}
          className="profile-picture"
        />
      </header>
    </div>
  );
}
export default Header;
