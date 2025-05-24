import React, { createContext, useContext, useState } from "react";

import Notification from "../components/notification/Notification";
import "./styles/NotificationContext.css";
import { ReactNodeProps } from "../types/PropTypes";
import { NotificationMessage } from "../types/ComponentTypes";

type NotificationContextType = {
  createNotification: (
    message: string,
    type: NotificationMessage["type"],
  ) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: ReactNodeProps) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const addNotification = (notification: NotificationMessage) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const createNotification = (
    message: string,
    type: NotificationMessage["type"],
  ) => {
    const id = new Date().getTime().toString(); // Unique ID
    addNotification({ id, message, type });
  };

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      <div className="notification-container">
        {notifications.map((notification: NotificationMessage) => (
          <Notification
            key={notification.id}
            notificationMessage={notification}
            onClose={removeNotification}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}

// Hook to use notifications in any component
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
