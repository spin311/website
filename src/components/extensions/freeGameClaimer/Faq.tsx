import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import LinkComponent from "../../link-component/LinkComponent";

import { GITHUB_URL } from "./storeLinks";

const QUESTION_NUMBERS = [1, 2, 3, 4, 5, 6];

function Faq() {
  const { text } = useLanguage();
  return (
    <div id="faq" className="claimer-faq">
      <h2>{text.CLAIMER.faq_title}</h2>
      {QUESTION_NUMBERS.map((n) => (
        <div key={n}>
          <h3>{text.CLAIMER[`q${n}`]}</h3>
          <p>{text.CLAIMER[`a${n}`]}</p>
        </div>
      ))}
      <p className="claimer-link">
        {text.CLAIMER.faq_bug}{" "}
        <LinkComponent href={`${GITHUB_URL}/issues`} internal={false}>
          {text.CLAIMER.faq_bug_link}
        </LinkComponent>
      </p>
    </div>
  );
}

export default Faq;
