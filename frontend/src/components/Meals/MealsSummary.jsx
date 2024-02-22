import Card from "../../Utility/Card";

import "./MealsSummary.css";

const MealsSummary = () => {
  return (
    <section>
      <Card className="container">
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <br />
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </Card>
    </section>
  );
};

export default MealsSummary;
