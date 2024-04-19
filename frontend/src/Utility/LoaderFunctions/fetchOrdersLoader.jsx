import FormatTimestamp from "../FormatTimestamp";

const fetchOrdersLoader = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();

  const orderData = responseData.orderData;

  orderData.forEach((order) => {
    order.orderedAt = FormatTimestamp(order.orderedAt);
  });

  if (response.ok) {
    return orderData;
  } else {
    throw new Error("No orders found :(");
  }
};

export default fetchOrdersLoader;
