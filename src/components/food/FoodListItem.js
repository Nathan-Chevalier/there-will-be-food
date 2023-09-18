import { useNavigate } from "react-router-dom";

export const FoodListItem = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column w-3/12 basis-[32%] p-[10px] bg-red-300 text-black justify-between">
      <div className="flex items-center">
        <img
          className="aspect-square w-full min-w-full"
          src={food.image.address}
          alt={food.image.name}
        />
      </div>
      <div className="flex-1 flex flex-row flex-wrap justify-between">
        <h3
          className="text-2xl text-yellow-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] pl-4"
          onClick={() => {
            navigate(`/food/${food.id}`);
          }}
        >
          {food.name}
        </h3>
        <div className="flex flex-col flex-wrap pl-4 items-start justify-end">
          <div className="">Stored on: {food.storageDate}</div>
          <div className="">Expires on: {food.expirationDate}</div>
        </div>
      </div>
      <div className="flex-initial flex flex-col justify-between">
        <div className="flex flex-col justify-items-end items-end">
          <div className="bg-green-600">{food.type.name}</div>
          <div className="food-storage-small">{food.storage.name}</div>
        </div>
        <div className="flex flex-col items-end">
          {food.quantity} {food.quantityUnit.name}
        </div>
      </div>
    </div>
  );
};
