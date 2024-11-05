import React, { createContext, useContext, useState } from "react";
import Notification from "../components/notification/Notification";
import "./styles/NotificationContext.css";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    const createNotification = (message, type) => {
        const id = new Date().getTime(); // Unique ID
        addNotification({ id, message, type });
    };

    return (
        <NotificationContext.Provider value={{ createNotification }}>
            <div className="notification-container">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        message={notification.message}
                        type={notification.type}
                        onClose={removeNotification}
                    />
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    );
}

// Hook to use notifications in any component
export const useNotification = () => useContext(NotificationContext);