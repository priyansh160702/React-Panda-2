const OrderItem = ({ id, meals, orderedAt, totalAmount }) => {
  const mealItem = meals.map((meal, index) => {
    return (
      <li key={index}>
        <h2>{`${meal.quantity} X ${meal.title}(${meal.price})`}</h2>
      </li>
    );
  });

  return (
    <li>
      <h2>{`=> Order-#${id}  (${orderedAt})`}</h2>
      <ul>{mealItem}</ul>
      <h2>{`Total - ${totalAmount}`}</h2>
    </li>
  );
};

export default OrderItem;
