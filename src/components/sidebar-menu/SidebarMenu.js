import "./SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useActiveSection from "../../hooks/useActiveSection";
import useIsMobile from "../../hooks/useIsMobile";
import {Link} from "react-router-dom";

const SidebarMenu = ({sections}) => {
    const sectionIds = sections.map((section) => section.id);
    const activeSection = useActiveSection(sectionIds);
    const isMobile = useIsMobile();

    return (
        <div className="sidebar-menu">
            <ul>
                {sections.map((section) => (
                    <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
                        {section.link && <Link to={section.href}> <FontAwesomeIcon icon={section.icon}/> {isMobile ? '' : section.text} </Link>}
                        {!section.link && <a href={`#${section.id}`}> <FontAwesomeIcon icon={section.icon}/> {isMobile ? '' : section.text}</a>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarMenu;