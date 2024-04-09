import Card from "../../Utility/Card";
import "./Description.css";

const Description = ({ page }) => {
  return (
    <section>
      <Card className="container">
        {page === "home" && (
          <div id="home-page">
            <h2>Delicious Food, Delivered To You</h2>
            <p>
              Choose your favorite meal from our broad selection of available
              meals and enjoy a delicious lunch or dinner at home.
            </p>
            <br />
            <p>
              All our meals are cooked with high-quality ingredients,
              just-in-time and of course by experienced chefs!
            </p>
          </div>
        )}
        {page === "admin" && (
          <div id="admin-page">
            <h2>Admin</h2>
          </div>
        )}
      </Card>
    </section>
  );
};

export default Description;
