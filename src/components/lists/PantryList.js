import { useState, useEffect } from "react";
import { getPantryFood } from "../../services/foodService";
import "./food.css";
import { FoodListItem } from "../food/FoodListItem";

export const PantryList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getPantryFood(currentUser).then((foodArray) => {
      setFoods(foodArray);
    });
  }, []);

  return (
    <div className="foods-container">
      <h2>Your Pantry:</h2>
      <div className="food-cards-small">
        {foods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
