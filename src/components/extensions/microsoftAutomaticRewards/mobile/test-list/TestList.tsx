import React from "react";
import { Helmet } from "react-helmet";
import BackArrow from "../../../../back-arrow/BackArrow";
import useIsMobile from "../../../../../hooks/useIsMobile";
import { useLanguage } from "../../../../../context/LanguageContext";
import LinkComponent from "../../../../link-component/LinkComponent";
import "./TestList.css";
import { faArrowDown, faDonate } from "@fortawesome/free-solid-svg-icons";
import { Link } from "../../../../../types/ComponentTypes";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import HeaderLinks from "../../../../header/HeaderLinks";

function TestList() {
  const { text } = useLanguage();
  const isMobile = useIsMobile();

  let links: Link[] = [
    {
      href: "https://github.com/spin311/MicrosoftRewardsWebsite/releases/tag/app",
      text: text.PROJECT.download,
      icon: faArrowDown,
      link: true,
    },
    {
      href: "https://github.com/spin311/MicrosoftRewardsWebsite",
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

  return (
    <>
      <Helmet>
        <title>Microsoft Rewards App</title>
        <meta name="description" content="Microsoft Automatic Rewards App" />
      </Helmet>
      <BackArrow />
      <div className="website center">
        <div className="solo">
          <h1 className={"app-title"}>
            {text.MICROSOFT.test_title ?? "Microsoft Rewards"}
            <img
              src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/microsoft.png`}
              alt="app logo"
              className="app-logo"
            />
          </h1>
          <HeaderLinks links={links} />
          <div className="website-header">
            {!isMobile && (
              <div className="qr-code-with-text">
                <img
                  src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/qr-code-app.svg`}
                  alt="QR code"
                  className="qr-code"
                />
                <span>{text.WEBSITE.scan ?? "Scan QR code"}</span>
              </div>
            )}
            <LinkComponent
              classList="website-phone"
              href="https://github.com/spin311/MicrosoftRewardsWebsite/releases/tag/app"
              internal={false}
            >
              <img
                className="website-phone-image"
                src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/mar-phone.png`}
                alt="Microsoft Automatic Rewards Phone App"
              />
              <div>{text.MICROSOFT.download ?? "Download App"}</div>
            </LinkComponent>
          </div>

          <p>{text.MICROSOFT.test_description ?? "Download the app."}</p>
        </div>
      </div>
    </>
  );
}
export default TestList;
