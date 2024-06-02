import { Fragment } from "react";
import { useSelector } from "react-redux";

import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart";

const HomePage = () => {
  const cartIsShown = useSelector((state) => state.modalState.cartIsShown);

  return (
    <Fragment>
      {cartIsShown && <Cart />}
      <Meals />
    </Fragment>
  );
};

export default HomePage;
