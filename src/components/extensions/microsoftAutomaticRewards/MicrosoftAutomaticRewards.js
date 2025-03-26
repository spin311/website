import "./MicrosoftAutomaticRewards.css";
import "../../../App.css";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import {faAddressBook, faBriefcase, faDiagramProject, faHouse} from "@fortawesome/free-solid-svg-icons";
import {useLanguage} from "../../../context/LanguageContext";

function MicrosoftAutomaticRewards() {
    const {text} = useLanguage();
    const microsoftSections =  [
        {id: 'home', icon: faHouse, text: text.GENERAL.home},
        {id: 'experience', icon: faBriefcase, text: text.EXPERIENCE.title},
        {id: 'projects', icon: faDiagramProject, text: text.PROJECT.title},
        {id: 'contact', icon: faAddressBook, text: text.CONTACT.contact},
    ];
  return (
      <div className="App">
          <SidebarMenu className="SidebarMenu" sections={microsoftSections} />
          <div className="Content">
              test steasdawldawlkmdlawkl;.dmwakldakmwlwmadk adkpmmadwkl   waklmd l km wakl

          </div>
      </div>
  );
}

export default MicrosoftAutomaticRewards;