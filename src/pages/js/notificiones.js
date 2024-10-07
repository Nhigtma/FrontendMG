import { useEffect, useState } from 'react';

const useWebSocketNotifications = (socketUrl) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(socketUrl);

        socket.addEventListener('open', () => {
            console.log('Conectado al servidor WebSocket.');
        });

        socket.addEventListener('message', (event) => {
            const notification = JSON.parse(event.data);
            handleNotification(notification);
        });

        return () => {
            socket.close();
        };
    }, [socketUrl]);

    const handleNotification = (notification) => {
        switch (notification.type) {
            case 'reminder':
                scheduleReminder(notification);
                break;
            case 'evaluation':
                displayEvaluation(notification);
                break;
            case 'routine':
                displayRoutineUpdate(notification);
                break;
            default:
                console.log('Tipo de notificación desconocido:', notification);
        }
    };

    const scheduleReminder = (notification) => {
        const { timeRemaining, message } = notification;
        const timeDiff = new Date(timeRemaining).getTime() - new Date().getTime();

        if (timeDiff > 0) {
            // Ejecutar la notificación en el tiempo programado
            setTimeout(() => {
                displayReminder(message);
            }, timeDiff);
        } else {
            // Si la fecha ya pasó, mostrarla inmediatamente
            displayReminder(message);
        }
    };

    const displayReminder = (message) => {
        console.log('Recordatorio:', message);
        // Aquí puedes integrar el código para mostrar la notificación en la interfaz
        setNotifications((prevNotifications) => [...prevNotifications, { type: 'reminder', message }]);
    };

    const displayEvaluation = (notification) => {
        console.log('Evaluación:', notification.message);
        setNotifications((prevNotifications) => [...prevNotifications, { type: 'evaluation', message: notification.message }]);
    };

    const displayRoutineUpdate = (notification) => {
        console.log('Actualización de rutina:', notification.message);
        setNotifications((prevNotifications) => [...prevNotifications, { type: 'routine', message: notification.message }]);
    };

    return notifications;
};

export default useWebSocketNotifications;