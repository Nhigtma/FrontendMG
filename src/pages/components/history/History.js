import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';
import './history.css'; // Puedes agregar estilos específicos si lo deseas


const History = () => {
    return (
        <div className="history-container">
            {/* Topbar en la parte superior */}
            <Topbar />

            <div className="history-content">
                {/* Sidebar en el lado izquierdo */}
                <Sidebar 
                    options={['Categoria', 'Calendario']}
                    categories={[]}
                />

                {/* Contenido principal de la página de Historial */}
                <div className="history-main">
                    <div className="history-inner">
                        <h1>Historial de Actividades</h1>
                        <p>Aquí puedes ver todas tus actividades pasadas...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
