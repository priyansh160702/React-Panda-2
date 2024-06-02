import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { modalStateActions, cartAddActions } from "../../store/cart-state";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cartAdd.items);
  const totalAmount = useSelector((state) => state.cartAdd.totalAmount);

  // const streetControlClasses = `${classes.control} ${
  //   formInputsValidity.street ? "" : classes.invalid
  // }`;
  // const postalCodeControlClasses = `${classes.control} ${
  //   formInputsValidity.postalCode ? "" : classes.invalid
  // }`;
  // const cityControlClasses = `${classes.control} ${
  //   formInputsValidity.city ? "" : classes.invalid
  // }`;

  const order = items.map((item) => ({
    mealId: item.id,
    quantity: item.quantity,
  }));

  const closeCartHandler = () => {
    dispatch(modalStateActions.hide("cart"));
  };

  const formSubmitHandler = () => {
    dispatch(modalStateActions.hide("cart"));
    dispatch(cartAddActions.clearCart());
  };

  return (
    <Form method="POST" className={classes.form} onSubmit={formSubmitHandler}>
      <h2>Address Details</h2>
      <div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" />
          {/* {!formInputsValidity.city && <p>Please enter a valid city!</p>} */}
        </div>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" />
        {/* {!formInputsValidity.street && <p>Please enter a valid street!</p>} */}
      </div>
      <div>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" name="postal" id="postal" />
        {/* {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )} */}
      </div>
      <input type="hidden" name="order" value={JSON.stringify(order)} />
      <input type="hidden" name="totalAmount" value={totalAmount} />
      <div className={classes.actions}>
        <button type="button" onClick={closeCartHandler}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </Form>
  );
};

export default Checkout;
