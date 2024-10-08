import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import useWebSocketNotifications from '../../js/notificiones';
import './notificationsCompenent.css';

const NotificationsComponent = () => {
    const notifications = useWebSocketNotifications('ws://localhost:4000');
    const [showNotifications, setShowNotifications] = useState(false); // Estado para manejar la visibilidad

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState); // Cambia la visibilidad
    };

    return (
        <div className="notifications-container">
            <Button variant="contained" onClick={toggleNotifications}>
                {showNotifications ? 'Ocultar Notificaciones' : 'Mostrar Notificaciones'}
            </Button>
            {showNotifications && ( // Solo muestra las notificaciones si el estado es verdadero
                <div>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Notificaciones
                    </Typography>
                    {notifications.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            No hay notificaciones por el momento.
                        </Typography>
                    ) : (
                        <List>
                            {notifications.map((notification, index) => (
                                <Card key={index} className="notification-card">
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText
                                                primary={<Typography variant="h6">{notification.type}</Typography>}
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
