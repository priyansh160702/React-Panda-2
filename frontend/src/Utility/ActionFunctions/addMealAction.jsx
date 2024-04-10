const addMealAction = async ({ request }) => {
  const data = await request.formData();

  const mealData = {
    title: data.get("title"),
    description: data.get("description"),
    price: data.get("price"),
  };

  const response = await fetch("http://localhost:8080/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealData),
  });

  const responseData = await response.json();

  console.log(responseData);

  return null;
};

export default addMealAction;
