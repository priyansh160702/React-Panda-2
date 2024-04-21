import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleSetter = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "React Panda";
        break;
      case "/about":
        document.title = "About";
        break;
      case "/auth/signup":
        document.title = "Signup";
        break;
      case "/auth/login":
        document.title = "Login";
        break;
      case "/admin":
        document.title = "Admin";
        break;
      case "/orders":
        document.title = "My Orders";
        break;
      default:
        document.title = "My App";
    }
  }, [location.pathname]);
};

export default TitleSetter;
