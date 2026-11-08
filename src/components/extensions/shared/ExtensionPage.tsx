import "./ExtensionPage.css";
import React, { ReactNode } from "react";
import {
  faAddressBook,
  faArrowLeft,
  faDonate,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons/faChrome";
import { faFirefoxBrowser } from "@fortawesome/free-brands-svg-icons/faFirefoxBrowser";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { Helmet } from "react-helmet";

import { useLanguage } from "../../../context/LanguageContext";
import { Link, Section } from "../../../types/ComponentTypes";
import SidebarMenu from "../../sidebar-menu/SidebarMenu";
import Header from "../../header/Header";
import Contact from "../../footer/contact/Contact";
import Footer from "../../footer/Footer";
import Donate from "../donate/Donate";
import { ExtensionInfo } from "../extensionInfo";

type ExtensionPageProps = {
  extension: ExtensionInfo;
  meta: { title: string; description: string };
  icon: { src: string; srcSet?: string; alt: string };
  /** Sidebar entries for the page's own sections, between Home and Donate. */
  sections: Section[];
  children: ReactNode;
};

/** Shared frame of an extension page: sidebar, header with store links, donate, contact. */
function ExtensionPage({
  extension,
  meta,
  icon,
  sections,
  children,
}: ExtensionPageProps) {
  const { text } = useLanguage();
  const navSections: Section[] = [
    {
      id: "back",
      icon: faArrowLeft,
      text: text.GENERAL.back,
      link: true,
      href: "/",
    },
    { id: "home", icon: faHouse, text: text.GENERAL.home },
    ...sections,
    { id: "donate", icon: faDonate, text: text.GENERAL.donate },
    { id: "contact", icon: faAddressBook, text: text.CONTACT.contact },
  ];
  const links: Link[] = [
    {
      href: extension.chromeUrl,
      text: text.EXTENSION.add_chrome,
      icon: faChrome,
      link: true,
      internal: false,
    },
    {
      href: extension.firefoxUrl,
      text: text.EXTENSION.add_firefox,
      icon: faFirefoxBrowser,
      link: true,
      internal: false,
    },
    {
      href: extension.githubUrl,
      text: "GitHub",
      icon: faGithub,
      link: true,
      internal: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <div className="App">
        <SidebarMenu classes="SidebarMenu" sections={navSections} />
        <div className="Content extension-page">
          <Header
            title={{ text: extension.name, class: "md-text" }}
            links={links}
            image={icon}
          />
          {children}
          <Donate />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ExtensionPage;
