import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useLanguage } from "../../../../context/LanguageContext";
import "./Bitcoin.css";

function Bitcoin() {
  const { text } = useLanguage();
  const btcAddress = "bc1qqy8nv2d8smd0h0lf95uapajqtdzy9j8n0v7rmh";
  const btcURI = `bitcoin:${btcAddress}?message=extension%20donation`;
  const [copied, setCopied] = useState<boolean>(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="donation-card">
      <div className="donation-title">
        Crypto (Bitcoin)
        <img
          className="donate-svg"
          src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/bitcoin.svg`}
          alt="bitcoin"
        />
      </div>
      <QRCodeCanvas value={btcURI} size={90} />
      <div>
        <p className="btc-address">
          {btcAddress}
          <a onClick={copyAddress} className="copy-button">
            <img
              className="donate-svg"
              src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/copy.svg`}
              alt="copy"
              data-tooltip-id="copied-tooltip"
            />
          </a>
          <Tooltip
            id="copied-tooltip"
            isOpen={copied}
            content={`${text.EXTENSION.copy_tooltip} ✔`}
            place="right"
          />
        </p>
      </div>
    </div>
  );
}

export default Bitcoin;
