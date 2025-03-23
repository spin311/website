import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAddressBook, faBriefcase, faDiagramProject, faHouse} from "@fortawesome/free-solid-svg-icons";
import useActiveSection from "../../hooks/useActiveSection";
import {useLanguage} from "../../context/LanguageContext";
import {useEffect, useState} from "react";

const SidebarMenu = () => {
    const sectionIds = ["home", "experience", "project", "contact"];
    const activeSection = useActiveSection(sectionIds);
    const {text} = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div className="sidebar-menu">
            <ul>
                <li className={activeSection === 'home' ? 'active' : ''}>
                    <a href="#home"> <FontAwesomeIcon icon={faHouse}/> {isMobile ? '' : text.GENERAL.home}</a>
                </li>
                <li className={activeSection === 'experience' ? 'active' : ''}>
                    <a href="#experience"><FontAwesomeIcon icon={faBriefcase}/> {isMobile ? '' : text.EXPERIENCE.title}
                    </a>
                </li>
                <li className={activeSection === 'project' ? 'active' : ''}>
                    <a href="#project"><FontAwesomeIcon icon={faDiagramProject}/> {isMobile ? '' : text.PROJECT.title}
                    </a>
                </li>
                <li className={activeSection === 'contact' ? 'active' : ''}>
                    <a href="#contact"><FontAwesomeIcon icon={faAddressBook} /> {isMobile ? '' : text.CONTACT.contact}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMenu;