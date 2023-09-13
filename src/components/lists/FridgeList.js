import { useState, useEffect } from "react";
import { getFridgeFood } from "../../services/foodService";
import "./food.css";
import { FoodListItem } from "../food/FoodListItem";

export const FridgeList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFridgeFood().then((foodArray) => {
      setFoods(foodArray);
    });
  }, []);

  return (
    <div className="foods-container">
      <h2>Your Fridge:</h2>
      <div className="food-cards-small">
        {foods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
