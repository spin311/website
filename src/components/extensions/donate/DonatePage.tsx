import "./Donate.css";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { useLanguage } from "../../../context/LanguageContext";
import useExtensionUsers from "../../../hooks/useExtensionUsers";
import { IMAGES_URL } from "../../../helpers/images";
import BackArrow from "../../back-arrow/BackArrow";
import { formatUsers } from "../shared/ExtensionFacts";
import TranslatedList, { numberedKeys } from "../shared/TranslatedList";
import {
  ExtensionInfo,
  FREE_GAME_CLAIMER,
  PROLIFIC_STUDIES_NOTIFIER,
  SEARCH_AUTOMATIC_REWARDS,
} from "../extensionInfo";
import DonateOptions from "./DonateOptions";

type SupportedProject = {
  extension: ExtensionInfo;
  icon: string;
  descriptionKey: string;
  users: number;
};

/** /donate: what the donations pay for, then the ways to donate. */
function DonatePage() {
  const { text, language } = useLanguage();
  const projects: SupportedProject[] = [
    {
      extension: SEARCH_AUTOMATIC_REWARDS,
      icon: "microsoft.webp",
      descriptionKey: "project_sar",
      users: useExtensionUsers(
        SEARCH_AUTOMATIC_REWARDS.chromeId,
        SEARCH_AUTOMATIC_REWARDS.fallbackUsers,
      ),
    },
    {
      extension: FREE_GAME_CLAIMER,
      icon: "claimer.webp",
      descriptionKey: "project_fgc",
      users: useExtensionUsers(
        FREE_GAME_CLAIMER.chromeId,
        FREE_GAME_CLAIMER.fallbackUsers,
      ),
    },
    {
      extension: PROLIFIC_STUDIES_NOTIFIER,
      icon: "prolific.webp",
      descriptionKey: "project_psn",
      users: useExtensionUsers(
        PROLIFIC_STUDIES_NOTIFIER.chromeId,
        PROLIFIC_STUDIES_NOTIFIER.fallbackUsers,
      ),
    },
  ];
  const totalUsers = projects.reduce((sum, project) => sum + project.users, 0);

  return (
    <>
      <Helmet>
        <title>{text.DONATE.page_meta_title}</title>
        <meta name="description" content={text.DONATE.page_meta_description} />
      </Helmet>
      <BackArrow />
      <main className="donate-page">
        <h1>{text.DONATE.page_title}</h1>
        <p className="donate-page-lead">
          {text.DONATE.page_lead.replace(
            "{users}",
            formatUsers(totalUsers, language),
          )}
        </p>

        <h2>{text.DONATE.projects_title}</h2>
        <ul className="donate-projects">
          {projects.map(({ extension, icon, descriptionKey, users }) => (
            <li key={extension.page}>
              <Link to={extension.page} className="donate-project">
                <img
                  src={`${IMAGES_URL}/${icon}`}
                  alt=""
                  width={48}
                  height={48}
                />
                <span>
                  <span className="donate-project-name">{extension.name}</span>
                  <span className="donate-project-desc">
                    {text.DONATE[descriptionKey]}
                  </span>
                </span>
                <span className="donate-project-users">
                  {text.DONATE.users.replace(
                    "{users}",
                    formatUsers(users, language),
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p>{text.DONATE.why_text}</p>

        <h2>{text.DONATE.options_title}</h2>
        <DonateOptions />

        <h2>{text.DONATE.help_title}</h2>
        <TranslatedList group="DONATE" keys={numberedKeys("help", 3)} />
      </main>
    </>
  );
}

export default DonatePage;
