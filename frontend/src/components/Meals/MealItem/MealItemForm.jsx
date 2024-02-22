import { useRef, useState } from "react";
import { cartAddActions } from "../../../store/cart-state";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import "./MealItemForm.css";

const MealItemForm = (props) => {
  const quantityInputRef = useRef();

  const dispatch = useDispatch();

  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const addInputString = quantityInputRef.current.value;
    const addInputInt = +addInputString;

    if (addInputString.trim().length === 0 || addInputInt < 1) {
      setQuantityIsValid(false);
      return;
    }

    dispatch(cartAddActions.updateTotalQuantity(addInputInt));

    props.onAddToCart(addInputInt);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>
        <FontAwesomeIcon icon={faAdd} /> Add
      </button>
      {!quantityIsValid && <p>Enter valid quantity (greater than 0)</p>}
    </form>
  );
};

export default MealItemForm;
