import { useState, useEffect } from "react";

const useAuth = () => {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(token);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return { logoutHandler, isLoggedIn };
};

export default useAuth;
