const fetchMealsLoader = async () => {
  // const response = await fetch(
  //   "https://react-panda-3e31b-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
  // );

  // const resData = await response1.json();

  const response = await fetch("http://localhost:8080/meals");

  const responseData = await response.json();

  const meals = responseData.meals;

  console.log(responseData);

  if (response.ok) {
    return meals;
  } else {
    throw new Error();
  }
};

export default fetchMealsLoader;
