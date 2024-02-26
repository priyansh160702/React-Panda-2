import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";

import Card from "../Utility/Card";
import "./Authentication.css";

const Authentication = () => {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const isEmail = validateEmail(enteredEmail);
    const isPassword = validatePassword(enteredPassword);

    if (!isEmail) {
      setEmailIsValid(false);
    }

    if (!isPassword) {
      setPasswordIsValid(false);
    }

    if (enteredConfirmPassword !== enteredPassword) {
      setConfirmPasswordIsValid(false);
    }

    if (isEmail && isPassword && enteredConfirmPassword === enteredPassword)
      return navigate("/auth?mode=login");
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>Signup</h3>
        <form onSubmit={formSubmitHandler} noValidate>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailInputRef} />
          {!emailIsValid && (
            <p className="error-message">Enter a valid email.</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordInputRef}
          />
          {!passwordIsValid && (
            <p className="error-message">
              Password should be longer than 5 characters.
            </p>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            ref={confirmPasswordInputRef}
          />
          {!confirmPasswordIsValid && (
            <p className="error-message">
              Not matching with the entered password.
            </p>
          )}
          <button type="submit">Submit</button>
          <p>
            Already signed up? <Link to="/auth?mode=login">Login</Link>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default Authentication;

export const action = async () => {};
