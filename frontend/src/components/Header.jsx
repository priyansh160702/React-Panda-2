import { Fragment, useEffect } from "react";
import CartButton from "./Cart/CartButton";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import image from "../img/meals.jpg";

import "./Header.css";

const Header = () => {
  let isLoggedIn = false;

  const location = useLocation();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "React Panda";
    } else if (mode === "signup") {
      document.title = "Signup";
    } else if (mode === "login") {
      document.title = "Login";
    } else {
      document.title = "React Panda";
    }
  }, [location.pathname, mode]);

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
              to="/auth?mode=login"
              style={location.pathname !== "/" ? { display: "none" } : null}
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
