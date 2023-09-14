import { useNavigate } from "react-router-dom";

export const FoodListItem = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="food-card">
      <div className="food-image">{food.image.name}</div>
      <div className="food-details-small-a">
        <h3
          onClick={() => {
            navigate(`/food/${food.id}`);
          }}
        >
          {food.name}
        </h3>
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
};
