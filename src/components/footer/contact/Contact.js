import {useLanguage} from "../../../context/LanguageContext";
import "./Contact.css";
import {useEffect, useState} from "react";
import {Tooltip} from "react-tooltip";
import {getOrCreateGUID} from "../../../helpers/Guid";
import {useNotification} from "../../../context/NotificationContext";
import {useSearchParams} from "react-router-dom";
import HomeArrow from "../../home-arrow/HomeArrow";
import IsRequired from "../../is-required/IsRequired";

function Contact({backArrow = false}) {
    let {text} = useLanguage();
    let {createNotification} = useNotification();
    const [inputs, setInputs] = useState({
        subject: '',
        sender: '',
        contact: '',
        body: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [disabledSend, setDisabledSend] = useState(true);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const [searchParams] = useSearchParams();
    const subjectQueryParam = searchParams.get('subject');

    useEffect(() => {
        if (subjectQueryParam) {
            setInputs(values => ({...values, subject: subjectQueryParam}));
        }
    }, [subjectQueryParam]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const guid = getOrCreateGUID();
        try {
            setIsSending(true);
            const response = await fetch("https://website-production-967e.up.railway.app/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-ID": guid
                },
                body: JSON.stringify(inputs)
            });
            const re = await response.json();
            if (response.ok) {
                setInputs(values => ({
                    ...values,
                    subject: '',
                    body: ''
                }));
                createNotification(text.CONTACT.success, 'success');
            } else {
                createNotification(`${text.CONTACT.error}\nError:${re.Message}`, 'error');
            }
        } catch (e) {
            createNotification(text.CONTACT.error, 'error');
        }
        finally {
            setIsSending(false);
        }
    }
    useEffect(() => {
        if (inputs.subject && inputs.sender && inputs.body) {
            setDisabledSend(false);
        } else {
            setDisabledSend(true);
        }
    }, [inputs]);

    return (
        <div className="contact-form" id="contact">
            {backArrow && <HomeArrow/>}
            <h2>{text.CONTACT.title}</h2>
            <p>{text.CONTACT.description}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">{text.CONTACT.subject} <IsRequired/></label>
                <input type="text" id="subject" name="subject"
                       value={inputs.subject}
                       onChange={handleChange}
                       placeholder={text.CONTACT.subject_placeholder}
                       required/>

                <label htmlFor="sender">{text.CONTACT.sender} <IsRequired/></label>
                <input type="text" id="sender" name="sender"
                       value={inputs.sender}
                       onChange={handleChange}
                          placeholder={text.CONTACT.sender_placeholder}
                       required/>

                <label htmlFor="contactInput">{text.CONTACT.contact} </label>
                <input type="text" id="contactInput" name="contact"
                       value={inputs.contact}
                       placeholder={text.CONTACT.contact_placeholder}
                       onChange={handleChange}
                />

                <label htmlFor="body">{text.CONTACT.message} <IsRequired/></label>
                <textarea id="body" name="body" rows="6"
                          value={inputs.body}
                          onChange={handleChange}
                            placeholder={text.CONTACT.message_placeholder}
                          required></textarea>

                <button type="submit"
                disabled={disabledSend}
                data-tooltip-id="disabled-btn-tooltip"
                data-tooltip-content={text.CONTACT.disabled_tooltip}
                data-tooltip-place="right"
                >
                    {isSending ? text.CONTACT.sending : text.CONTACT.send}
                </button>
                {disabledSend && <Tooltip id="disabled-btn-tooltip"/>}
            </form>

        </div>
    );
}
export default Contact;