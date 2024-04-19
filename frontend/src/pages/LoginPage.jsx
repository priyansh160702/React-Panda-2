import { useRef, useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

import Card from "../Utility/Card";

const LoginPage = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const emailInputRef = useRef();

  const formData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();

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
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
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
