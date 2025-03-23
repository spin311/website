import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import {faAddressBook, faBriefcase, faDiagramProject, faHouse} from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import Contact from "./components/footer/contact/Contact";
import {useLanguage} from "./context/LanguageContext";

function App() {
    const {text} = useLanguage();
    const mainAppSections = [
        {id: 'home', icon: faHouse, text: text.GENERAL.home},
        {id: 'experience', icon: faBriefcase, text: text.EXPERIENCE.title},
        {id: 'projects', icon: faDiagramProject, text: text.PROJECT.title},
        {id: 'contact', icon: faAddressBook, text: text.CONTACT.contact},
    ]
  return (
    <div className="App">
        <SidebarMenu className="SidebarMenu" sections={mainAppSections} />
        <div className="Content">
            <Header />
            <Main  className="Main" />
            <Contact></Contact>
            <Footer />
        </div>
    </div>
  );
}

export default App;
