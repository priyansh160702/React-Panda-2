import { Fragment, useState } from "react";
import { cartAddActions, modalStateActions } from "../../store/cart-state";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Utility/Modal/Modal";
import CartItem from "./CartItem";
import "./Cart.css";
import Checkout from "./Checkout";

const Cart = () => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDoneSubmitting, setIsDoneSubmitting] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.cartAdd.items);
  const totalAmount = useSelector((state) => state.cartAdd.totalAmount);

  const cartHasItems = items.length > 0;

  const closeCartHandler = () => {
    dispatch(modalStateActions.hide());
  };

  const itemRemoveHandler = (id) => {
    dispatch(cartAddActions.removeItem(id));
  };

  const itemAddHandler = (item) => {
    dispatch(cartAddActions.updateItems({ ...item, quantity: 1 }));
  };

  const cartItem = items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      onRemove={itemRemoveHandler.bind(null, item.id)}
      onAdd={itemAddHandler.bind(null, item)}
    />
  ));

  const orderButtonHandler = () => {
    setIsOrdering(true);
  };

  const submitDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-panda-3e31b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsDoneSubmitting(true);
  };

  const submittingModal = <p>Submitting...</p>;
  const doneSubmittingModal = (
    <Fragment>
      <p>Order confirmed!!</p>
      <div id="button">
        <button onClick={closeCartHandler}>Close</button>
      </div>
    </Fragment>
  );
  const cartModalContent = (
    <Fragment>
      <ul className="items">{cartItem}</ul>
      <div id="amount">
        <span className="amount-heading">Total Amount</span>
        <span className="total-amount">{totalAmount.toFixed(2)}</span>
      </div>
      {isOrdering && <Checkout onConfirm={submitDataHandler} />}
      {!isOrdering && (
        <div id="button">
          <div>
            <button onClick={closeCartHandler}>Close</button>
          </div>
          <div>
            {cartHasItems && (
              <button className="order-button" onClick={orderButtonHandler}>
                Order
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );

  return (
    <Modal>
      {!isSubmitting && !isDoneSubmitting && cartModalContent}
      {isSubmitting && submittingModal}
      {isDoneSubmitting && doneSubmittingModal}
    </Modal>
  );
};

export default Cart;
