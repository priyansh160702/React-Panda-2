import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    const fetchToken = () => {
      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAdmin(decodedToken.isAdmin);
        }
      } else {
        setIsAdmin(false);
      }
    };

    fetchToken();
  }, [token]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAdmin(false);
    setIsLoggedIn(false);
  };

  return { logoutHandler, isLoggedIn, isAdmin };
};

export default useAuth;
