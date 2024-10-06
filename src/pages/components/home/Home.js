import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Sidebar from '../sidebar/Sidebar';
import './home.css';

function Home() {
    const [date, setDate] = useState(new Date());
    const [reminders, setReminders] = useState({});
    const [newReminder, setNewReminder] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const onDateChange = (selectedDate) => {
        setDate(selectedDate);
        setShowInput(false);
        setEditIndex(null);
    };

    const addOrEditReminder = () => {
        if (!newReminder.trim()) {
            setMessage("Por favor, introduce un recordatorio.");
            return;
        }

        const dateKey = date.toDateString();
        const currentReminders = reminders[dateKey] || [];
        
        if (editIndex !== null) {
            currentReminders[editIndex] = newReminder;
            setMessage("Recordatorio editado exitosamente.");
            setEditIndex(null);
        } else {
            currentReminders.push(newReminder);
            setMessage("Recordatorio añadido exitosamente.");
        }

        setReminders({
            ...reminders,
            [dateKey]: currentReminders,
        });

        setNewReminder('');
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
        setNewReminder(reminders[date.toDateString()][index]);
        setEditIndex(index);
        setShowInput(true);
    };

    const handleDeleteReminderClick = (index) => {
        const dateKey = date.toDateString();
        const currentReminders = reminders[dateKey] || [];
        currentReminders.splice(index, 1);

        if (currentReminders.length === 0) {
            const { [dateKey]: _, ...restReminders } = reminders;
            setReminders(restReminders);
        } else {
            setReminders({
                ...reminders,
                [dateKey]: currentReminders,
            });
        }

        setMessage("Recordatorio eliminado exitosamente.");

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
                        <p>{reminder}</p>
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
