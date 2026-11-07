import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import { IMAGES_URL } from "../../../helpers/images";

function About() {
  const { text } = useLanguage();
  return (
    <div id="about">
      <h2>{text.EXTENSION.about}</h2>
      <p className="claimer-tagline">{text.CLAIMER.tagline}</p>
      <p>{text.CLAIMER.intro}</p>
      <img
        className="claimer-promo"
        src={`${IMAGES_URL}/claimer-promo.webp`}
        srcSet={`${IMAGES_URL}/claimer-promo.webp 1x, ${IMAGES_URL}/claimer-promo@2x.webp 2x`}
        width={1000}
        height={625}
        alt={text.CLAIMER.promo_alt}
      />
    </div>
  );
}

export default About;
