import { Fragment } from "react";

import AvailableMeals from "./AvailableMeals";
import Description from "./Description";

const Meals = () => {
  return (
    <Fragment>
      <Description page="home" />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
