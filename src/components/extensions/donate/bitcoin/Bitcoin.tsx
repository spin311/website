import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons/faBitcoin";

import { useLanguage } from "../../../../context/LanguageContext";
import { useNotification } from "../../../../context/NotificationContext";
import { BITCOIN_ADDRESS } from "../../extensionInfo";

const BITCOIN_URI = `bitcoin:${BITCOIN_ADDRESS}?message=extension%20donation`;
const COPIED_RESET_MS = 2000;
const QR_SIZE_PX = 112;

/** Bitcoin address with a QR code, collapsed by default to keep the section short. */
function Bitcoin() {
  const { text } = useLanguage();
  const { createNotification } = useNotification();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const timer = setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BITCOIN_ADDRESS);
      setIsCopied(true);
    } catch {
      createNotification(text.DONATE.copy_error, "error");
    }
  };

  return (
    <details className="donate-bitcoin">
      <summary>
        <FontAwesomeIcon icon={faBitcoin} className="donate-bitcoin-icon" />
        {text.DONATE.bitcoin}
      </summary>
      <div className="donate-bitcoin-body">
        <QRCodeSVG
          className="donate-qr"
          value={BITCOIN_URI}
          size={QR_SIZE_PX}
          marginSize={2}
          bgColor="#ffffff"
          fgColor="#000000"
          title={text.DONATE.bitcoin_qr}
        />
        <div>
          <code className="donate-btc-address">{BITCOIN_ADDRESS}</code>
          <button
            type="button"
            className="donate-button donate-copy"
            onClick={() => void copyAddress()}
          >
            <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
            {isCopied ? text.DONATE.copied : text.DONATE.copy}
          </button>
        </div>
      </div>
    </details>
  );
}

export default Bitcoin;
