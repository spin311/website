import SidebarButtons from "../sidebar-buttons/SidebarButtons";
import Contact from "../footer/contact/Contact";
import "./ContactMe.css"
function ContactMe() {
    return (
        <div className={"contact-me"}>
            <Contact className={"contact"} backArrow={true}></Contact>
        </div>
    );
}
    export default ContactMe;
