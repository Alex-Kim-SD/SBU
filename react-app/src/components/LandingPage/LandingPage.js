// ./components/LandingPage/LandingPage.js
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="landing-page-container">
      <div className="landing-page-header-box">
        <h1 className="landing-page-title">Welcome to the SBU</h1>
        <p className="landing-page-subtitle">Engage in exciting bot conversations, stop being unreasonable</p>
        <div className="landing-page-buttons">
          <Link to="/login" className="landing-page-btn login-btn">Login</Link>
          <Link to="/signup" className="landing-page-btn signup-btn">Sign Up</Link>
        </div>
      </div>
      <div className="landing-page-about">
        <div className="developer">
          <h4 className="developer-h4">Developed by Alex Kim</h4>
          <a href="https://www.linkedin.com/in/alexgkim/">
            <img className="link-icons" src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"></img>
          </a>
          <a href="https://github.com/Alex-Kim-SD">
            <img className="link-icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
