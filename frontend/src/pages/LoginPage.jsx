import { useRef, useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";

import Card from "../Utility/Card";
import useAuth from "../Utility/use-auth";

const LoginPage = () => {
  const { logoutHandler } = useAuth();

  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const emailInputRef = useRef();

  const formData = useActionData();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

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

  const submitHandler = () => {
    const remainingMilliseconds = 60 * 60 * 1000;

    setTimeout(() => {
      logoutHandler();
    }, remainingMilliseconds);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitHandler();
    }
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
            onKeyDown={keyDownHandler}
            style={passwordErrorMessage ? { border: "1px red solid" } : {}}
            required
          />
          {passwordErrorMessage && (
            <p className="error-message">{passwordErrorMessage}</p>
          )}
          <button type="submit" className="btn" onClick={submitHandler}>
            Submit
          </button>
          <p>
            New customer? <Link to="/auth/signup">Signup</Link>
          </p>
        </Form>
      </div>
    </Card>
  );
};

export default LoginPage;
