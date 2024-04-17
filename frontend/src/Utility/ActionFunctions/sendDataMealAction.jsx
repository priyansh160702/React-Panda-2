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

  const errors = {};
  if (method === "POST" || method === "PATCH") {
    if (
      mealData.title.trim().length === 0 ||
      mealData.description.trim().length === 0 ||
      mealData.price.trim().length === 0
    ) {
      return null;
    }
  }

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

  const resData = await response.json();

  if (method === "POST" || method === "PATCH") {
    // if (response.status === 403) {
    //   errors.titleErrorMessage = resData.message;
    // }

    if (response.status === 422) {
      resData.errors.errors.forEach((item) => {
        if (item.path === "title") {
          errors.titleErrorMessage = item.msg;
        }
        if (item.path === "description") {
          errors.descriptionErrorMessage = item.msg;
        }
        if (item.path === "price") {
          errors.priceErrorMessage = item.msg;
        }
      });
    }

    if (!response.ok) {
      return errors;
    }
  }
  return null;
};

export default sendMealDataAction;
