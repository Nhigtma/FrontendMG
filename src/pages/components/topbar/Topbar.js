import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

const Topbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

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
    localStorage.clear();
    navigate('/auth');
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
              <li onClick={handleLogout}>Cerrar sesión</li> 
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
