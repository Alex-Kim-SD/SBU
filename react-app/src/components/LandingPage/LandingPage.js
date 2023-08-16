// ./components/LandingPage/LandingPage.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import { Redirect, Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  if (sessionUser) return <Redirect to="/home" />;

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-header-box">
        <h1 className="landing-page-title">Welcome to SBU</h1>
        <p className="landing-page-subtitle">Generate AI Conversations, Stop Being Unreasonable</p>
        <div className="landing-page-buttons">
          <button className="landing-page-btn demo-login-btn" onClick={handleDemoLogin}>Demo-Login </button>
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
