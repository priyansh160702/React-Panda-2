import { useLoaderData } from "react-router-dom";

import OrderItem from "../components/OrderItem";
import "./OrdersPage.css";

const OrdersPage = () => {
  const orderData = useLoaderData();
  console.log(orderData);

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
      <h1>Order History</h1>

      {orderData.length > 0 ? <ul>{orderItem}</ul> : <h1>No Orders Yet!</h1>}
    </div>
  );
};

export default OrdersPage;
