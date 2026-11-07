import "./FreeGameClaimer.css";
import React from "react";
import {
  faAddressBook,
  faArrowLeft,
  faCircleQuestion,
  faDonate,
  faHouse,
  faLightbulb,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons/faChrome";
import { faFirefoxBrowser } from "@fortawesome/free-brands-svg-icons/faFirefoxBrowser";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { Helmet } from "react-helmet";

import { useLanguage } from "../../../context/LanguageContext";
import { IMAGES_URL } from "../../../helpers/images";
import { Link, Section } from "../../../types/ComponentTypes";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import Header from "../../header/Header";
import Donate from "../donate/Donate";
import Contact from "../../footer/contact/Contact";
import Footer from "../../footer/Footer";

import About from "./About";
import Features from "./Features";
import Privacy from "./Privacy";
import Faq from "./Faq";
import { CHROME_STORE_URL, FIREFOX_STORE_URL, GITHUB_URL } from "./storeLinks";

function FreeGameClaimer() {
  const { text } = useLanguage();
  const sections: Section[] = [
    {
      id: "back",
      icon: faArrowLeft,
      text: text.GENERAL.back,
      link: true,
      href: "/",
    },
    { id: "home", icon: faHouse, text: text.GENERAL.home },
    { id: "features", icon: faLightbulb, text: text.GENERAL.features },
    { id: "privacy", icon: faShieldHalved, text: text.CLAIMER.privacy_title },
    { id: "faq", icon: faCircleQuestion, text: text.CLAIMER.faq_title },
    { id: "donate", icon: faDonate, text: text.GENERAL.donate },
    { id: "contact", icon: faAddressBook, text: text.CONTACT.contact },
  ];
  const title = { text: text.CLAIMER.title, class: "md-text" };
  const links: Link[] = [
    {
      href: CHROME_STORE_URL,
      text: text.CLAIMER.add_chrome,
      icon: faChrome,
      link: true,
    },
    {
      href: FIREFOX_STORE_URL,
      text: text.CLAIMER.add_firefox,
      icon: faFirefoxBrowser,
      link: true,
    },
    {
      href: GITHUB_URL,
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
    src: `${IMAGES_URL}/claimer.webp`,
    alt: text.CLAIMER.title,
  };
  return (
    <>
      <Helmet>
        <title>{text.CLAIMER.meta_title}</title>
        <meta name="description" content={text.CLAIMER.meta_description} />
      </Helmet>
      <div className="App">
        <SidebarMenu classes="SidebarMenu" sections={sections} />
        <div className="Content claimer-page">
          <Header title={title} links={links} image={image} />
          <About />
          <hr className="mb-2" />
          <Features />
          <hr className="mb-2" />
          <Privacy />
          <hr className="mb-2" />
          <Faq />
          <hr />
          <Donate className="mb-4" />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default FreeGameClaimer;
