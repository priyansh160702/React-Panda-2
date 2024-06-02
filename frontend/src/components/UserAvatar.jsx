import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";

import useAuth from "../Utility/use-auth";
import CartButton from "./Cart/CartButton";
import { modalStateActions } from "../store/cart-state";
import StringToColor from "../Utility/StringToColorFunction";
import "./UserAvatar.css";

const UserAvatar = ({ isAdminPage }) => {
  const dispatch = useDispatch();

  const { userName } = useAuth();

  let firstLetter;
  for (let i = 0; i < userName.length; i++) {
    firstLetter = userName[0];
  }

  // Outside click closes UserMenu
  const userMenuIsShown = useSelector(
    (state) => state.modalState.userMenuIsShown
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuIsShown &&
        !event.target.closest(".cart-avatar-container") &&
        !event.target.closest(".user-menu")
      ) {
        dispatch(modalStateActions.hide("userMenu"));
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, userMenuIsShown]);

  const avatarHandler = () => {
    if (userMenuIsShown) {
      dispatch(modalStateActions.hide("userMenu"));
    } else {
      dispatch(modalStateActions.show("userMenu"));
    }
  };

  return (
    <div className="cart-avatar-container">
      {!isAdminPage && <CartButton />}

      <Avatar
        onClick={avatarHandler}
        className="avatar"
        sx={
          userMenuIsShown
            ? {
                boxShadow: "0 0 5px 3px #2f2f2f",
                bgcolor: StringToColor(userName),
                "&:hover": {
                  cursor: "pointer",
                },
              }
            : {
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0 0 5px 3px #2f2f2f",
                },
                bgcolor: StringToColor(userName),
              }
        }
      >
        {firstLetter}
      </Avatar>
    </div>
  );
};

export default UserAvatar;
