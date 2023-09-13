import { useState, useEffect } from "react";
import { getAllFood } from "../../services/foodService";
import "./food.css";
import { FoodListItem } from "../food/FoodListItem";

export const FoodList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAllFood(currentUser).then((foodArray) => {
      setFoods(foodArray);
    });
  }, [currentUser]);

  return (
    <div className="foods-container">
      <h2>All Foods:</h2>
      <div className="food-cards-small">
        {foods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
