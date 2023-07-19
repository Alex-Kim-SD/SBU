import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = () => {
    return (
        <div className="side-nav">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink exact to="/bots">Bots</NavLink>
                </li>
                <li>
                    <NavLink exact to="/settings">Conv. Settings</NavLink>
                </li>
                <li>
                    <NavLink exact to="/challenge">Challenge</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SideNavBar;
