import "./App.css";
import React from "react";
import {
  faAddressBook,
  faBriefcase,
  faDiagramProject,
  faHouse,
  faEnvelope,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { Helmet } from "react-helmet";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import Contact from "./components/footer/contact/Contact";
import { useLanguage } from "./context/LanguageContext";
import { Link, Section } from "./types/ComponentTypes";

function App() {
  const { text, language } = useLanguage();
  const title = { text: "Svit Spindler", class: "" };
  const cvLink = `${process.env.PUBLIC_URL ?? ""}/assets/CV/CV_${language === "en" ? "ENG" : "SLO"}.pdf`;
  const links: Link[] = [
    {
      text: "GitHub",
      href: "https://github.com/spin311",
      icon: faGithub,
      link: true,
      internal: false,
    },
    {
      text: "E-Mail",
      href: "mailto:svit.spindler@gmail.com",
      icon: faEnvelope,
      link: false,
      internal: false,
    },
    { text: "CV", href: cvLink, icon: faFile, link: true, internal: false },
  ];
  const image = { src: "assets/images/cropped_image2.png", alt: "Profile" };

  const mainAppSections: Section[] = [
    { id: "home", icon: faHouse, text: text.GENERAL.home },
    { id: "experience", icon: faBriefcase, text: text.EXPERIENCE.title },
    { id: "projects", icon: faDiagramProject, text: text.PROJECT.title },
    { id: "contact", icon: faAddressBook, text: text.CONTACT.contact },
  ];
  return (
    <>
      <Helmet>
        <title>Svit Spindler</title>
        <meta name="description" content="Personal website of Svit Spindler" />
      </Helmet>
      <div className="App">
        <SidebarMenu classes="SidebarMenu" sections={mainAppSections} />
        <div className="Content">
          <Header links={links} title={title} image={image} />
          <Main classes="Main" />
          <Contact></Contact>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
