import "./TestList.css";
import { FormEvent, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { Helmet } from "react-helmet";
import React from "react";

import { useLanguage } from "../../../../../context/LanguageContext";
import { useNotification } from "../../../../../context/NotificationContext";
import { getOrCreateGUID } from "../../../../../helpers/Guid";
import BackArrow from "../../../../back-arrow/BackArrow";
import IsRequired from "../../../../is-required/IsRequired";
import { MailResponse } from "../../../../../types/ComponentTypes";

function TestList({ backArrow = false }: { backArrow?: boolean }) {
  const { text, formatTextWithLineBreaks } = useLanguage();
  const { createNotification } = useNotification();
  const [contact, setContact] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [disabledSend, setDisabledSend] = useState(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guid = getOrCreateGUID();
    try {
      setIsSending(true);
      const inputs = {
        subject: "Test Microsoft Automatic Rewards phone app",
        sender: "newTestUser",
        contact: contact,
        body: `${contact} wants to test Microsoft Automatic Rewards phone app.`,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST ?? ""}/sendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": guid,
          },
          body: JSON.stringify(inputs),
        },
      );
      const re = (await response.json()) as MailResponse;
      if (response.ok) {
        createNotification(text.CONTACT.success_test_app, "success");
      } else {
        createNotification(
          `${text.CONTACT.error}\nError:${re.Message ?? "There was an error sending the email. Please try again later."}`,
          "error",
        );
      }
    } catch (e) {
      createNotification(text.CONTACT.error, "error");
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    if (contact?.includes("@")) {
      setDisabledSend(false);
    } else {
      setDisabledSend(true);
    }
  }, [contact]);

  return (
    <>
      <Helmet>
        <title>Test Microsoft Automatic Rewards phone app</title>
        <meta
          name="description"
          content="Test Microsoft Automatic Rewards phone app"
        />
      </Helmet>
      <BackArrow />
      <div className="center">
        <div className="row">
          <div className="contact-form p-lg">
            {backArrow && <BackArrow />}
            <h2>{text.MICROSOFT.test_title}</h2>
            <p>{formatTextWithLineBreaks(text.MICROSOFT.test_description)}</p>
            <form onSubmit={(e) => void handleSubmit(e)}>
              <label htmlFor="contactInput">
                {text.GENERAL.e_mail} <IsRequired />
              </label>
              <input
                type="text"
                id="contactInput"
                name="contact"
                value={contact}
                placeholder={text.EXTENSION.your_email}
                onChange={(e) => setContact(e.target.value)}
              />
              <button
                type="submit"
                disabled={disabledSend}
                data-tooltip-id="disabled-btn-tooltip"
                data-tooltip-content={text.CONTACT.disabled_tooltip}
                data-tooltip-place="right"
              >
                {isSending ? text.CONTACT.sending : text.CONTACT.send}
              </button>
              {disabledSend && <Tooltip id="disabled-btn-tooltip" />}
            </form>
          </div>
          <img
            className="phone-img"
            src={`${process.env.PUBLIC_URL ?? ""}/assets/images/mar-phone.png`}
            alt="Microsoft Automatic Rewards Phone App"
          />
        </div>
      </div>
    </>
  );
}
export default TestList;
