import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../services/foodService";
import { useNavigate } from "react-router-dom";

export const FoodDetails = () => {
  const navigate = useNavigate();

  const [food, setFood] = useState({});
  const { foodId } = useParams();

  useEffect(() => {
    getFoodById(foodId).then((foodObj) => {
      setFood(foodObj);
    });
  }, [foodId]);

  const handleDeleteFood = () => {
    fetch(`http://localhost:8088/foods/${foodId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      navigate(`/${food.storage.name}`);
    });
  };

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
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteFood();
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            navigate(`/food/${foodId}/edit`);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
