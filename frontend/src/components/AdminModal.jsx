import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, useActionData, useNavigation } from "react-router-dom";

import Modal from "../Utility/Modal/Modal";
import { modalStateActions } from "../store/cart-state";

const AdminModal = ({ adminModalIsShown, editMode, mealId, mealItem }) => {
  const [titleErrorMessage, setTitleErrorMessage] = useState(null);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();

  const errors = useActionData();

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();

  useEffect(() => {
    if (adminModalIsShown) {
      nameInputRef.current.focus();
    }
  }, [adminModalIsShown]);

  useEffect(() => {
    if (errors) {
      if (errors.titleErrorMessage) {
        setTitleErrorMessage(errors.titleErrorMessage);
      }
      if (errors.descriptionErrorMessage) {
        setDescriptionErrorMessage(errors.descriptionErrorMessage);
      }
      if (errors.priceErrorMessage) {
        setPriceErrorMessage(errors.priceErrorMessage);
      }
    }
  }, [errors]);

  // Cancel Button
  const cancelButtonHandler = (e) => {
    dispatch(modalStateActions.hide("adminModal"));
  };

  // onChange
  const titleErrorHandler = () => {
    setTitleErrorMessage(null);
  };
  const descriptionErrorHandler = () => {
    setDescriptionErrorMessage(null);
  };
  const priceErrorHandler = () => {
    setPriceErrorMessage(null);
  };

  // Submit Handler
  const formSubmitHandler = () => {
    const errorMessage = "This field cannot be empty";

    const titleInputValue = nameInputRef.current.value;
    const descriptionInputValue = descriptionInputRef.current.value;
    const priceInputValue = priceInputRef.current.value;

    if (titleInputValue.trim().length === 0) {
      setTitleErrorMessage(errorMessage);
    }
    if (descriptionInputValue.trim().length === 0) {
      setDescriptionErrorMessage(errorMessage);
    }
    if (priceInputValue.trim().length === 0) {
      setPriceErrorMessage(errorMessage);
    }

    const hasError =
      titleInputValue.trim().length === 0 ||
      descriptionInputValue.trim().length === 0 ||
      priceInputValue.trim().length === 0;

    if (hasError || errors) {
      return;
    } else {
      dispatch(modalStateActions.hide("adminModal"));
    }
  };

  return (
    <Modal className="admin-modal">
      <h2>{`${!editMode ? "Add" : "Edit"} Meal`}</h2>
      <Form
        method={`${!editMode ? "post" : "patch"}`}
        className="form"
        onSubmit={formSubmitHandler}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={editMode ? mealItem.title : ""}
          ref={nameInputRef}
          onChange={titleErrorHandler}
        />
        {titleErrorMessage && (
          <p className="error-message">{titleErrorMessage}</p>
        )}
        <label htmlFor="desc">Description</label>
        <textarea
          type="text"
          cols={10}
          id="desc"
          name="description"
          defaultValue={editMode ? mealItem.description : ""}
          onChange={descriptionErrorHandler}
          ref={descriptionInputRef}
        />
        {descriptionErrorMessage && (
          <p className="error-message" id="desc-error-message">
            {descriptionErrorMessage}
          </p>
        )}
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={editMode ? mealItem.price : ""}
          onChange={priceErrorHandler}
          ref={priceInputRef}
        />
        {priceErrorMessage && (
          <p className="error-message">{priceErrorMessage}</p>
        )}
        <input type="hidden" name="mealId" value={mealId} />

        <div className="btn-container">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {`${
              !editMode
                ? isSubmitting
                  ? "Adding..."
                  : "Add"
                : isSubmitting
                ? "Editing..."
                : "Edit"
            } Meal`}
          </button>
          <button type="button" className="btn" onClick={cancelButtonHandler}>
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AdminModal;
