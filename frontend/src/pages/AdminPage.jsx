import { useEffect, useRef, useState } from "react";
import { useLoaderData, Form, useActionData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MealItem from "../components/Meals/MealItem/MealItem";
import Card from "../Utility/Card";
import "./AdminPage.css";
import { Fragment } from "react";
import Modal from "../Utility/Modal/Modal";
import { modalStateActions } from "../store/cart-state";

const AdminPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [mealId, setMealId] = useState("");

  const [titleErrorMessage, setTitleErrorMessage] = useState(null);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null);
  const [priceErrorMessage, setPriceErrorMessage] = useState(null);

  const modalIsShown = useSelector((state) => state.modalState.modalIsShown);
  const isAdmin = useSelector((state) => state.adminState.isAdmin);

  const meals = useLoaderData();

  const formData = useActionData();
  console.log(formData);

  const dispatch = useDispatch();

  const nameInputRef = useRef();

  useEffect(() => {
    if (formData) {
      if (formData.titleErrorMessage) {
        setTitleErrorMessage(formData.titleErrorMessage);
      }
      if (formData.descriptionErrorMessage) {
        setDescriptionErrorMessage(formData.descriptionErrorMessage);
      }
      if (formData.priceErrorMessage) {
        setPriceErrorMessage(formData.priceErrorMessage);
      }
    }
  }, [formData]);

  useEffect(() => {
    if (modalIsShown) {
      nameInputRef.current.focus();
    }
  }, [modalIsShown]);

  if (!meals) {
    throw new Error("Failed to fetch meals.");
  }

  const editHandler = (editData) => {
    setEditMode(true);
    setMealId(editData.id);
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

  const addMealItemHandler = () => {
    dispatch(modalStateActions.show());
    setEditMode(false);
  };

  const formSubmitHandler = () => {
    if (formData) {
      dispatch(modalStateActions.hide());
    }

    setTitleErrorMessage(null);

    setDescriptionErrorMessage(null);

    setPriceErrorMessage(null);
  };

  const hideModalHandler = (e) => {
    dispatch(modalStateActions.hide());
  };

  const titleErrorHandler = () => {
    setTitleErrorMessage(null);
  };
  const descriptionErrorHandler = () => {
    setDescriptionErrorMessage(null);
  };
  const priceErrorHandler = () => {
    setPriceErrorMessage(null);
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
            />
            {priceErrorMessage && (
              <p className="error-message">{priceErrorMessage}</p>
            )}
            <input type="hidden" name="mealId" value={mealId} />
            <input type="hidden" name="isAdmin" value={isAdmin} />
            <div className="btn-container">
              <button type="submit" className="btn">
                {`${!editMode ? "Add" : "Edit"} Meal`}
              </button>
              <button type="button" className="btn" onClick={hideModalHandler}>
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
