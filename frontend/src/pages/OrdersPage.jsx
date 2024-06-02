import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import OrderItem from "../components/OrderItem";
import Cart from "../components/Cart/Cart";
import "./OrdersPage.css";

const OrdersPage = () => {
  const cartIsShown = useSelector((state) => state.modalState.cartIsShown);

  const orderData = useLoaderData();

  const orderItem = orderData.map((order, index) => {
    return (
      <OrderItem
        key={order.id}
        id={order.id}
        meals={order.meals}
        orderedAt={order.orderedAt}
        totalAmount={order.totalAmount}
      />
    );
  });

  return (
    <div className="orders">
      {cartIsShown && <Cart />}

      <h1>Order History</h1>

      {orderData.length > 0 ? <ul>{orderItem}</ul> : <h1>No Orders Yet!</h1>}
    </div>
  );
};

export default OrdersPage;
