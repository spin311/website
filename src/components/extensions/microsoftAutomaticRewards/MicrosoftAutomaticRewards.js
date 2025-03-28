import "./MicrosoftAutomaticRewards.css";
import "../../../App.css";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import {
    faAddressBook,
    faHouse,
    faArrowDown,
    faMobileScreen, faArrowLeft, faDonate, faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {useLanguage} from "../../../context/LanguageContext";
import Header from "../../header/Header";
import {Helmet} from "react-helmet";
import Contact from "../../footer/contact/Contact";
import Footer from "../../footer/Footer";
import About from "./about/About";
import Features from "./features/Features.js";
import Donate from "./donate/Donate";
import useIsMobile from "../../../hooks/useIsMobile";

function MicrosoftAutomaticRewards() {
    const {text} = useLanguage();
    const isMobile = useIsMobile();
    const microsoftSections =  [
        {id: 'back', icon: faArrowLeft, text: text.GENERAL.back, link: true, href: "/"},
        {id: 'home', icon: faHouse, text: text.GENERAL.home},
        {id: 'features', icon: faLightbulb, text: text.GENERAL.features},
        {id: 'donate', icon: faDonate, text: text.GENERAL.donate},
        {id: 'contact', icon: faAddressBook, text: text.CONTACT.contact},
    ];
    const title = {text: "Microsoft Automatic Rewards", class: "md-text"};
    const downloadLink = {
        href: "https://chromewebstore.google.com/detail/microsoft-automatic-rewar/ocmmbfdhomnkljmjkmafegefcgcfkefo",
        text: text.PROJECT.download,
        icon: faArrowDown,
        link: true
    };
    let links = [
        {href: "https://github.com/spin311/MicrosoftRewardsWebsite", text: "GitHub", icon: faGithub, link: true},
        {href: "microsoft-automatic-rewards/website", text: text.MICROSOFT.mobile, icon: faMobileScreen, link: false},
        {href: "/donate", text: text.GENERAL.donate, icon: faDonate, link: false}
    ];
    links = !isMobile ? [downloadLink, ...links] : links;
    const image={src: "assets/images/microsoft.png", alt: "Microsoft Automatic Rewards"};
  return (
      <>
          <Helmet>
              <title>Microsoft Automatic Rewards</title>
              <meta name="description" content="Microsoft Automatic Rewards browser extension" />
          </Helmet>
          <div className="App">
              <SidebarMenu className="SidebarMenu" sections={microsoftSections} />
              <div className="Content">
                  <Header title={title} links={links} image={image}/>
                  <About/>
                  <hr className="mb-2"/>
                  <Features className="mb-2"/>
                  <hr/>
                  <Donate className="mb-4"/>

                  <Contact/>
                  <Footer />
              </div>
          </div>
      </>

  );
}

export default MicrosoftAutomaticRewards;