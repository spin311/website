import "./TestList.css";
import {useEffect, useState} from "react";
import {Tooltip} from "react-tooltip";
import {useLanguage} from "../../../../../context/LanguageContext";
import {useNotification} from "../../../../../context/NotificationContext";
import {getOrCreateGUID} from "../../../../../helpers/Guid";
import HomeArrow from "../../../../home-arrow/HomeArrow";
import IsRequired from "../../../../is-required/IsRequired";
import {Helmet} from "react-helmet";

function TestList({backArrow = false}) {
    let {text} = useLanguage();
    let {createNotification} = useNotification();
    const [contact, setContact] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [disabledSend, setDisabledSend] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const guid = getOrCreateGUID();
        try {
            setIsSending(true);
            const inputs = {
                subject: 'Test Microsoft Automatic Rewards phone app',
                sender: 'newTestUser',
                contact: contact,
                body: `${contact} wants to test Microsoft Automatic Rewards phone app.`
            };
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/sendEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-ID": guid
                },
                body: JSON.stringify(inputs)
            });
            const re = await response.json();
            if (response.ok) {
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
                <meta name="description" content="Test Microsoft Automatic Rewards phone app" />
            </Helmet>
            <div className="center">
                <div className="row">
                    <div className="contact-form p-lg">
                        {backArrow && <HomeArrow/>}
                        <h2>Test Microsoft Automatic Rewards phone app</h2>
                        <p>Enter your E-mail below to test Microsoft Automatic Rewards phone app. <br/> Your invitation will be sent shortly (usually less than 24h)</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="contactInput">E-mail  <IsRequired/></label>
                            <input type="text" id="contactInput" name="contact"
                                   value={contact}
                                   placeholder={"Enter your e-mail"}
                                   onChange={(e) => setContact(e.target.value)}
                            />
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
                    <img className="phone-img" src={`${process.env.PUBLIC_URL}/assets/images/mar-phone.png`} alt="Microsoft Automatic Rewards Phone App"/>
                </div>
            </div>
        </>


    );
}
export default TestList;