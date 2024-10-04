import React, { useState } from 'react';
import './createWishModal.css';

function CreateWishModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isRoutine, setIsRoutine] = useState(false);
    const [weeklyRoutine, setWeeklyRoutine] = useState({
        Lunes: '',
        Martes: '',
        Miercoles: '',
        Jueves: '',
        Viernes: '',
        Sabado: '',
        Domingo: '',
    });

    const handleCreate = () => {
        console.log('Título:', title);
        console.log('Descripción:', description);
        console.log('Rutina:', isRoutine ? weeklyRoutine : 'Sin rutina');
        onClose();
    };

    const handleRoutineChange = (day, value) => {
        setWeeklyRoutine({ ...weeklyRoutine, [day]: value });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-deseos">
                <h2>Crear Nuevo Deseo</h2>

                <label>Título:</label>
                <input
                    type="text"
                    placeholder="Escribe el título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Descripción:</label>
                <textarea
                    placeholder="Escribe la descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={isRoutine}
                        onChange={() => setIsRoutine(!isRoutine)}
                    />
                    <label>Rutina</label>
                </div>

                {isRoutine && (
                    <div className="routine-days">
                        {Object.keys(weeklyRoutine).map((day) => (
                            <div key={day}>
                                <label>{day}:</label>
                                <input
                                    type="text"
                                    value={weeklyRoutine[day]}
                                    onChange={(e) => handleRoutineChange(day, e.target.value)}
                                    placeholder={`Escribe la rutina para ${day}`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="modal-actions">
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleCreate}>Crear</button>
                </div>
            </div>
        </div>
    );
}

export default CreateWishModal;
