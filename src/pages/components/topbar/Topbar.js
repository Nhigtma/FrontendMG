import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import './topbar.css';

const Topbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate(); // Inicializar useNavigate

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.classList.contains('user-icon')) {
      setMenuOpen(false);
    }
    if (notificationRef.current && !notificationRef.current.contains(event.target) && !event.target.classList.contains('notification-icon')) {
      setNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpiar localStorage
    navigate('/auth'); // Redirigir a la vista de autenticación
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
      </div>
      <div className="topbar-right">
        <FontAwesomeIcon
          icon={faUser}
          className="user-icon"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className={`dropdown-menu user-menu ${isMenuOpen ? 'open' : ''}`} ref={dropdownRef}>
            <ul>
              <li onClick={handleLogout}>Cerrar sesión</li> {/* Asignar la función handleLogout */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
