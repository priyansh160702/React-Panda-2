import { Fragment } from "react";

import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart";
import { useSelector } from "react-redux";
import image from "../img/meals.jpg";

const HomePage = () => {
  const cartIsShown = useSelector((state) => state.cartState.cartIsShown);

  return (
    <Fragment>
      {cartIsShown && <Cart />}
      <Meals />
    </Fragment>
  );
};

export default HomePage;
