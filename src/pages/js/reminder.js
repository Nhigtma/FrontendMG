const BASE_URL = 'http://localhost:4000/protected/reminders';

export async function createReminder(userId, reminderData) {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: userId,
            reminder_date: reminderData.reminder_date,
            reminder_message: reminderData.reminder_message,
            is_sent: false,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Recordatorio creado:', data);
    } else {
        console.error('Error al crear el recordatorio:', response.statusText);
    }
}

export async function getReminders(userId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const reminders = await response.json();
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

export async function getReminderById(reminderId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const reminder = await response.json();
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

export async function updateReminder(reminderId, updatedData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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

export async function deleteReminder(reminderId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${reminderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        console.log('Recordatorio eliminado correctamente');
    } else {
        console.error('Error al eliminar el recordatorio:', response.statusText);
    }
}