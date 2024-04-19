import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CartButton from "./Cart/CartButton";
import useAuth from "../Utility/use-auth";
import image from "../img/meals.jpg";
import "./Header.css";

const Header = () => {
  const { logoutHandler, isLoggedIn, isAdmin } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Home";
        break;
      case "/about":
        document.title = "About";
        break;
      case "/auth/signup":
        document.title = "Signup";
        break;
      case "/auth/login":
        document.title = "Login";
        break;
      case "/admin":
        document.title = "Admin";
        break;
      case "/orders":
        document.title = "My Orders";
        break;
      default:
        document.title = "My App";
    }
  }, [location.pathname]);

  const isAdminPage = location.pathname === "/admin";
  const isOrdersPage = location.pathname === "/orders";

  const logoutBtnHandler = () => {
    logoutHandler();
    navigate("/");
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
          {isAdmin && (
            <Link
              to="admin"
              className="header-link"
              style={isAdminPage ? { display: "none" } : null}
            >
              Admin
            </Link>
          )}

          {isLoggedIn && !isOrdersPage && (
            <Link to="orders" className="header-link">
              Orders
            </Link>
          )}

          <div>
            {isLoggedIn && !isAdminPage && <CartButton />}
            {isLoggedIn && (
              <button
                type="button"
                className="header-link"
                onClick={logoutBtnHandler}
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
      {location.pathname !== "/admin" && location.pathname !== "/orders" && (
        <div className="img">
          <img src={image} />
        </div>
      )}
    </header>
  );
};

export default Header;
