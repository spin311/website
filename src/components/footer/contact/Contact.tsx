import { useLanguage } from "../../../context/LanguageContext";
import "./Contact.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { getOrCreateGUID } from "../../../helpers/Guid";
import { useNotification } from "../../../context/NotificationContext";
import { useSearchParams } from "react-router-dom";
import BackArrow from "../../back-arrow/BackArrow";
import IsRequired from "../../is-required/IsRequired";
import React from "react";
import { MailResponse } from "../../../types/ComponentTypes";

interface ContactProps {
  backArrow?: boolean;
  classes?: string;
}
export default function Contact({
  backArrow = false,
  classes = "",
}: ContactProps) {
  const { text } = useLanguage();
  const { createNotification } = useNotification();
  const [inputs, setInputs] = useState({
    subject: "",
    sender: "",
    contact: "",
    body: "",
    website: "", // Honeypot field
  });
  const [isSending, setIsSending] = useState(false);
  const [disabledSend, setDisabledSend] = useState(true);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const [searchParams] = useSearchParams();
  const subjectQueryParam = searchParams.get("subject");

  useEffect(() => {
    if (subjectQueryParam) {
      setInputs((values) => ({ ...values, subject: subjectQueryParam }));
    }
  }, [subjectQueryParam]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guid = getOrCreateGUID();
    try {
      setIsSending(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST ?? ""}/sendEmail`,
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
        setInputs((values) => ({
          ...values,
          subject: "",
          body: "",
          website: "",
        }));
        createNotification(text.CONTACT.success, "success");
      } else {
        createNotification(
          `${text.CONTACT.error}\nError:${re.Message ?? "Error sending email. Please try again later."}`,
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
    if (
      inputs.subject &&
      inputs.contact &&
      inputs.contact.includes("@") &&
      inputs.body
    ) {
      setDisabledSend(false);
    } else {
      setDisabledSend(true);
    }
  }, [inputs]);

  return (
    <div className={`contact-form ${classes}`} id="contact">
      {backArrow && <BackArrow />}
      <h2>{text.CONTACT.title}</h2>
      <p>{text.CONTACT.description}</p>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <label htmlFor="subject">
          {text.CONTACT.subject} <IsRequired />
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={inputs.subject}
          onChange={handleChange}
          placeholder={text.CONTACT.subject_placeholder}
          required
        />

        <label htmlFor="sender">{text.CONTACT.sender}</label>
        <input
          type="text"
          id="sender"
          name="sender"
          value={inputs.sender}
          onChange={handleChange}
          placeholder={text.CONTACT.sender_placeholder}
          required
        />

        <label htmlFor="contactInput">
          {text.CONTACT.contact} <IsRequired />
        </label>
        <input
          type="text"
          id="contactInput"
          name="contact"
          value={inputs.contact}
          placeholder={text.CONTACT.contact_placeholder}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          value={inputs.website}
          onChange={handleChange}
          autoComplete="off"
          style={{ display: "none" }}
          tabIndex={-1}
        />

        <label htmlFor="body">
          {text.CONTACT.message} <IsRequired />
        </label>
        <textarea
          id="body"
          name="body"
          rows={6}
          value={inputs.body}
          onChange={handleChange}
          placeholder={text.CONTACT.message_placeholder}
          required
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
  );
}
