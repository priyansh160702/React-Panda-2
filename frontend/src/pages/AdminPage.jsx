import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MealItem from "../components/Meals/MealItem/MealItem";
import Card from "../Utility/Card";
import "./AdminPage.css";
import { Fragment } from "react";

import { modalStateActions } from "../store/cart-state";
import AdminModal from "../components/AdminModal";

const AdminPage = () => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [mealId, setMealId] = useState("");

  const adminModalIsShown = useSelector(
    (state) => state.modalState.adminModalIsShown
  );

  const meals = useLoaderData();

  if (!meals) {
    throw new Error("Failed to fetch meals.");
  }

  const addMealItemHandler = () => {
    dispatch(modalStateActions.show("adminModal"));

    setEditMode(false);
  };

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

  return (
    <Fragment>
      {adminModalIsShown && (
        <AdminModal
          adminModalIsShown={adminModalIsShown}
          editMode={editMode}
          mealId={mealId}
          mealItem={mealItem}
        />
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
