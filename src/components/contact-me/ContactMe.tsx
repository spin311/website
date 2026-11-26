import RouteMeta from "../../seo/RouteMeta";
import React from "react";

import Contact from "../footer/contact/Contact";
function ContactMe() {
  return (
    <>
      <RouteMeta path="/contact" />
      <div className={"center"}>
        <Contact classes={"w-40"} backArrow={true}></Contact>
      </div>
    </>
  );
}
export default ContactMe;
