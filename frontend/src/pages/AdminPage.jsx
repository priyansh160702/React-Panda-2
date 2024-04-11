import { useEffect, useRef, useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
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

  const meals = useLoaderData();

  const modalIsShown = useSelector((state) => state.modalState.modalIsShown);

  const dispatch = useDispatch();

  const nameInputRef = useRef();

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

  const mealItem = {};
  for (let key in meals) {
    if (meals[key]._id === mealId) {
      mealItem.title = meals[key].title;
      mealItem.description = meals[key].description;
      mealItem.price = meals[key].price;
    }
  }

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

  const formSubmitHandler = (e) => {
    dispatch(modalStateActions.hide());
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
            />
            <label htmlFor="desc">Description</label>
            <textarea
              type="text"
              cols={10}
              id="desc"
              name="description"
              defaultValue={editMode ? mealItem.description : ""}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={editMode ? mealItem.price : ""}
            />
            <input type="hidden" name="mealId" value={mealId} />
            <div className="btn-container">
              <button type="submit" className="btn">
                {`${!editMode ? "Add" : "Edit"} Meal`}
              </button>
              <button type="button" className="btn" onClick={formSubmitHandler}>
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
