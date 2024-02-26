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
        document.title = "Home";
        break;
      case "/about":
        document.title = "About";
        break;
      case "/login":
        document.title = "Login";
        break;
      default:
        document.title = "My App";
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
                location.pathname === "/auth/login" ||
                location.pathname === "/auth/signup"
                  ? { display: "none" }
                  : null
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
