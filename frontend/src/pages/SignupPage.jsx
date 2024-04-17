import { useEffect, useState, useRef } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";

import Card from "../Utility/Card";

const SignupPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState(null);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitHandler();
    }
  };

  return (
    <Card className="form-container meals-container">
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
            onKeyDown={keyDownHandler}
            style={
              confirmPasswordErrorMessage ? { border: "1px red solid" } : {}
            }
            required
          />
          {confirmPasswordErrorMessage && (
            <p className="error-message">{confirmPasswordErrorMessage}</p>
          )}
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p>
            Already signed up? <Link to="/auth/login">Login</Link>
          </p>
        </Form>
      </div>
    </Card>
  );
};

export default SignupPage;
