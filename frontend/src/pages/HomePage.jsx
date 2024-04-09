import { Fragment } from "react";

import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart";
import { useSelector } from "react-redux";

const HomePage = () => {
  const modalIsShown = useSelector((state) => state.modalState.modalIsShown);

  return (
    <Fragment>
      {modalIsShown && <Cart />}
      <Meals />
    </Fragment>
  );
};

export default HomePage;
