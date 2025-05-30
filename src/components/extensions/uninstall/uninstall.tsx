import { Helmet } from "react-helmet";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import { useNotification } from "../../../context/NotificationContext";
import { getOrCreateGUID } from "../../../helpers/Guid";

import "./uninstall.css";
import IsRequired from "../../is-required/IsRequired";
import { Mail, MailResponse } from "../../../types/ComponentTypes";

function Uninstall() {
  const { text } = useLanguage();
  const { createNotification } = useNotification();
  const [inputs, setInputs] = useState({
    reason: "",
    contact: "",
    explanation: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(() => ({ ...inputs, [name]: value }));
  };
  const [searchParams] = useSearchParams();
  const extensionName = searchParams.get("extension");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guid = getOrCreateGUID();
    try {
      setIsSending(true);
      const mail: Mail = {
        subject: `${extensionName || "Extension"} uninstall`,
        sender: `${extensionName || "Extension"} user`,
        contact: `${extensionName || "Extension"} user`,
        body: "",
      };
      if (inputs.contact?.trim()) {
        mail.contact = inputs.contact;
      }
      let bodyContent = `Reason: ${inputs.reason || ""}`;
      if (inputs.explanation?.trim()) {
        bodyContent += `\n\n${inputs.explanation}`;
      }
      mail.body = bodyContent;
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST ?? ""}/sendEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": guid,
          },
          body: JSON.stringify(mail),
        },
      );
      const re = (await response.json()) as MailResponse;
      if (response.ok) {
        setInputs(() => ({
          reason: "",
          contact: "",
          explanation: "",
        }));
        createNotification(text.CONTACT.success, "success");
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
    setDisabledSend(!inputs.reason);
  }, [inputs]);
  return (
    <>
      <Helmet>
        <title>Uninstall</title>
        <meta name="description" content="Uninstall reason" />
      </Helmet>
      <div className="uninstall-form center" id="contact">
        <h1>{text.EXTENSION.form_title}</h1>
        <p>{text.EXTENSION.form_explanation}</p>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <h2 className="uninstall-reason">
            {text.EXTENSION.uninstall_reason} <IsRequired />
          </h2>
          <div className="radio-options">
            <input
              type="radio"
              id="not-need"
              name="reason"
              value={text.EXTENSION.not_need}
              onChange={handleChange}
            />
            <label htmlFor="not-need">{text.EXTENSION.not_need}</label>
          </div>

          <div className="radio-options">
            <input
              type="radio"
              id="not-work"
              name="reason"
              value={text.EXTENSION.not_work}
              onChange={handleChange}
            />
            <label htmlFor="not-work">{text.EXTENSION.not_work}</label>
          </div>

          <div className="radio-options">
            <input
              type="radio"
              id="not-perform"
              name="reason"
              value={text.EXTENSION.not_perform}
              onChange={handleChange}
            />
            <label htmlFor="not-perform">{text.EXTENSION.not_perform}</label>
          </div>

          <div className="radio-options">
            <input
              type="radio"
              id="missing_feature"
              name="reason"
              value={text.EXTENSION.missing_feature}
              onChange={handleChange}
            />
            <label htmlFor="missing_feature">
              {text.EXTENSION.missing_feature}
            </label>
          </div>

          <div className="radio-options">
            <input
              type="radio"
              id="not_clear"
              name="reason"
              value={text.EXTENSION.not_clear}
              onChange={handleChange}
            />
            <label htmlFor="not_clear">{text.EXTENSION.not_clear}</label>
          </div>

          <div className="radio-options">
            <input
              type="radio"
              id="other"
              name="reason"
              value={text.EXTENSION.other}
              onChange={handleChange}
            />
            <label htmlFor="other">{text.EXTENSION.other}</label>
          </div>

          <label htmlFor="contactInput">{text.CONTACT.contact} </label>
          <input
            type="text"
            id="contactInput"
            name="contact"
            value={inputs.contact}
            placeholder={text.EXTENSION.your_email}
            onChange={handleChange}
          />

          <label htmlFor="body">{text.CONTACT.message}</label>
          <textarea
            id="body"
            name="explanation"
            rows={4}
            value={inputs.explanation}
            onChange={handleChange}
            placeholder={text.CONTACT.message_placeholder}
          ></textarea>

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
    </>
  );
}

export default Uninstall;
