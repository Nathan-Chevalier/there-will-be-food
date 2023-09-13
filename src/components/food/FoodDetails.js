import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../services/foodService";

export const FoodDetails = () => {
  const [food, setFood] = useState({});
  const { foodId } = useParams();

  useEffect(() => {
    getFoodById(foodId).then((foodObj) => {
      setFood(foodObj);
    });
  }, [foodId]);

  return (
    <div className="food-card">
      <div className="food-image">{food.image?.name}</div>
      <div className="food-details-small-a">
        <h3>{food.name}</h3>
        <h4>Stored on: {food.storageDate}</h4>
        <h4>Expires on: {food.expirationDate}</h4>
        <p>Description: {food.description}</p>
      </div>
      <div>
        <div className="food-type-small">{food.type?.name}</div>
        <div className="food-storage-small">{food.storage?.name}</div>
        <div className="food-quantity">
          {food.quantity} {food.quantityUnit?.name}
        </div>
      </div>
    </div>
  );
};
