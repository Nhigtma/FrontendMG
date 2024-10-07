import React from 'react';
import useWebSocketNotifications from '../../js/notificiones';

const NotificationsComponent = () => {
    const notifications = useWebSocketNotifications('ws://localhost:4000');

    return (
        <div>
            <h2>Notificaciones</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <strong>{notification.type}:</strong> {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsComponent;