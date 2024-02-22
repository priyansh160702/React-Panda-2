import { useEffect, useState } from "react";
import Card from "../../Utility/Card";
import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setError] = useState();

  const loadedData = [];
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-panda-3e31b-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong :(");
      }

      const responseData = await response.json();

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className="loading-para">Loading...</p>
      </section>
    );
  }

  if (fetchError) {
    return <section className="error-msg">{fetchError}</section>;
  }

  const mealItems = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      desc={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Card className="container">
      <ul>{mealItems}</ul>
    </Card>
  );
};

export default AvailableMeals;
