const sendMealDataAction = async ({ request }) => {
  const method = request.method;

  const data = await request.formData();

  const mealData = {
    title: data.get("title"),
    description: data.get("description"),
    price: data.get("price"),
  };

  const mealId = data.get("mealId");
  console.log(method);

  let response;

  if (method === "POST" || method === "PATCH") {
    response = await fetch(
      `http://localhost:8080/meals${method === "PATCH" ? `/${mealId}` : "/"}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      }
    );
  } else {
    response = await fetch(`http://localhost:8080/meals/${mealId}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return null;
};

export default sendMealDataAction;
