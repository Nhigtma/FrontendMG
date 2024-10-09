import { useEffect, useRef, useState } from 'react';

const useWebSocketNotifications = (socketUrl) => {
    const [notifications, setNotifications] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const socketRef = useRef(null);
    const isReconnecting = useRef(false);

    useEffect(() => {
        const connectWebSocket = () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                return;
            }

            socketRef.current = new WebSocket(socketUrl);

            socketRef.current.addEventListener('open', () => {
                console.log('Conectado al servidor WebSocket.');
                setConnectionStatus('connected');
                isReconnecting.current = false;
            });

            socketRef.current.addEventListener('message', (event) => {
                console.log('Mensaje recibido del WebSocket:', event.data); // Depuración para mostrar el mensaje recibido
                try {
                    const notification = JSON.parse(event.data);
                    handleNotification(notification);
                } catch (error) {
                    console.error('Error al parsear el mensaje:', error);
                }
            });

            socketRef.current.addEventListener('error', (error) => {
                console.error('Error en la conexión WebSocket:', error);
                setConnectionStatus('error');
            });

            socketRef.current.addEventListener('close', (event) => {
                console.log('Conexión WebSocket cerrada:', event);
                setConnectionStatus('closed');
                if (!isReconnecting.current) {
                    isReconnecting.current = true;
                    setTimeout(connectWebSocket, 5000);
                }
            });
        };

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [socketUrl]);

    const handleNotification = (notification) => {
        console.log('Procesando notificación:', notification);
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
        const { user_id, message } = notification;
        const storedUserId = localStorage.getItem('userId'); // Obtener userId desde localStorage

        // Verificar si el user_id de la notificación coincide con el almacenado en localStorage
        if (user_id === storedUserId) {
            displayReminder(message);
        } else {
            console.log(`Notificación ignorada, user_id: ${user_id} no coincide con el almacenado: ${storedUserId}`);
        }
    };

    const displayReminder = (message) => {
        console.log('Recordatorio:', message);
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { type: 'reminder', message }
        ]);
    };

    const displayEvaluation = (notification) => {
        console.log('Evaluación:', notification.message);
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { type: 'evaluation', message: notification.message }
        ]);
    };

    const displayRoutineUpdate = (notification) => {
        console.log('Actualización de rutina:', notification.message);
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { type: 'routine', message: notification.message }
        ]);
    };

    return { notifications, connectionStatus };
};

export default useWebSocketNotifications;
