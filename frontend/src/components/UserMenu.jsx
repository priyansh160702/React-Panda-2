import Modal from "../Utility/Modal/Modal";
import useAuth from "../Utility/use-auth";

const UserMenu = () => {
  const { logoutHandler, userEmail, userName, isAdmin, isLoggedIn } = useAuth();

  const logoutBtnHandler = () => {
    window.location.reload();
    logoutHandler();
  };

  return (
    <Modal className="user-menu">
      <div className="user-menu-data">
        <div className="user-data  border-b">
          <h1>{userName}</h1>
          <h1>{userEmail}</h1>
        </div>
        <div className="py-1 border-b">
          <a href="orders" className="user-menu-link">
            My Orders
          </a>
        </div>
        {isAdmin && isLoggedIn && (
          <div className="py-1 border-b">
            <a href="admin" className="user-menu-link">
              Admin
            </a>
          </div>
        )}
        <div className="py-1">
          <button onClick={logoutBtnHandler} className="user-menu-link">
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserMenu;
