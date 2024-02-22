import { cartAddActions } from "../../../store/cart-state";
import { useDispatch } from "react-redux";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (quantity) => {
    dispatch(
      cartAddActions.updateItems({
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
      })
    );

    dispatch(
      cartAddActions.updateTotalAmount({
        price: props.price,
        quantity: quantity,
      })
    );
  };

  return (
    <div id="item-container">
      <li>
        <span>
          <h3>{props.name}</h3>
        </span>
        <span>
          <p>{props.desc}</p>
        </span>
        <span className="price">₹{props.price.toFixed(2)}</span>
      </li>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
};

export default MealItem;
