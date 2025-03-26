import React from "react";
import  './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Header({title, links, image}){

    return (
        <div id="home">
            <header className="App-header">
                <h1 className="name">{title}</h1>
                <div className="header-links">
                    {links.map((link, i) => (
                        <a key={i} href={link.href}  target={link.link ? "_blank" : ""} rel={link.link ? "noopener noreferrer" : ""}>
                            {link.text} <FontAwesomeIcon icon={link.icon} />
                        </a>
                    ))}

                </div>
                <img src={`${process.env.PUBLIC_URL}/${image.src}`} alt={image.alt} className="profile-picture"/>

            </header>
        </div>
    );
}
export default Header;