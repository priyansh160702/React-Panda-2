import { cartStateActions } from "../../store/cart-state";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div>{props.children}</div>
    </div>
  );
};

const Backdrop = () => {
  const dispatch = useDispatch();

  const cartCloseHandler = () => {
    dispatch(cartStateActions.hide());
  };

  return (
    <div id="backdrop" className="backdrop" onClick={cartCloseHandler}></div>
  );
};

const port = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, port)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        port
      )}
    </Fragment>
  );
};

export default Modal;
