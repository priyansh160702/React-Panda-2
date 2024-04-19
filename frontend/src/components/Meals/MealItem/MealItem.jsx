import { useSubmit } from "react-router-dom";
import { cartAddActions, modalStateActions } from "../../../store/cart-state";
import { useDispatch } from "react-redux";

import "./MealItem.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const submit = useSubmit();

  const addToCartHandler = (quantity) => {
    dispatch(
      cartAddActions.updateItems({
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
      })
    );

    // dispatch(
    //   cartAddActions.updateTotalAmount({
    //     price: props.price,
    //     quantity: quantity,
    //   })
    // );
  };

  const editMealHandler = () => {
    dispatch(modalStateActions.show());

    props.onEdit({
      id: props.id,
    });
  };

  const deleteMealHandler = () => {
    const proceed = window.confirm(`Sure you want to delete ${props.name}?`);
    if (proceed) {
      submit({ mealId: props.id }, { method: "DELETE", action: "/admin" });
    }
  };

  return (
    <div id={`${!props.adminItem ? "item-container" : "admin-item"}`}>
      <li>
        <span>
          <h3>{props.name}</h3>
        </span>
        <span>
          <p>{props.desc}</p>
        </span>
        <span className="price">₹{props.price}</span>
      </li>
      {!props.adminItem && (
        <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      )}
      {props.adminItem && (
        <div className="admin">
          <button className="btn" onClick={editMealHandler}>
            Edit
          </button>
          <button className="btn" onClick={deleteMealHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MealItem;
