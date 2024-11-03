import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBriefcase, faDiagramProject, faHouse } from "@fortawesome/free-solid-svg-icons";
import useActiveSection from "../../hooks/useActiveSection";
import {useLanguage} from "../../context/LanguageContext";
import {useEffect, useState} from "react";

const SidebarMenu = () => {
    const sectionIds = ["home", "experience", "project"];
    const activeSection = useActiveSection(sectionIds);
    const {text} = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth <= 767);
        });
    }, []);


    return !isMobile ? (
        <div className="sidebar-menu">
            <ul>
                <li className={activeSection === 'home' ? 'active' : ''}>
                    <a href="#home"> <FontAwesomeIcon icon={faHouse}/> {text.GENERAL.home}</a>
                </li>
                <li className={activeSection === 'experience' ? 'active' : ''}>
                    <a href="#experience"><FontAwesomeIcon icon={faBriefcase}/> {text.EXPERIENCE.title}</a>
                </li>
                <li className={activeSection === 'project' ? 'active' : ''}>
                    <a href="#project"><FontAwesomeIcon icon={faDiagramProject}/> {text.PROJECT.title}</a>
                </li>
            </ul>
        </div>
    ) : (
        <div className="sidebar-menu">
            <ul>
                <li className={activeSection === 'home' ? 'active' : ''}>
                    <a href="#home"> <FontAwesomeIcon icon={faHouse}/> </a>
                </li>
                <li className={activeSection === 'experience' ? 'active' : ''}>
                    <a href="#experience"><FontAwesomeIcon icon={faBriefcase}/> </a>
                </li>
                <li className={activeSection === 'project' ? 'active' : ''}>
                    <a href="#project"><FontAwesomeIcon icon={faDiagramProject}/> </a>
                </li>
            </ul>
        </div>
    )

        ;
};

export default SidebarMenu;