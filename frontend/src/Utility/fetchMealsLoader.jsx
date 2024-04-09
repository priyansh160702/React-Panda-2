const fetchMealsLoader = async () => {
  const response = await fetch(
    "https://react-panda-3e31b-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
  );

  const responseData = await response.json();

  const meals = [];

  for (const key in responseData) {
    meals.push({
      id: key,
      name: responseData[key].name,
      description: responseData[key].description,
      price: responseData[key].price,
    });
  }

  if (response.ok) {
    return meals;
  } else {
    throw new Error();
  }
};

export default fetchMealsLoader;
