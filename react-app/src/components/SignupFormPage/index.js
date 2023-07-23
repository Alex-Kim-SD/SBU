import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = [];

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (username.length < 6) {
      validationErrors.push("Username must be at least 6 characters long.");
    }

    if (password.length < 8) {
      validationErrors.push("Password must be at least 8 characters long.");
    }

    if (password !== confirmPassword) {
      validationErrors.push("Confirm Password field must be the same as the Password field");
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="form-label">
          Email
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Username
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Password
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Confirm Password
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
      <p className="login-link-text">Have an account? <Link to="/login">Log in here</Link></p>
    </div>
  );
}

export default SignupFormPage;
