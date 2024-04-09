import { redirect } from "react-router-dom";

import { validateEmail, validatePassword } from "../Validator";

const loginAction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);

  let errors = {};

  if (!emailIsValid) {
    errors.emailErrorMessage = "Enter a valid email.";
  }
  if (!passwordIsValid) {
    errors.passwordErrorMessage = "Password should be at least 5 characters.";
  }

  if (email.length === 0) {
    errors.emailErrorMessage = "This field cannot be empty";
  }

  if (password.length === 0) {
    errors.passwordErrorMessage = "This field cannot be empty";
  }

  if (
    !emailIsValid ||
    !passwordIsValid ||
    email.length === 0 ||
    password.length === 0
  ) {
    return errors;
  }

  const loginData = { email, password };

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const resData = await response.json();

  if (response.status === 404) {
    errors.emailErrorMessage = resData.message;
  }

  if (response.status === 400) {
    errors.passwordErrorMessage = resData.message;
  }

  const userId = `RP${resData.userId}`;
  const token = resData.token;

  if (!response.ok) {
    return errors;
  } else {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);

    return redirect("/");
  }
};

export default loginAction;
