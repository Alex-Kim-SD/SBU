import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="side-nav">
            <ul className="main-list">
                <li className="main-list-item">
                    <NavLink to="/Challenge">.challenge</NavLink>
                </li>
                <li className="main-list-item">
                    <NavLink exact to="/debates">.debate_logs</NavLink>
                </li>
                <li className='dropdown-trigger' onClick={toggleDropdown}>
                    <span className="main-list-item" >.config</span>
                    <ul className={`dropdown-list ${isOpen ? 'show' : ''}`}>
                        <li className="dropdown-item">
                            <NavLink exact to="/bots">Bots-Primary</NavLink>
                        </li>
                        <li className="dropdown-item">
                            <NavLink exact to="/settings">Conversations</NavLink>
                        </li>
                        <li className="dropdown-item">
                            <NavLink exact to="/other-bots">Bots-Opponent</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideNavBar;
