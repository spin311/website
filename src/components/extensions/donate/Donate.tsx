import "./Donate.css";
import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import DonateOptions from "./DonateOptions";

/** The donate section at the end of each extension page. */
function Donate() {
  const { text } = useLanguage();
  return (
    <section id="donate" className="donate-section">
      <h2>{text.GENERAL.donate}</h2>
      <p>{text.DONATE.lead}</p>
      <DonateOptions />
    </section>
  );
}

export default Donate;
