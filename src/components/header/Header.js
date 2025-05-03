import React from "react";
import  './Header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LinkComponent from "../link-component/LinkComponent";

function Header({title, links, image}){

    return (
        <div id="home">
            <header className="App-header">
                <h1 className={`${title.class} name`}>{title.text}</h1>
                <div className="header-links">
                    {links.map((link, i) => (
                        <React.Fragment key={i}>
                            <LinkComponent internal={link.internal} href={link.href} children={<>{link.text} <FontAwesomeIcon icon={link.icon} /></>}/>
                        </React.Fragment>
                    ))}
                </div>
                <img src={`${process.env.PUBLIC_URL}/${image.src}`} alt={image.alt} className="profile-picture"/>

            </header>
        </div>
    );
}
export default Header;