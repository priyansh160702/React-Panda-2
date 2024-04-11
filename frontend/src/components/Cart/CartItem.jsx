import "./CartItem.css";

const CartItem = (props) => {
  const price = `₹${props.price}`;

  return (
    <li className="cart-item">
      <div>
        <h2>{props.name}</h2>
        <div className="summary">
          <span className="price">{price}</span>
          <span className="amount">x {props.quantity}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
