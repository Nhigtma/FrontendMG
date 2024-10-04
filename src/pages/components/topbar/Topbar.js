// src/components/Topbar.js
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './topbar.css';

const Topbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

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

  return (
    <div className="topbar">
      <div className="topbar-left">
      </div>
      <div className="topbar-right">
        <FontAwesomeIcon 
          icon={faBell} 
          className="notification-icon" 
          onClick={toggleNotifications} 
        />
        {isNotificationOpen && (
          <div className={`dropdown-menu notifications-menu`} ref={notificationRef}>
            <ul>
              <li>No tienes notificaciones.</li>
            </ul>
          </div>
        )}
        
        <FontAwesomeIcon
          icon={faUser}
          className="user-icon"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className={`dropdown-menu user-menu ${isMenuOpen ? 'open' : ''}`} ref={dropdownRef}>
            <ul>
              <li>Perfil</li>
              <li>Configuraciones</li>
              <li>Cerrar sesión</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
