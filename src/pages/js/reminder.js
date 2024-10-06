import { getAuth } from 'firebase/auth';

const API_URL = 'http://localhost:4000';

export const createReminder = async (reminderDate, reminderMessage, isSent, userId) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('El usuario no está autenticado');
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/protected/reminders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                reminder_date: reminderDate,
                reminder_message: reminderMessage,
                is_sent: isSent,
                user_id: userId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear el recordatorio');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear el recordatorio:', error.message);
        throw new Error(error.message);
    }
};

export const getRemindersByUserId = async (userId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/reminders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener los recordatorios');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener los recordatorios:', error.message);
        throw error;
    }
};

export const getReminderById = async (reminderId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/reminders/${reminderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener el recordatorio');
        }

        return data;
    } catch (error) {
        console.error('Error al obtener el recordatorio:', error.message);
        throw error;
    }
};

export const updateReminderById = async (reminderId, reminderDate, reminderMessage, isSent, userId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/reminders/${reminderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                reminder_date: reminderDate,
                reminder_message: reminderMessage,
                is_sent: isSent,
                user_id: userId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar el recordatorio');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el recordatorio:', error.message);
        throw new Error(error.message);
    }
};

export const deleteReminderById = async (reminderId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/protected/reminders/${reminderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el recordatorio');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el recordatorio:', error.message);
        throw error;
    }
};
