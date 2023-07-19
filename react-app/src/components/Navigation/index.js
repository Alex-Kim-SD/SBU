import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/SBU_logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="navigation-bar">
      <div>
        <NavLink exact to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      {isLoaded && sessionUser && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
