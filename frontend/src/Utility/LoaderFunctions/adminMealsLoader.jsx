import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const adminMealsLoader = async ({ request }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth/login");
  }

  const decodedToken = jwtDecode(token);
  let isAdmin = false;

  if (decodedToken.exp * 1000 > Date.now()) {
    isAdmin = decodedToken.isAdmin;
  }

  console.log(isAdmin);

  if (!isAdmin) {
    return redirect("/auth/login");
  }

  const response = await fetch("http://localhost:8080/meals");

  const responseData = await response.json();

  const meals = responseData.meals;

  if (response.ok) {
    return meals;
  } else {
    throw new Error();
  }
};

export default adminMealsLoader;
