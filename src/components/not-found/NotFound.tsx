import "./NotFound.css";
import RouteMeta from "../../seo/RouteMeta";
import { NOT_FOUND_PATH } from "../../seo/routes";
import React from "react";

import BackArrow from "../back-arrow/BackArrow";
import { useLanguage } from "../../context/LanguageContext";

function NotFound() {
  const { text } = useLanguage();
  return (
    <>
      <RouteMeta path={NOT_FOUND_PATH} />
      <BackArrow />
      <div className={"notFound"}>
        <h1>404 {text.GENERAL.not_found}</h1>
        <img
          className={"dogImg"}
          src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/sniffer.jpg`}
          alt="dog"
        />
      </div>
    </>
  );
}

export default NotFound;
