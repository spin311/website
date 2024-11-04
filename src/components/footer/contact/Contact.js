import {useLanguage} from "../../../context/LanguageContext";
import "./Contact.css";
import {useEffect, useState} from "react";

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
        const response = await fetch("http://localhost:8080/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User-ID": "123"
            },
            body: JSON.stringify(inputs)
        });
        const result = await response.json();
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
        <div className="contact-form">
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

                <label htmlFor="contact">{text.CONTACT.contact} </label>
                <input type="text" id="contact" name="contact"
                       value={inputs.contact}
                       placeholder={text.CONTACT.contact_placeholder}
                       onChange={handleChange}
                />

                <label htmlFor="body">{text.CONTACT.message} <span className="is-required">*</span></label>
                <textarea id="body" name="body" rows="4"
                          value={inputs.body}
                          onChange={handleChange}
                            placeholder={text.CONTACT.message_placeholder}
                          required></textarea>

                <button type="submit"
                disabled={disabledSend}
                >{text.CONTACT.send}</button>
            </form>
        </div>
    );
}
export default Contact;