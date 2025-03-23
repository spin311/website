import "./MicrosoftAutomaticRewards.css";
import "../../../App.css";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import Header from "../../header/Header";
import Main from "../../main/Main";
import Contact from "../../footer/contact/Contact";
import Footer from "../../footer/Footer";

function MicrosoftAutomaticRewards() {
    const microsoftSections = [
        {id: 'home', icon: 'faHouse', text: 'Home'},
        {id: 'experience', icon: 'faBriefcase', text: 'Experience'},
        {id: 'projects', icon: 'faDiagramProject', text: 'Projects'},
        {id: 'contact', icon: 'faAddressBook', text: 'Contact'},
    ]
  return (
      <div className="App">
          <SidebarMenu className="SidebarMenu" sections={microsoftSections} />
          <div className="Content">
              
          </div>
      </div>
  );
}

export default MicrosoftAutomaticRewards;