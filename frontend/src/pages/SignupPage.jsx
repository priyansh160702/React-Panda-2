import { useRef } from "react";

import Card from "../Utility/Card";
import "./LoginPage.css";

const SignupPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>Signup</h3>
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailInputRef} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordInputRef}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            ref={confirmPasswordInputRef}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Card>
  );
};

export default SignupPage;
