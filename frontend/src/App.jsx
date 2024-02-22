import { Fragment } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux";

function App() {
  const cartIsShown = useSelector((state) => state.cartState.cartIsShown);

  return (
    <Fragment>
      {cartIsShown && <Cart />}
      <Header />
      <Meals />
    </Fragment>
  );
}

export default App;
