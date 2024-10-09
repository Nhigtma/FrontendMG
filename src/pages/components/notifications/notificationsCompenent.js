import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useWebSocketNotifications from '../../js/notificiones';
import './notificationsCompenent.css';

const NotificationsComponent = () => {
    const { notifications, connectionStatus } = useWebSocketNotifications('ws://localhost:4000');
    const [visibleNotifications, setVisibleNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    useEffect(() => {
        if (notifications.length > 0) {
            setVisibleNotifications(prevNotifications => [
                ...prevNotifications,
                ...notifications,
            ]);


            const timeoutId = setTimeout(() => {
                setVisibleNotifications(prevNotifications => prevNotifications.slice(1));
            }, 30000);

            return () => clearTimeout(timeoutId);
        }
    }, [notifications]);

    return (
        <div className="notifications-container">
            <Button variant="contained" onClick={toggleNotifications}>
                {showNotifications ? 'Ocultar Notificaciones' : 'Mostrar Notificaciones'}
            </Button>
            {showNotifications && (
                <div>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Notificaciones
                    </Typography>
                    {visibleNotifications.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            No hay notificaciones por el momento.
                        </Typography>
                    ) : (
                        <List>
                            {visibleNotifications.map((notification, index) => (
                                <Card key={index} className="notification-card">
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText
                                                secondary={<Typography variant="body2">{notification.message}</Typography>}
                                            />
                                        </ListItem>
                                    </CardContent>
                                </Card>
                            ))}
                        </List>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsComponent;
