import { useState, useEffect } from "react";
import { getAllFood } from "../services/foodService";
import "./food.css";

export const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAllFood().then((foodArray) => {
      setFoods(foodArray);
    });
  }, []);

  return (
    <div className="foods-container">
      <h2>Foods:</h2>
      <div className="food-cards-small">
        {foods.map((food) => {
          return (
            <div className="food-card">
              <div className="food-image">{food.image.name}</div>
              <div className="food-details-small-a">
                <h3>{food.name}</h3>
                <h4>Stored on: {food.storageDate}</h4>
                <h4>Expires on: {food.expirationDate}</h4>
              </div>
              <div>
                <div className="food-type-small">{food.type.name}</div>
                <div className="food-storage-small">{food.storage.name}</div>
                <div className="food-quantity">
                  {food.quantity} {food.quantityUnit.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
