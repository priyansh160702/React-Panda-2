import { useEffect, useRef } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MealItem from "../components/Meals/MealItem/MealItem";
import Card from "../Utility/Card";
import "./AdminPage.css";
import { Fragment } from "react";
import Modal from "../Utility/Modal/Modal";
import { modalStateActions } from "../store/cart-state";

const AdminPage = () => {
  const meals = useLoaderData();
  console.log(meals, "Here");

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

  const mealItems = meals.map((meal) => (
    <MealItem
      id={meal._id}
      key={meal._id}
      name={meal.title}
      desc={meal.description}
      price={meal.price}
      adminItem={true}
    />
  ));

  const addMealItemHandler = () => {
    dispatch(modalStateActions.show());
  };

  const formSubmitHandler = (e) => {
    dispatch(modalStateActions.hide());
  };

  return (
    <Fragment>
      {modalIsShown && (
        <Modal>
          <h2>Add Meal</h2>
          <Form method="post" className="form" onSubmit={formSubmitHandler}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" ref={nameInputRef} />
            <label htmlFor="desc">Description</label>
            <textarea type="text" cols={10} id="desc" name="description" />
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" />
            <button type="submit" className="btn">
              Add item
            </button>
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
