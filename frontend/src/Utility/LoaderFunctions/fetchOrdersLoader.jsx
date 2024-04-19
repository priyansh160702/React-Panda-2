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

  console.log(orderData);

  if (response.ok) {
    return orderData;
  } else {
    return null;
  }
};

export default fetchOrdersLoader;
