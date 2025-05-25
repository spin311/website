import { useLocation, useNavigate } from "react-router-dom";
import "./BackArrow.css";
import React from "react";

function BackArrow() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.key === "default") {
      void navigate("/");
    } else {
      void navigate(-1);
    }
  };

  return (
    <div>
      <div className="left-arrow-button" onClick={handleBackClick}>
        <img
          className="left-arrow"
          src={`${import.meta.env.PUBLIC_URL ?? ""}/assets/svgs/left-arrow.svg`}
          alt="left arrow"
        />
      </div>
    </div>
  );
}
export default BackArrow;
