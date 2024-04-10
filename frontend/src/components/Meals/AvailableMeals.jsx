import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";

import Card from "../../Utility/Card";
import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);

  const meals = useLoaderData();

  useEffect(() => {
    if (meals) {
      setIsLoading(false);
    } else {
      throw new Error("Something Went wrong!");
    }
  });

  if (isLoading) {
    return (
      <section>
        <p className="loading-para">Loading...</p>
      </section>
    );
  }

  const mealItems = meals.map((meal) => (
    <MealItem
      id={meal._id}
      key={meal._id}
      name={meal.title}
      desc={meal.description}
      price={meal.price}
      adminItem={false}
    />
  ));

  return (
    <Card className="container">
      <ul>{mealItems}</ul>
    </Card>
  );
};

export default AvailableMeals;
