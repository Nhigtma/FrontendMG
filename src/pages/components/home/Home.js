import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { downloadPDF } from '../../js/getPDF';
import { createReminder, deleteReminder, getReminders, updateReminder } from '../../js/reminder';
import Sidebar from '../sidebar/Sidebar';
import './home.css';

function Home() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('12:00'); // Establece un valor predeterminado para la hora
    const [reminders, setReminders] = useState({});
    const [newReminder, setNewReminder] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchReminders(userId);
        }
    }, []);

    const fetchReminders = async (userId) => {
        const fetchedReminders = await getReminders(userId);
        const remindersByDate = fetchedReminders.reduce((acc, reminder) => {
            const dateKey = new Date(reminder.reminder_date).toDateString();
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push({
                id: reminder.id,
                message: reminder.reminder_message,
                reminder_date: reminder.reminder_date, // Guardamos la fecha completa
            });
            return acc;
        }, {});
        setReminders(remindersByDate);
    };

    const onDateChange = (selectedDate) => {
        setDate(selectedDate);
        setShowInput(false);
        setEditIndex(null);
    };

    const addOrEditReminder = async () => {
        if (!newReminder.trim()) {
            setMessage("Por favor, introduce un recordatorio.");
            return;
        }

        const userId = localStorage.getItem('userId');
        const dateTime = new Date(date);
        const [hours, minutes] = time.split(':');
        dateTime.setHours(hours, minutes);

        const reminderData = {
            reminder_date: dateTime,
            reminder_message: newReminder,
        };

        if (editIndex !== null) {
            const dateKey = date.toDateString();
            const reminderId = reminders[dateKey][editIndex].id;
            await updateReminder(reminderId, reminderData);
            setMessage("Recordatorio editado exitosamente.");
            setEditIndex(null);
        } else {
            await createReminder(userId, reminderData);
            setMessage("Recordatorio añadido exitosamente.");
        }

        fetchReminders(userId);
        setNewReminder('');
        setTime('12:00'); // Resetear la hora a un valor predeterminado
        setShowInput(false);

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleAddReminderClick = () => {
        setShowInput(true);
        setMessage('');
        setEditIndex(null);
    };

    const handleEditReminderClick = (index) => {
        const dateKey = date.toDateString();
        const reminder = reminders[dateKey][index];
        setNewReminder(reminder.message);
        setTime(new Date(reminder.reminder_date).toTimeString().slice(0, 5)); // Cargar la hora al editar
        setEditIndex(index);
        setShowInput(true);
    };

    const handleDeleteReminderClick = async (index) => {
        const dateKey = date.toDateString();
        const reminderId = reminders[dateKey][index].id;
        await deleteReminder(reminderId);

        setMessage("Recordatorio eliminado exitosamente.");
        const userId = localStorage.getItem('userId');
        fetchReminders(userId);

        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const renderReminders = () => {
        const dateKey = date.toDateString();
        const remindersForDate = reminders[dateKey] || [];
        return remindersForDate.length > 0 ? (
            <div className="reminders-list">
                {remindersForDate.map((reminder, index) => (
                    <div key={index} className="reminder-card">
                        <p>{reminder.message} - {new Date(reminder.reminder_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <div className="reminder-actions">
                            <FaEdit onClick={() => handleEditReminderClick(index)} className="icon edit-icon" />
                            <FaTrashAlt onClick={() => handleDeleteReminderClick(index)} className="icon delete-icon" />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>No hay recordatorios para este día.</p>
        );
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateKey = date.toDateString();
            if (reminders[dateKey]) {
                return 'has-reminder';
            }
        }
        return null;
    };

    const handleCreatePdfClick = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (userId && token) {
            downloadPDF(userId, token);
        } else {
            console.error('User ID o token no encontrado');
        }
    };

    return (
        <div className="home-container">
            <Sidebar options={["Categoría", "Calendario"]} />

            <div className="home-content">
                <h1 className="welcome-title">Calendario</h1>
                <p className="welcome-message">Aquí podrás gestionar tus recordatorios.</p>

                <div className="calendar-reminders-container">
                    <div className="calendar-container">
                        <Calendar
                            onChange={onDateChange}
                            value={date}
                            tileClassName={tileClassName}
                            locale="es-ES"
                        />
                        <button className="create-pdf-button" onClick={handleCreatePdfClick}>
                            Crear PDF
                        </button>
                    </div>

                    <div className="reminders-section">
                        <h2 className="reminders-title">Recordatorios para <span>{date.toDateString()}</span>:</h2>
                        {renderReminders()}
                        {message && <p className="message">{message}</p>}
                        <div className="add-reminder">
                            {showInput ? (
                                <>
                                    <input
                                        type="text"
                                        value={newReminder}
                                        onChange={(e) => setNewReminder(e.target.value)}
                                        placeholder="Nuevo recordatorio"
                                    />
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                    <button onClick={addOrEditReminder}>
                                        {editIndex !== null ? "Guardar" : "Añadir"}
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleAddReminderClick} className="add-reminder-button">
                                    Añadir recordatorio
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
