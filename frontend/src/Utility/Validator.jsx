export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 5) {
    return false;
  }

  return true;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword !== password) {
    return false;
  }

  return true;
};
