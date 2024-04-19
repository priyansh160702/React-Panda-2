import { useLoaderData } from "react-router-dom";

import OrderItem from "../components/OrderItem";
import "./OrdersPage.css";

const OrdersPage = () => {
  const orderData = useLoaderData();

  const orderItem = orderData.map((order, index) => {
    return (
      <OrderItem
        key={order.id}
        id={order.id}
        meals={order.meals}
        orderedAt={order.orderedAt}
      />
    );
  });

  return (
    <div className="orders">
      <h1>Order History</h1>
      <ul>{orderItem}</ul>
    </div>
  );
};

export default OrdersPage;
