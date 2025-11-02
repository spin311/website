import { Helmet } from "react-helmet";
import React from "react";
import "./Donate.css";
import { useLanguage } from "../../../context/LanguageContext";
import BackArrow from "../../back-arrow/BackArrow";
import Bitcoin from "./bitcoin/Bitcoin";
import Paypal from "./paypal/Paypal";
import Kofi from "./kofi/Kofi";

interface DonateProps {
  soloComponent?: boolean;
  className?: string;
}

function Donate({ soloComponent = false, className = "" }: DonateProps) {
  const { text, formatHtml } = useLanguage();

  return (
    <>
      {soloComponent && (
        <>
          <Helmet>
            <title>Donate</title>
            <meta
              name="description"
              content="Donate reasons and ways to donate"
            />
          </Helmet>
          <BackArrow />
        </>
      )}
      <div
        id="donate"
        className={soloComponent ? `center ${className}` : className}
      >
        <div className={soloComponent ? "solo" : ""}>
          <h2>{text.GENERAL.donate}</h2>
          <p>{formatHtml(text.EXTENSION.donate_explanation)}</p>
          <ul>
            <li>{formatHtml(text.EXTENSION.donate1)}</li>
            <li>{formatHtml(text.EXTENSION.donate2)}</li>
            <li>{formatHtml(text.EXTENSION.donate3)}</li>
          </ul>
          <p>{formatHtml(text.EXTENSION.donation_request)}</p>
          <div className="donate-options">
            <div className="donations-container">
              <Paypal />
              <Kofi />
              <Bitcoin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donate;
