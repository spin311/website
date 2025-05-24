import { Helmet } from "react-helmet";

import Contact from "../footer/contact/Contact";
function ContactMe() {
  return (
    <>
      <Helmet>
        <title>Contact Me</title>
        <meta name="description" content="Contact me" />
      </Helmet>
      <div className={"center"}>
        <Contact classes={"w-40"} backArrow={true}></Contact>
      </div>
    </>
  );
}
export default ContactMe;
