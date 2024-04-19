const fetchMealsLoader = async () => {
  const response = await fetch("http://localhost:8080/meals");

  const responseData = await response.json();

  const meals = responseData.meals;

  if (response.ok) {
    return meals;
  } else {
    throw new Error();
  }
};

export default fetchMealsLoader;
