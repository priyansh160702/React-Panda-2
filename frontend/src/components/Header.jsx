import { Fragment, useEffect } from "react";
import CartButton from "./Cart/CartButton";
import { Link, useLocation } from "react-router-dom";
import image from "../img/meals.jpg";

import "./Header.css";

const Header = () => {
  let isLoggedIn = false;

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "React Panda";
        break;
      case "/auth/login":
        document.title = "Login";
        break;
      case "/auth/signup":
        document.title = "Signup";
        break;
    }
  }, [location.pathname]);

  return (
    <header>
      <nav id="nav-container">
        <div className="container">
          <Link
            id="heading"
            to="/"
            className={location.pathname !== "/" ? "heading-centered" : ""}
          >
            React Panda
          </Link>
          {isLoggedIn && (
            <Fragment>
              <CartButton />
              <button type="button">Logout</button>
            </Fragment>
          )}
          {!isLoggedIn && (
            <Link
              to="/auth/login"
              style={
                location.pathname === "/auth/login" ? { display: "none" } : null
              }
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="img">
        <img src={image} />
      </div>
    </header>
  );
};

export default Header;
