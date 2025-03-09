import SidebarButtons from "../sidebar-buttons/SidebarButtons";
import Contact from "../footer/contact/Contact";
import "./ContactMe.css"
function ContactMe() {
    return (
        <div className={"contact-me"}>
            <SidebarButtons></SidebarButtons>
            <Contact className={"contact"}></Contact>
        </div>
    );
}
    export default ContactMe;
