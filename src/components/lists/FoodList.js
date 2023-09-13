import { useState, useEffect } from "react";
import { getAllFood } from "../../services/foodService";
import "./food.css";
import { FoodListItem } from "../food/FoodListItem";

export const FoodList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAllFood().then((foodArray) => {
      setFoods(foodArray);
    });
  }, []);

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
