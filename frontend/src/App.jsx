import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import signUpAction from "./Utility/ActionFunctions/signupAction";
import LoginPage from "./pages/LoginPage";
import loginAction from "./Utility/ActionFunctions/loginAction";
import AdminPage from "./pages/AdminPage";
import fetchMealsLoader from "./Utility/fetchMealsLoader";
import addMealAction from "./Utility/ActionFunctions/addMealAction";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage />, loader: fetchMealsLoader },
        { path: "auth/signup", element: <SignupPage />, action: signUpAction },
        { path: "auth/login", element: <LoginPage />, action: loginAction },
        {
          path: "/admin",
          element: <AdminPage />,
          loader: fetchMealsLoader,
          action: addMealAction,
        },
      ],
    },
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
