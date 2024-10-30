import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBriefcase, faDiagramProject, faHouse } from "@fortawesome/free-solid-svg-icons";
import useActiveSection from "../../hooks/useActiveSection";
import {useLanguage} from "../../context/LanguageContext";

const SidebarMenu = () => {
    const sectionIds = ["home", "experience", "project"];
    const activeSection = useActiveSection(sectionIds);
    const {text} = useLanguage();

    return (
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
    );
};

export default SidebarMenu;