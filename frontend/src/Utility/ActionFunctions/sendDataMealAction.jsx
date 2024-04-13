const sendMealDataAction = async ({ request }) => {
  const token = localStorage.getItem("token");

  const method = request.method;

  const data = await request.formData();

  const mealData = {
    title: data.get("title"),
    description: data.get("description"),
    price: data.get("price"),
  };

  const mealId = data.get("mealId");
  console.log(method);

  const url = `http://localhost:8080/meals${
    method !== "POST" ? `/${mealId}` : "/"
  }`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (method === "POST" || method === "PATCH") {
    options.body = JSON.stringify(mealData);
  }

  const response = await fetch(url, options);

  return null;
};

export default sendMealDataAction;
