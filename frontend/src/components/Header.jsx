import { Fragment } from "react";
import CartButton from "./Cart/CartButton";
import image from "../img/meals.jpg";

import "./Header.css";

const Header = () => {
  let isLoggedIn = false;

  return (
    <Fragment>
      <nav id="nav-container">
        <div className="container">
          <h1>React Panda</h1>
          {!isLoggedIn && <CartButton />}
        </div>
      </nav>
      <div className="img">
        <img src={image} />
      </div>
    </Fragment>
  );
};

export default Header;
