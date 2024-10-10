import React, { useEffect, useState } from 'react';
import { getUserHistory } from '../../js/historial';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';
import './history.css';

const History = () => {
    const [highestScore, setHighestScore] = useState(null);
    const [wishes, setWishes] = useState([]); // Inicializa como un array vacío
    const [error, setError] = useState(null); // Usamos el estado de error

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const data = await getUserHistory();
                if (data && data.wishes) {
                    setHighestScore(data.highestScore);
                    setWishes(data.wishes);
                } else {
                    setWishes([]); // Aseguramos que wishes sea un array
                }
            } catch (err) {
                setError('Hubo un problema al cargar el historial.'); // Guardar el mensaje de error
            }
        };

        fetchUserHistory();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className="history-container">
            <Topbar />
            <div className="history-content">
                <Sidebar
                    options={['Categoria', 'Calendario']}
                    categories={[]}
                />
                <div className="history-main">
                    <div className="history-inner">
                        <h1>Historial de Actividades</h1>
                        <p>Aquí puedes ver todas tus actividades pasadas...</p>

                        {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error */}

                        <h2>Puntuación Máxima Lograda</h2>
                        {highestScore !== null ? (
                            <p>{highestScore}</p>
                        ) : (
                            <p>Parece que aún no terminas tu primera racha.</p>
                        )}

                        <h2>Los Deseos que Has Hecho Realidad</h2>
                        <ul>
                            {wishes.length > 0 ? (
                                wishes.map((wish) => (
                                    <li key={wish.id}>
                                        <strong>{wish.title}</strong><br />
                                        {wish.description}<br />
                                        <small>Última actualización: {formatDate(wish.updated_at)}</small>
                                    </li>
                                ))
                            ) : (
                                <p>No tienes deseos cumplidos.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
