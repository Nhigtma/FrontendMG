const BASE_URL = 'http://localhost:4000/protected/reminders'; // Cambia la URL según tu configuración

// Función para crear un nuevo recordatorio
export async function createReminder(userId, reminderData) {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token correcto
        },
        body: JSON.stringify({
            user_id: userId,
            reminder_date: reminderData.reminder_date,
            reminder_message: reminderData.reminder_message,
            is_sent: false, // Cambia esto si es necesario
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Recordatorio creado:', data);
    } else {
        console.error('Error al crear el recordatorio:', response.statusText);
    }
}

// Función para obtener todos los recordatorios de un usuario
export async function getReminders(userId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token correcto
        },
    });

    if (response.ok) {
        const reminders = await response.json();
        // Retornamos solo la fecha y la descripción
        const filteredReminders = reminders.map(reminder => ({
            reminder_date: reminder.reminder_date,
            reminder_message: reminder.reminder_message,
        }));
        console.log('Recordatorios:', filteredReminders);
        return filteredReminders;
    } else {
        console.error('Error al obtener los recordatorios:', response.statusText);
    }
}

// Función para obtener un recordatorio por ID
export async function getReminderById(reminderId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token correcto
        },
    });

    if (response.ok) {
        const reminder = await response.json();
        // Retornamos solo la fecha y la descripción
        const filteredReminder = {
            reminder_date: reminder.reminder_date,
            reminder_message: reminder.reminder_message,
        };
        console.log('Recordatorio encontrado:', filteredReminder);
        return filteredReminder;
    } else {
        console.error('Error al obtener el recordatorio:', response.statusText);
    }
}

// Función para actualizar un recordatorio por ID
export async function updateReminder(reminderId, updatedData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token correcto
        },
        body: JSON.stringify(updatedData),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Recordatorio actualizado:', data);
    } else {
        console.error('Error al actualizar el recordatorio:', response.statusText);
    }
}

// Función para eliminar un recordatorio por ID
export async function deleteReminder(reminderId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de tener el token correcto
        },
    });

    if (response.ok) {
        console.log('Recordatorio eliminado correctamente');
    } else {
        console.error('Error al eliminar el recordatorio:', response.statusText);
    }
}
/*
// Ejemplo de uso
const userId = 'el_id_del_usuario'; // Cambia esto al ID del usuario correcto
const reminderData = {
    reminder_date: '2024-10-08T10:00:00Z', // Cambia esto a la fecha y hora del recordatorio
    reminder_message: 'Este es un recordatorio de prueba', // Cambia esto al mensaje del recordatorio
};

// Crear un nuevo recordatorio
createReminder(userId, reminderData);

// Obtener todos los recordatorios del usuario
getReminders(userId);

// Obtener un recordatorio específico por ID
const reminderId = 'el_id_del_recordatorio'; // Cambia esto al ID del recordatorio correcto
getReminderById(reminderId);

// Actualizar un recordatorio específico
const updatedReminderData = {
    reminder_date: '2024-10-09T10:00:00Z', // Nueva fecha
    reminder_message: 'Este es un recordatorio actualizado', // Nuevo mensaje
};
updateReminder(reminderId, updatedReminderData);

// Eliminar un recordatorio específico
deleteReminder(reminderId);
*/