import { Link, useNavigate } from "react-router-dom";

import useAuth from "../Utility/use-auth";
import image from "../img/meals.jpg";
import "./Header.css";
import UserAvatar from "./UserAvatar";
import TitleSetter from "../Utility/TitleSetter";

const Header = () => {
  TitleSetter();

  const { isLoggedIn, isAdmin } = useAuth();

  const navigate = useNavigate();

  const isAdminPage = location.pathname === "/admin";
  const isOrdersPage = location.pathname === "/orders";

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
          {/* {isAdmin && (
            <Link
              to="admin"
              className="header-link"
              style={isAdminPage ? { display: "none" } : null}
            >
              Admin
            </Link>
          )} */}

          {isLoggedIn && <UserAvatar isAdminPage={isAdminPage} />}

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
      {!isAdminPage && !isOrdersPage && (
        <div className="img">
          <img src={image} />
        </div>
      )}
    </header>
  );
};

export default Header;
