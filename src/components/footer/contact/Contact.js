import {useLanguage} from "../../../context/LanguageContext";
import "./Contact.css";
import {useEffect, useState} from "react";
import {Tooltip} from "react-tooltip";
import {getOrCreateGUID} from "../../../helpers/Guid";

function Contact() {
    let {text} = useLanguage();
    const [inputs, setInputs] = useState({
        subject: '',
        sender: '',
        contact: '',
        body: ''
    });    const [disabledSend, setDisabledSend] = useState(true);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const guid = getOrCreateGUID();
        const response = await fetch("http://localhost:8080/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-ID": guid
            },
            body: JSON.stringify(inputs)
        });
        const result = await response.json();
        setInputs(values => ({
            ...values,
            subject: '',
            body: ''
        }))
        console.log(result);
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
            <h2>{text.CONTACT.title}</h2>
            <p>{text.CONTACT.description}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">{text.CONTACT.subject} <span className="is-required">*</span></label>
                <input type="text" id="subject" name="subject"
                       value={inputs.subject}
                       onChange={handleChange}
                       placeholder={text.CONTACT.subject_placeholder}
                       required/>

                <label htmlFor="sender">{text.CONTACT.sender} <span className="is-required">*</span></label>
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

                <label htmlFor="body">{text.CONTACT.message} <span className="is-required">*</span></label>
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
                >{text.CONTACT.send}</button>

                {disabledSend && <Tooltip id="disabled-btn-tooltip"/>}
            </form>
        </div>
    );
}
export default Contact;