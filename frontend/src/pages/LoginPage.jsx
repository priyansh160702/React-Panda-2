import { useRef, useEffect, useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";

import Card from "../Utility/Card";
import "./Authentication.css";
import { validateEmail, validatePassword } from "../Utility/Validator";

const LoginPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

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
    }
  }, [formData]);

  const emailChangeHandler = () => {
    setEmailErrorMessage(null);
  };
  const passwordChangeHandler = () => {
    setPasswordErrorMessage(null);
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>Login</h3>
        <Form method="POST" noValidate>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailInputRef}
            onChange={emailChangeHandler}
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
          <button type="submit">Submit</button>
          <p>
            New customer? <Link to="/auth/signup">Signup</Link>
          </p>
        </Form>
      </div>
    </Card>
  );
};

export default LoginPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);

  let errors = {};

  if (!emailIsValid) {
    errors.emailErrorMessage = "Enter a valid email.";
  }
  if (!passwordIsValid) {
    errors.passwordErrorMessage = "Password should be at least 5 characters.";
  }

  if (email.length === 0) {
    errors.emailErrorMessage = "This field cannot be empty";
  }

  if (password.length === 0) {
    errors.passwordErrorMessage = "This field cannot be empty";
  }

  if (
    !emailIsValid ||
    !passwordIsValid ||
    email.length === 0 ||
    password.length === 0
  ) {
    return errors;
  }

  const loginData = { email, password };

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (response.status === 404) {
    errors.emailErrorMessage = resData.message;
  }

  if (response.status === 400) {
    errors.passwordErrorMessage = resData.message;
  }

  const resData = await response.json();

  const userId = `RP${resData.userId}`;
  const token = resData.token;

  if (!response.ok) {
    return errors;
  } else {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    return redirect("/");
  }
};
