import "./MicrosoftAutomaticRewards.css";
import "../../../App.css";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import {
    faAddressBook,
    faBriefcase,
    faDiagramProject,
    faHouse,
    faArrowDown,
    faMobileScreen, faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {useLanguage} from "../../../context/LanguageContext";
import Header from "../../header/Header";

function MicrosoftAutomaticRewards() {
    const {text} = useLanguage();
    const microsoftSections =  [
        {id: 'back', icon: faArrowLeft, text: text.GENERAL.back, link: true, href: "/"},
        {id: 'home', icon: faHouse, text: text.GENERAL.home},
        {id: 'experience', icon: faBriefcase, text: text.EXPERIENCE.title},
        {id: 'projects', icon: faDiagramProject, text: text.PROJECT.title},
        {id: 'contact', icon: faAddressBook, text: text.CONTACT.contact},
    ];
    const title = {text: "Microsoft Automatic Rewards", class: "md-text"};
    const links = [
        {href: "https://chromewebstore.google.com/detail/microsoft-automatic-rewar/ocmmbfdhomnkljmjkmafegefcgcfkefo", text: text.PROJECT.download, icon: faArrowDown, link: true},
        {href: "https://github.com/spin311/MicrosoftRewardsWebsite", text: "GitHub", icon: faGithub, link: true},
        {href: "microsoft-automatic-rewards/website", text: text.MICROSOFT.mobile, icon: faMobileScreen, link: false}
    ];
    const image={src: "assets/images/microsoft.png", alt: "Microsoft Automatic Rewards"};
  return (
      <div className="App">
          <SidebarMenu className="SidebarMenu" sections={microsoftSections} />
          <div className="Content">
              <Header title={title} links={links} image={image}/>
              <div id="about">
                    <h2>About</h2>
                    <p>
                        {text.MICROSOFT.about}
                    </p>
              </div>
          </div>
      </div>
  );
}

export default MicrosoftAutomaticRewards;