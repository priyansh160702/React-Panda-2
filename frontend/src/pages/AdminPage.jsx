import { useEffect, useRef, useState } from "react";
import {
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MealItem from "../components/Meals/MealItem/MealItem";
import Card from "../Utility/Card";
import "./AdminPage.css";
import { Fragment } from "react";
import Modal from "../Utility/Modal/Modal";
import { modalStateActions } from "../store/cart-state";

const AdminPage = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editMode, setEditMode] = useState(false);
  const [mealId, setMealId] = useState("");

  const [titleErrorMessage, setTitleErrorMessage] = useState(null);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);

  const modalIsShown = useSelector((state) => state.modalState.modalIsShown);

  const errors = useActionData();

  const meals = useLoaderData();

  if (!meals) {
    throw new Error("Failed to fetch meals.");
  }

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();

  useEffect(() => {
    if (modalIsShown) {
      nameInputRef.current.focus();
    }
  }, [modalIsShown]);

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

  const addMealItemHandler = () => {
    dispatch(modalStateActions.show());

    setTitleErrorMessage(null);

    setDescriptionErrorMessage(null);

    setPriceErrorMessage(null);
    setEditMode(false);
  };

  const editHandler = (editData) => {
    setEditMode(true);
    setMealId(editData.id);

    setTitleErrorMessage(null);

    setDescriptionErrorMessage(null);

    setPriceErrorMessage(null);
  };

  const mealItem = meals.find((meal) => meal._id === mealId);

  const mealItems = meals.map((meal) => (
    <MealItem
      id={meal._id}
      key={meal._id}
      name={meal.title}
      desc={meal.description}
      price={meal.price}
      adminItem={true}
      onEdit={editHandler}
    />
  ));

  // Cancel Button
  const cancelButtonHandler = (e) => {
    dispatch(modalStateActions.hide());
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
      dispatch(modalStateActions.hide());
    }
  };

  return (
    <Fragment>
      {modalIsShown && (
        <Modal>
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
              <button
                type="button"
                className="btn"
                onClick={cancelButtonHandler}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Modal>
      )}
      <div className="container admin-meals-container">
        <button className="btn add-btn" onClick={addMealItemHandler}>
          Add
        </button>
        <Card className="admin-meals">
          <ul>{mealItems}</ul>
        </Card>
      </div>
    </Fragment>
  );
};

export default AdminPage;
