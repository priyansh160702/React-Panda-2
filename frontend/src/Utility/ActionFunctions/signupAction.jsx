import { redirect } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../Validator";

const signUpAction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const confirmPasswordIsValid = validateConfirmPassword(
    confirmPassword,
    password
  );

  let errors = {};

  if (!emailIsValid) {
    errors.emailErrorMessage = "Enter a valid email.";
  }
  if (!passwordIsValid) {
    errors.passwordErrorMessage = "Password should be at least 5 characters.";
  }
  if (!confirmPasswordIsValid) {
    errors.confirmPasswordErrorMessage =
      "Not matching with the entered password.";
  }

  if (email.length === 0) {
    errors.emailErrorMessage = "This field cannot be empty!";
  }
  if (password.length === 0) {
    errors.passwordErrorMessage = "This field cannot be empty!";
  }

  if (
    !emailIsValid ||
    !passwordIsValid ||
    !confirmPasswordIsValid ||
    email.length === 0 ||
    password.length === 0
  ) {
    return errors;
  }

  const signupData = {
    email,
    password,
    confirmPassword,
  };

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  const resData = await response.json();

  if (response.status === 409) {
    errors.emailErrorMessage = resData.message;
  }

  if (response.status === 422) {
    console.log(resData.message);
  }

  if (response.ok) {
    return redirect("/auth/login");
  } else {
    return errors;
  }
};

export default signUpAction;
