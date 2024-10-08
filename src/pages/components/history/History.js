import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';
import './history.css';


const History = () => {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
