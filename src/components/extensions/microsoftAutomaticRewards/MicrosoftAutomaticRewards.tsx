import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faLightbulb,
  faListOl,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { useLanguage } from "../../../context/LanguageContext";
import { retinaImage } from "../../../helpers/images";
import { SEARCH_AUTOMATIC_REWARDS } from "../extensionInfo";
import ExtensionPage from "../shared/ExtensionPage";
import ExtensionFacts from "../shared/ExtensionFacts";
import FaqList from "../shared/FaqList";
import Screenshot from "../shared/Screenshot";
import TranslatedList, { numberedKeys } from "../shared/TranslatedList";

const GROUP = "MICROSOFT";

// Installing the extension opens this page, so "Getting started" doubles as onboarding.
// Kept low-key on purpose: Microsoft's terms prohibit automated searches.
function MicrosoftAutomaticRewards() {
  const { text, formatHtml } = useLanguage();
  const sections = [
    { id: "setup", icon: faListOl, text: text.EXTENSION.setup_title },
    { id: "features", icon: faLightbulb, text: text.GENERAL.features },
    { id: "faq", icon: faCircleQuestion, text: text.EXTENSION.faq_title },
  ];
  const { src, srcSet } = retinaImage("microsoft", 170, 170);

  return (
    <ExtensionPage
      extension={SEARCH_AUTOMATIC_REWARDS}
      meta={{
        title: text.MICROSOFT.meta_title,
        description: text.MICROSOFT.meta_description,
      }}
      icon={{ src, srcSet, alt: "" }}
      sections={sections}
    >
      <section id="about">
        <p className="ext-lead">{text.MICROSOFT.tagline}</p>
        <ExtensionFacts
          extension={SEARCH_AUTOMATIC_REWARDS}
          factKeys={["fact_browsers", "fact_free", "fact_source"]}
        />
        <p>{text.MICROSOFT.intro}</p>
        <div className="ext-note" role="note">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>{formatHtml(text.MICROSOFT.risk)}</p>
        </div>
      </section>

      <section id="setup">
        <h2>{text.EXTENSION.setup_title}</h2>
        <TranslatedList
          group={GROUP}
          keys={numberedKeys("step", 4)}
          ordered
          className="ext-steps"
        />
      </section>

      <section id="features">
        <h2>{text.GENERAL.features}</h2>
        <TranslatedList group={GROUP} keys={numberedKeys("feature", 7)} />
        <Screenshot
          name="sar-popup"
          width={400}
          height={250}
          alt={text.MICROSOFT.popup_caption}
          caption={text.MICROSOFT.popup_caption}
          className="ext-shot-narrow"
          sizes="(max-width: 767px) 80vw, 400px"
        />
      </section>

      <section id="faq">
        <h2>{text.EXTENSION.faq_title}</h2>
        <FaqList group={GROUP} count={4} />
        <p>
          {text.EXTENSION.faq_bug}{" "}
          <a
            href={`${SEARCH_AUTOMATIC_REWARDS.githubUrl}/issues`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text.EXTENSION.faq_bug_link}
          </a>
        </p>
      </section>
    </ExtensionPage>
  );
}

export default MicrosoftAutomaticRewards;
