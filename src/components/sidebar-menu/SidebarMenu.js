import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useActiveSection from "../../hooks/useActiveSection";
import {useLanguage} from "../../context/LanguageContext";
import {useEffect, useState} from "react";

const SidebarMenu = ({sections}) => {
    const sectionIds = sections.map((section) => section.id);
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
                {sections.map((section) => (
                    <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
                        <a href={`#${section.id}`}> <FontAwesomeIcon icon={section.icon}/> {isMobile ? '' : section.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarMenu;