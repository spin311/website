import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import {faAddressBook, faBriefcase, faDiagramProject, faHouse} from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import Contact from "./components/footer/contact/Contact";
import {useLanguage} from "./context/LanguageContext";
import {faEnvelope, faFile} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import {Helmet} from "react-helmet";

function App() {
    const {text, language} = useLanguage();
    const title = {text: 'Svit Spindler', class: ""};
    const cvLink = language === "en" ?
        `${process.env.PUBLIC_URL}/assets/CV/CV_ENG.pdf` :
        `${process.env.PUBLIC_URL}/assets/CV/CV_SLO.pdf`;
    const links = [
        {text: 'GitHub', href: 'https://github.com/spin311', icon: faGithub, link: true},
        {text: "E-Mail", href: "mailto:svit.spindler@gmail.com", icon: faEnvelope, link: false},
        {text: "CV", href: cvLink, icon: faFile, link: true}
    ];
    const image = {src: 'assets/images/cropped_image2.png', alt: 'Profile'};

    const mainAppSections = [
        {id: 'home', icon: faHouse, text: text.GENERAL.home},
        {id: 'experience', icon: faBriefcase, text: text.EXPERIENCE.title},
        {id: 'projects', icon: faDiagramProject, text: text.PROJECT.title},
        {id: 'contact', icon: faAddressBook, text: text.CONTACT.contact},
    ];
  return (
      <>
          <Helmet>
              <title>Svit Spindler</title>
              <meta name="description" content="Personal website of Svit Spindler" />
          </Helmet>
          <div className="App">
              <SidebarMenu className="SidebarMenu" sections={mainAppSections} />
              <div className="Content">
                  <Header links={links} title={title} image={image} />
                  <Main  className="Main" />
                  <Contact></Contact>
                  <Footer />
              </div>
          </div>
      </>

  );
}

export default App;
