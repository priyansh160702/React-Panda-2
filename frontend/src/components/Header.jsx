import { Fragment, useEffect, useState } from "react";
import CartButton from "./Cart/CartButton";
import { Link, redirect, useLocation } from "react-router-dom";
import image from "../img/meals.jpg";

import "./Header.css";

const Header = () => {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(token);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

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
            <div>
              <CartButton />
              <button type="button" className="btn" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <Link
              to="/auth/login"
              className="btn"
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
