import React, { useState } from 'react';
import { FaCalendarAlt, FaCog, FaHome, FaUser } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = ({ options }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleOptionClick = (index) => {
        setActiveIndex(index);
    };

    const icons = [<FaHome />, <FaCalendarAlt />, <FaCog />, <FaUser />];

    return (
        <div className="sidebar">
            <div className="sidebar-header">Mi App</div>
            <ul className="sidebar-menu">
                {options.map((option, index) => (
                    <React.Fragment key={index}>
                        <li
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleOptionClick(index)}
                        >
                            <span className="icon">{icons[index]}</span>
                            {option}
                        </li>
                        {index === 1 && <div className="sidebar-divider"></div>}
                    </React.Fragment>
                ))}
            </ul>

            <div className="sidebar-divider"></div>
        </div>
    );
};

export default Sidebar;
