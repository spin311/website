import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ImageTooltip.css";
import React from "react";

type ImageTooltipProps = {
  src: string;
};
function ImageTooltip({ src }: ImageTooltipProps) {
  return (
    <div className="tooltip">
      <FontAwesomeIcon icon={faInfoCircle} className="tooltip-icon" />
      <img
        className="tooltip-image"
        src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/images/${src}`}
        alt="tooltip steps"
      />
    </div>
  );
}

export default ImageTooltip;
