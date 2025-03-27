import Contact from "../footer/contact/Contact";
import {Helmet} from "react-helmet";
function ContactMe() {
    return (
        <>
            <Helmet>
                <title>Contact Me</title>
                <meta name="description" content="Contact me" />
            </Helmet>
            <div className={"center"}>
                <Contact className={"w-40"} backArrow={true}></Contact>
            </div>
        </>
    );
}
    export default ContactMe;
