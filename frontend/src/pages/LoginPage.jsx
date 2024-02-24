import { useRef } from "react";
import { Link } from "react-router-dom";

import Card from "../Utility/Card";
import "./LoginPage.css";

const LoginPage = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="form-container">
      <div className="form">
        <h3>Login</h3>
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
          <button type="submit">Submit</button>
          <p>
            New customer? <Link to="/auth/signup">Signup</Link>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default LoginPage;
