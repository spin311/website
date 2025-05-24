import { useEffect } from "react";

import "./Notification.css";
import { NotificationMessage } from "../../types/ComponentTypes";

type NotificationProps = {
  notificationMessage: NotificationMessage;
  onClose: (id: string) => void;
};

function Notification({ notificationMessage, onClose }: NotificationProps) {
  const { message, type, id } = notificationMessage;
  const CLOSE_TIMEOUT = 10000;
  useEffect(() => {
    setTimeout(() => {
      onClose(id);
    }, CLOSE_TIMEOUT);
  }, [id, onClose]);

  const formatMessage = (message: string) => {
    return message.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <div className={`notification ${type}`}>
      <span className="x-button" onClick={() => onClose(id)}>
        X
      </span>
      <div className="content">
        <span
          className={`icon ${type === "success" ? "fa fa-check-circle" : type === "error" ? "fa fa-times-circle" : ""}`}
        ></span>
        <p>{formatMessage(message)}</p>
      </div>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
}

export default Notification;
