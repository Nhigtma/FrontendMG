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

        console.log('Valores actuales:', {
            title,
            description,
            userId,
            categoryId,
            isRoutine,
            weeklyRoutine,
        });

        const missingFields = [];
        if (!title) missingFields.push('Título');
        if (!description) missingFields.push('Descripción');
        if (!userId) missingFields.push('userId');
        if (!categoryId) missingFields.push('categoryId');

        if (missingFields.length > 0) {
            alert(`Faltan los siguientes campos: ${missingFields.join(', ')}`);
            return;
        }

        // Validación: Si es una rutina, asegurarse de que haya al menos un día con valor
        if (isRoutine && Object.values(weeklyRoutine).every(day => day === '')) {
            alert("Debes ingresar al menos una rutina para algún día.");
            return;
        }

        const routines = {
            lunes: weeklyRoutine.lunes || null,
            martes: weeklyRoutine.martes || null,
            miercoles: weeklyRoutine.miercoles || null,
            jueves: weeklyRoutine.jueves || null,
            viernes: weeklyRoutine.viernes || null,
            sabado: weeklyRoutine.sabado || null,
            domingo: weeklyRoutine.domingo || null,
        };

        try {
            if (isRoutine) {
                const wishData = {
                    title,
                    description,
                    user_id: userId,
                    category_id: categoryId,
                    is_routine: true,
                    routines
                };
                await createWishWithRoutine(wishData);
                console.log('Deseo con rutina creado exitosamente');
            } else {
                await createWish(title, description, categoryId, userId, false, null);
                console.log('Deseo creado exitosamente');
            }
            onClose();
        } catch (error) {
            console.error('Error al crear el deseo o la rutina:', error.message);
        }
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
                                <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
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
