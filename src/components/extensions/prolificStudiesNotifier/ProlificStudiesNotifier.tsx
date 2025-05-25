import {
  faAddressBook,
  faArrowDown,
  faArrowLeft,
  faDonate,
  faHouse,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { Helmet } from "react-helmet";

import { useLanguage } from "../../../context/LanguageContext";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import Header from "../../header/Header";
import Donate from "../donate/Donate";
import Contact from "../../footer/contact/Contact";
import Footer from "../../footer/Footer";

import About from "./about/About";
import Features from "./features/Features";

function ProlificStudiesNotifier() {
  const { text } = useLanguage();
  const prolificSections = [
    {
      id: "back",
      icon: faArrowLeft,
      text: text.GENERAL.back,
      link: true,
      href: "/",
    },
    { id: "home", icon: faHouse, text: text.GENERAL.home },
    { id: "features", icon: faLightbulb, text: text.GENERAL.features },
    { id: "donate", icon: faDonate, text: text.GENERAL.donate },
    { id: "contact", icon: faAddressBook, text: text.CONTACT.contact },
  ];
  const title = { text: "Prolific Studies Notifier", class: "md-text" };
  const links = [
    {
      href: "https://chromewebstore.google.com/detail/prolific-studies-notifier/mlicfddkgjkeajfgkihplfbgpmbonbao",
      text: text.PROJECT.download,
      icon: faArrowDown,
      link: true,
    },
    {
      href: "https://github.com/spin311/ProlificAutomaticStudies",
      text: "GitHub",
      icon: faGithub,
      link: true,
      internal: false,
    },
    {
      href: "/donate",
      text: text.GENERAL.donate,
      icon: faDonate,
      link: false,
      internal: true,
    },
  ];
  const image = {
    src: "assets/images/prolific.png",
    alt: "Prolific Studies Notifier",
  };
  return (
    <>
      <Helmet>
        <title>Prolific Studies Notifier</title>
        <meta
          name="description"
          content="Prolific Studies Notifier browser extension"
        />
      </Helmet>
      <div className="App">
        <SidebarMenu classes="SidebarMenu" sections={prolificSections} />
        <div className="Content">
          <Header title={title} links={links} image={image} />
          <About />
          <hr className="mb-2" />
          <Features />
          <hr />
          <Donate className="mb-4" />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
export default ProlificStudiesNotifier;
