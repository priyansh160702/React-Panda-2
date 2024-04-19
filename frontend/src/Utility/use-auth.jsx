import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;

        if (expirationTime > Date.now()) {
          setIsAdmin(decodedToken.isAdmin);
          setIsLoggedIn(true);

          const timeUntilExpiration = expirationTime - Date.now();
          setTimeout(() => {
            logoutHandler();
            navigate("/auth/login");
            console.log("Session timed out");
          }, timeUntilExpiration);
        }
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
