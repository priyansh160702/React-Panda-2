import { useEffect, useState, useRef } from "react";
import { Link, Form, redirect, useActionData } from "react-router-dom";

import Card from "../Utility/Card";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../Utility/Validator";
import "./Authentication.css";

const SignupPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState(null);

  const emailInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const formData = useActionData();

  useEffect(() => {
    if (formData) {
      if (formData.emailErrorMessage) {
        setEmailErrorMessage(formData.emailErrorMessage);
      }
      if (formData.passwordErrorMessage) {
        setPasswordErrorMessage(formData.passwordErrorMessage);
      }
      if (formData.confirmPasswordErrorMessage) {
        setConfirmPasswordErrorMessage(formData.confirmPasswordErrorMessage);
      }
    }
  }, [formData]);

  const emailChangeHandler = () => {
    setEmailErrorMessage(null);
  };
  const passwordChangeHandler = () => {
    setPasswordErrorMessage(null);
  };
  const confirmPasswordChangeHandler = () => {
    setConfirmPasswordErrorMessage(null);
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>Signup</h3>
        <Form method="POST" noValidate>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={emailChangeHandler}
            ref={emailInputRef}
            style={emailErrorMessage ? { border: "1px red solid" } : {}}
            required
          />
          {emailErrorMessage && (
            <p className="error-message">{emailErrorMessage}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={passwordChangeHandler}
            style={passwordErrorMessage ? { border: "1px red solid" } : {}}
            required
          />
          {passwordErrorMessage && (
            <p className="error-message">{passwordErrorMessage}</p>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={confirmPasswordChangeHandler}
            style={
              confirmPasswordErrorMessage ? { border: "1px red solid" } : {}
            }
            required
          />
          {confirmPasswordErrorMessage && (
            <p className="error-message">{confirmPasswordErrorMessage}</p>
          )}
          <button type="submit">Submit</button>
          <p>
            Already signed up? <Link to="/auth/login">Login</Link>
          </p>
        </Form>
      </div>
    </Card>
  );
};

export default SignupPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const confirmPasswordIsValid = validateConfirmPassword(
    confirmPassword,
    password
  );

  let errors = {};

  if (!emailIsValid) {
    errors.emailErrorMessage = "Enter a valid email.";
  }
  if (!passwordIsValid) {
    errors.passwordErrorMessage = "Password should be at least 5 characters.";
  }
  if (!confirmPasswordIsValid) {
    errors.confirmPasswordErrorMessage =
      "Not matching with the entered password.";
  }

  if (email.length === 0) {
    errors.emailErrorMessage = "This field cannot be empty";
  }

  if (
    !emailIsValid ||
    !passwordIsValid ||
    !confirmPasswordIsValid ||
    email.length === 0
  ) {
    return errors;
  }

  const signupData = {
    email,
    password,
    confirmPassword,
  };

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  const resData = await response.json();

  if (response.status === 409) {
    errors.emailErrorMessage = resData.message;
  }

  if (response.status === 422) {
    console.log(resData.message);
  }

  if (response.ok) {
    return redirect("/auth/login");
  } else {
    return errors;
  }
};
