import ImageTooltip from "../../../image-tooltip/ImageTooltip";
import { useLanguage } from "../../../../context/LanguageContext";

import "./About.css";
import { Link } from "react-router-dom";
function About() {
  const { text, formatHtml } = useLanguage();
  return (
    <div id="about">
      <h2>{text.EXTENSION.about}</h2>
      <p>{text.MICROSOFT.description}</p>
      <div className="to-work">
        <div className="about-text">
          <h3>{text.MICROSOFT.to_work}</h3>
          <ul>
            <li className="underline-link">
              {formatHtml(`${text.MICROSOFT.step1}`)}
            </li>
            <li>{text.MICROSOFT.step2}</li>
          </ul>
          <h3>{text.MICROSOFT.to_daily} </h3>
          <ul>
            <li>
              {text.MICROSOFT.step3} <ImageTooltip src="enable-daily.png" />
            </li>
            <li className="underline-link">
              {formatHtml(`${text.MICROSOFT.step4}`)}{" "}
              <ImageTooltip src="enable-popup.png" />
            </li>
          </ul>
          <h3>{text.MICROSOFT.to_mobile}</h3>
          <ul>
            <li className="underline-link">
              <Link to={"/microsoft-automatic-rewards/mobile/test-app"}>
                {text.MICROSOFT.step5}
              </Link>{" "}
              {text.MICROSOFT.or}
            </li>
            <li className="underline-link">
              <Link to={"/microsoft-automatic-rewards/mobile/website"}>
                {text.MICROSOFT.step6}
              </Link>{" "}
              {text.MICROSOFT.on_mobile}
            </li>
          </ul>
        </div>
        <Link
          className="about-image"
          to="/microsoft-automatic-rewards/mobile/test-app"
        >
          <img
            className="about-phone"
            src={`${process.env.PUBLIC_URL}/assets/images/mar-phone.png`}
            alt="Microsoft Automatic Rewards Phone App"
          />
          <div>{text.MICROSOFT.download}</div>
        </Link>
      </div>
    </div>
  );
}

export default About;
