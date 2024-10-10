import React, { useState } from 'react';
import { createWishWithRoutine } from '../../js/routineWishes';
import { createWish } from '../../js/wish';
import './createWishModal.css';

function CreateWishModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isRoutine, setIsRoutine] = useState(false);
    const [weeklyRoutine, setWeeklyRoutine] = useState({
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        domingo: '',
    });

    const handleCreate = async () => {
        const userId = localStorage.getItem('userId');
        const categoryId = localStorage.getItem('categoryId');

        if (!title || !description || !userId || !categoryId) {
            alert('Faltan campos obligatorios');
            return;
        }

        if (isRoutine && Object.values(weeklyRoutine).every(day => day === '')) {
            alert("Debes ingresar al menos una rutina.");
            return;
        }

        const routines = { ...weeklyRoutine };
        try {
            const wishData = { title, description, user_id: userId, category_id: categoryId, is_routine: isRoutine, routines: isRoutine ? routines : null };

            if (isRoutine) {
                await createWishWithRoutine(wishData);
                console.log('Deseo con rutina creado');
            } else {
                await createWish(title, description, categoryId, userId, false, null);
                console.log('Deseo creado');
            }

            // Guardar el deseo en localStorage
            const existingWishes = JSON.parse(localStorage.getItem('wishes')) || [];
            existingWishes.push(wishData);
            localStorage.setItem('wishes', JSON.stringify(existingWishes));

            onClose();
        } catch (error) {
            console.error('Error al crear deseo:', error.message);
        }
    };

    const handleRoutineChange = (day, value) => {
        setWeeklyRoutine({ ...weeklyRoutine, [day]: value });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-deseos">
                <h2>Crear Nuevo Deseo</h2>

                <label htmlFor="title">Título:</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Escribe el título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    placeholder="Escribe la descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="checkbox-container">
                    <input
                        id="isRoutine"
                        type="checkbox"
                        checked={isRoutine}
                        onChange={() => setIsRoutine(!isRoutine)}
                    />
                    <label htmlFor="isRoutine">Rutina</label>
                </div>

                {isRoutine && (
                    <div className="routine-days">
                        {Object.keys(weeklyRoutine).map((day) => (
                            <div key={day}>
                                <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                                <input
                                    id={day}
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
