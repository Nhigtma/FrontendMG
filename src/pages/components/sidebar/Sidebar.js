import React, { useState } from 'react';
import { FaCalendarAlt, FaCog, FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ options = [], categories = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handleOptionClick = (index) => {
        setActiveIndex(index);
        if (index === 0) {
            navigate('/createCategory');
        } else if (index === 1) {
            navigate('/home');
        } else {
            const category = categories[index - options.length];
            navigate(`/category/${category.name}`); // Navegar a la vista con el nombre de la categoría
        }
    };

    const icons = [<FaHome />, <FaCalendarAlt />, <FaCog />, <FaUser />];

    return (
        <div className="sidebar">
            <div className="sidebar-header">Mi App</div>
            <ul className="sidebar-menu">
                {options.length > 0 && options.map((option, index) => (
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

                {categories.length > 0 && categories.map((category, index) => (
                    <li
                        key={index + options.length}
                        className={activeIndex === index + options.length ? 'active' : ''}
                        onClick={() => handleOptionClick(index + options.length)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            <div className="sidebar-divider"></div>
        </div>
    );
};

export default Sidebar;
