import React from "react";
import {
  faCircleQuestion,
  faLightbulb,
  faListOl,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

import { useLanguage } from "../../../context/LanguageContext";
import { IMAGES_URL } from "../../../helpers/images";
import { PROLIFIC_STUDIES_NOTIFIER } from "../extensionInfo";
import ExtensionPage from "../shared/ExtensionPage";
import ExtensionFacts from "../shared/ExtensionFacts";
import FaqList from "../shared/FaqList";
import Screenshot from "../shared/Screenshot";
import TranslatedList, { numberedKeys } from "../shared/TranslatedList";

const GROUP = "PROLIFIC";
// Each of the two popup captures takes half the column, or all of it on phones.
const PAIR_SIZES = "(max-width: 767px) 80vw, 20vw";

// Installing the extension opens this page, so "Getting started" doubles as onboarding.
function ProlificStudiesNotifier() {
  const { text } = useLanguage();
  const sections = [
    { id: "setup", icon: faListOl, text: text.EXTENSION.setup_title },
    { id: "features", icon: faLightbulb, text: text.GENERAL.features },
    { id: "privacy", icon: faShieldHalved, text: text.EXTENSION.privacy_title },
    { id: "faq", icon: faCircleQuestion, text: text.EXTENSION.faq_title },
  ];

  return (
    <ExtensionPage
      extension={PROLIFIC_STUDIES_NOTIFIER}
      meta={{
        title: text.PROLIFIC.meta_title,
        description: text.PROLIFIC.meta_description,
      }}
      icon={{ src: `${IMAGES_URL}/prolific.webp`, alt: "" }}
      sections={sections}
    >
      <section id="about">
        <p className="ext-lead">{text.PROLIFIC.tagline}</p>
        <ExtensionFacts
          extension={PROLIFIC_STUDIES_NOTIFIER}
          factKeys={["fact_browsers", "fact_free", "fact_source"]}
        />
        <p>{text.PROLIFIC.intro}</p>
        <Screenshot
          name="prolific-promo"
          width={700}
          height={280}
          alt={text.PROLIFIC.promo_alt}
          isEager
        />
      </section>

      <section id="setup">
        <h2>{text.EXTENSION.setup_title}</h2>
        <p>{text.PROLIFIC.setup_intro}</p>
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
        <div className="ext-shot-pair">
          <Screenshot
            name="prolific-settings"
            width={360}
            height={598}
            alt={text.PROLIFIC.settings_caption}
            caption={text.PROLIFIC.settings_caption}
            sizes={PAIR_SIZES}
          />
          <Screenshot
            name="prolific-studies"
            width={360}
            height={586}
            alt={text.PROLIFIC.studies_caption}
            caption={text.PROLIFIC.studies_caption}
            sizes={PAIR_SIZES}
          />
        </div>
      </section>

      <section id="privacy">
        <h2>{text.EXTENSION.privacy_title}</h2>
        <TranslatedList group={GROUP} keys={numberedKeys("privacy", 4)} />
      </section>

      <section id="faq">
        <h2>{text.EXTENSION.faq_title}</h2>
        <FaqList group={GROUP} count={6} />
        <p>
          {text.EXTENSION.faq_bug}{" "}
          <a
            href={`${PROLIFIC_STUDIES_NOTIFIER.githubUrl}/issues`}
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

export default ProlificStudiesNotifier;
