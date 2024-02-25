import { Fragment, useRef, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import Card from "../Utility/Card";
import { validateEmail, validatePassword } from "../Utility/Validator";
import "./Authentication.css";

const Authentication = () => {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  let isEmail;
  let isPassword;

  const isSignup = mode === "signup";

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    isEmail = validateEmail(enteredEmail);
    isPassword = validatePassword(enteredPassword);

    if (!isEmail) {
      setEmailIsValid(false);
    }

    if (!isPassword) {
      setPasswordIsValid(false);
    }

    if (isSignup) {
      if (enteredConfirmPassword !== enteredPassword) {
        setConfirmPasswordIsValid(false);
      }

      if (isEmail && isPassword && enteredConfirmPassword === enteredPassword) {
        return navigate("/auth?mode=login");
      }
    }

    if (isEmail && isPassword) {
      return navigate("/auth?mode=signup");
    }
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>{isSignup ? "Signup" : "Login"}</h3>
        <form onSubmit={formSubmitHandler} noValidate>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailInputRef} />
          {isSignup && !emailIsValid && (
            <p className="error-message">Enter a valid email.</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordInputRef}
          />
          {isSignup && !passwordIsValid && (
            <p className="error-message">
              Password should be at least 5 characters.
            </p>
          )}

          {isSignup && (
            <Fragment>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                ref={confirmPasswordInputRef}
              />
            </Fragment>
          )}
          {!confirmPasswordIsValid && (
            <p className="error-message">
              Not matching with the entered password.
            </p>
          )}
          <button type="submit">Submit</button>
          <p>
            {isSignup ? "Already signed up?" : "New Customer?"}{" "}
            <Link to={isSignup ? "/auth?mode=login" : "/auth?mode=signup"}>
              {isSignup ? "Login" : "Signup"}
            </Link>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default Authentication;
