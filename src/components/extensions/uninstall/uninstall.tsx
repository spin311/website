import { Helmet } from "react-helmet";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import React from "react";

import { useLanguage } from "../../../context/LanguageContext";
import { useNotification } from "../../../context/NotificationContext";

import "./uninstall.css";
import IsRequired from "../../is-required/IsRequired";
import { UninstallBody } from "../../../types/ComponentTypes";

function Uninstall() {
  const { text } = useLanguage();
  const { createNotification } = useNotification();
  const [inputs, setInputs] = useState({
    reason: "",
    contact: "",
    explanation: "",
  });
  const [wasSent, setWasSent] = useState(false);
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
    setIsSending(true);

    const resetInputs = () =>
      setInputs({ reason: "", contact: "", explanation: "" });

    const notifySuccess = () =>
      createNotification(text.CONTACT.success, "success");
    const notifyError = (message?: string) =>
      createNotification(
        `${text.CONTACT.error}\nError: ${message || "There was an error sending the email. Please try again later."}`,
        "error",
      );

    try {
      const apiHost = import.meta.env.VITE_API_HOST ?? "";
      const uninstall: UninstallBody = {
        extension_name: extensionName || "Extension",
        reason: inputs.reason,
        contact: inputs.contact,
        message: inputs.explanation,
      };

      const response = await fetch(`${apiHost}/uninstall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uninstall),
      });

      if (response.ok) {
        resetInputs();
        notifySuccess();
        setWasSent(true);
      } else {
        notifyError();
      }
    } catch (e) {
      notifyError();
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    setDisabledSend(
      !inputs.reason ||
        (inputs.reason === text.EXTENSION.other && !inputs.explanation) ||
        wasSent,
    );
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

          <label htmlFor="body">
            {text.CONTACT.message}{" "}
            {inputs.reason === text.EXTENSION.other && !inputs.explanation ? (
              <IsRequired />
            ) : null}
          </label>
          <textarea
            id="body"
            name="explanation"
            rows={4}
            value={inputs.explanation}
            onChange={handleChange}
            placeholder={text.CONTACT.message_placeholder}
          ></textarea>

          <label htmlFor="contactInput">{text.CONTACT.contact} </label>
          <input
            type="text"
            id="contactInput"
            name="contact"
            value={inputs.contact}
            placeholder={text.EXTENSION.your_email}
            onChange={handleChange}
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
    </>
  );
}

export default Uninstall;
