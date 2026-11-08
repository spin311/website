import React from "react";
import {
  faCircleQuestion,
  faLightbulb,
  faListOl,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

import { useLanguage } from "../../../context/LanguageContext";
import { IMAGES_URL } from "../../../helpers/images";
import { FREE_GAME_CLAIMER } from "../extensionInfo";
import ExtensionPage from "../shared/ExtensionPage";
import ExtensionFacts from "../shared/ExtensionFacts";
import FaqList from "../shared/FaqList";
import Screenshot from "../shared/Screenshot";
import TranslatedList, { numberedKeys } from "../shared/TranslatedList";

const GROUP = "CLAIMER";

function FreeGameClaimer() {
  const { text } = useLanguage();
  const sections = [
    { id: "setup", icon: faListOl, text: text.EXTENSION.setup_title },
    { id: "features", icon: faLightbulb, text: text.GENERAL.features },
    { id: "privacy", icon: faShieldHalved, text: text.EXTENSION.privacy_title },
    { id: "faq", icon: faCircleQuestion, text: text.EXTENSION.faq_title },
  ];

  return (
    <ExtensionPage
      extension={FREE_GAME_CLAIMER}
      meta={{
        title: text.CLAIMER.meta_title,
        description: text.CLAIMER.meta_description,
      }}
      icon={{ src: `${IMAGES_URL}/claimer.webp`, alt: "" }}
      sections={sections}
    >
      <section id="about">
        <p className="ext-lead">{text.CLAIMER.tagline}</p>
        <ExtensionFacts
          extension={FREE_GAME_CLAIMER}
          factKeys={["fact_browsers", "fact_free", "fact_open_source"]}
        />
        <p>{text.CLAIMER.intro}</p>
        <Screenshot
          name="claimer-promo"
          width={700}
          height={280}
          alt={text.CLAIMER.promo_alt}
          isEager
        />
      </section>

      <section id="setup">
        <h2>{text.EXTENSION.setup_title}</h2>
        <TranslatedList
          group={GROUP}
          keys={numberedKeys("step", 4)}
          ordered
          className="ext-steps"
        />
        <Screenshot
          name="claimer-settings"
          width={380}
          height={269}
          alt={text.CLAIMER.settings_caption}
          caption={text.CLAIMER.settings_caption}
        />
      </section>

      <section id="features">
        <h2>{text.GENERAL.features}</h2>
        <TranslatedList group={GROUP} keys={numberedKeys("feature", 8)} />
        <Screenshot
          name="claimer-library"
          width={380}
          height={269}
          alt={text.CLAIMER.library_caption}
          caption={text.CLAIMER.library_caption}
        />
      </section>

      <section id="privacy">
        <h2>{text.EXTENSION.privacy_title}</h2>
        <TranslatedList group={GROUP} keys={numberedKeys("privacy", 4)} />
      </section>

      <section id="faq">
        <h2>{text.EXTENSION.faq_title}</h2>
        <FaqList group={GROUP} count={7} />
        <p>
          {text.EXTENSION.faq_bug}{" "}
          <a
            href={`${FREE_GAME_CLAIMER.githubUrl}/issues`}
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

export default FreeGameClaimer;
