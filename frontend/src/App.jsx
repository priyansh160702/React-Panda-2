import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import signUpAction from "./Utility/ActionFunctions/signupAction";
import LoginPage from "./pages/LoginPage";
import loginAction from "./Utility/ActionFunctions/loginAction";
import AdminPage from "./pages/AdminPage";
import fetchMealsLoader from "./Utility/LoaderFunctions/fetchMealsLoader";
import adminMealsLoader from "./Utility/LoaderFunctions/adminMealsLoader";
import sendMealDataAction from "./Utility/ActionFunctions/sendDataMealAction";
import OrdersPage from "./pages/OrdersPage";
import fetchOrdersLoader from "./Utility/LoaderFunctions/fetchOrdersLoader";
import UserMenu from "./components/UserMenu";
import useAuth from "./Utility/use-auth";

function App() {
  const { isLoggedIn } = useAuth();

  const cartIsShown = useSelector((state) => state.modalState.cartIsShown);
  const userMenuIsShown = useSelector(
    (state) => state.modalState.userMenuIsShown
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage />, loader: fetchMealsLoader },
        { path: "auth/signup", element: <SignupPage />, action: signUpAction },
        { path: "auth/login", element: <LoginPage />, action: loginAction },
        {
          path: "admin",
          element: <AdminPage />,
          loader: adminMealsLoader,
          action: sendMealDataAction,
        },
        {
          path: "orders",
          element: <OrdersPage />,
          loader: fetchOrdersLoader,
        },
      ],
    },
  ]);

  return (
    <Fragment>
      {cartIsShown && <Cart />}
      {userMenuIsShown && isLoggedIn && <UserMenu />}
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
