import { useEffect } from "react";
import CartButton from "./Cart/CartButton";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../Utility/use-auth";
import image from "../img/meals.jpg";
import "./Header.css";

const Header = () => {
  const { logoutHandler, isLoggedIn } = useAuth();

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
      case "/admin":
        document.title = "Admin";
        break;
      default:
        document.title = "My App";
    }
  }, [location.pathname]);

  const isAdminPage = location.pathname === "/admin";

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
          <Link
            to="/admin"
            className="header-link"
            style={isAdminPage ? { display: "none" } : null}
          >
            Admin
          </Link>

          <div>
            {isLoggedIn && !isAdminPage && <CartButton />}
            {isLoggedIn && (
              <button
                type="button"
                className="header-link"
                onClick={logoutHandler}
              >
                Logout
              </button>
            )}
          </div>

          {!isLoggedIn && (
            <Link
              to="/auth/login"
              className="header-link"
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
      {location.pathname !== "/admin" && (
        <div className="img">
          <img src={image} />
        </div>
      )}
    </header>
  );
};

export default Header;
