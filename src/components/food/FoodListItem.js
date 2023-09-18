import { useNavigate } from "react-router-dom";

export const FoodListItem = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="container w-3/12 flex-1 bg-red-300 text-black">
      <div className="food-image">{food.image.name}</div>
      <div className="food-details-small-a">
        <h3
          className="text-5xl text-yellow-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]"
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
