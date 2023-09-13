import { useState, useEffect } from "react";
import { getFreezerFood } from "../../services/foodService";
import "./food.css";
import { FoodListItem } from "../food/FoodListItem";

export const FreezerList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFreezerFood().then((foodArray) => {
      setFoods(foodArray);
    });
  }, []);

  return (
    <div className="foods-container">
      <h2>Your Freezer:</h2>
      <div className="food-cards-small">
        {foods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
