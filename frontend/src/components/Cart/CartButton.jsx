import { useEffect, useState } from "react";
import { modalStateActions } from "../../store/cart-state";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./CartButton.css";

const CartButton = () => {
  const dispatch = useDispatch();

  const quantity = useSelector((state) => state.cartAdd.totalQuantity);
  const items = useSelector((state) => state.cartAdd.items);

  const [btnIsUsed, setBtnIsUsed] = useState(false);

  const classes = `${btnIsUsed ? "bump" : ""} `;

  useEffect(() => {
    if (items === 0) {
      return;
    }

    setBtnIsUsed(true);

    const timer = setTimeout(() => {
      setBtnIsUsed(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const cartShownHandler = () => {
    dispatch(modalStateActions.show());
  };

  return (
    <button id="cart-container" className={classes} onClick={cartShownHandler}>
      <span className="container">
        <FontAwesomeIcon
          icon={faCartShopping}
          style={{ color: "#fafafa" }}
          size="lg"
        />
        <span className="cart-button-heading">Your Cart</span>
        <span className="cart-button-counter">{quantity}</span>
      </span>
    </button>
  );
};

export default CartButton;
