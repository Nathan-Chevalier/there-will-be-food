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
    <div className="flex justify-center bg-[#a4bdba] font-helvetica gap-2">
      <div className="flex bg-[#a47f74] w-8/12 gap-4 p-6 m-5 ">
        <div className="flex flex-col">
          <div className="food-image">
            <img src={food.image?.address} alt={food.image?.name} />
          </div>
          <div className="flex flex-col">
            <button
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-500 rounded"
              onClick={() => {
                handleDeleteFood();
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-500 rounded"
              onClick={() => {
                navigate(`/food/${foodId}/edit`);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="information-container flex flex-col flex-1 justify-between">
          <div>
            {" "}
            <div className="flex justify-between">
              <h3>{food.name}</h3>
              <div className="flex">
                <div className="food-type-small">{food.type?.name}</div>
                <div className="food-storage-small">{food.storage?.name}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div>Description: </div>
              <div>{food.description}</div>
            </div>
          </div>

          <div>
            <h4 className="">Stored on: {food.storageDate}</h4>
            <div className="flex justify-between">
              <h4>Expires on: {food.expirationDate}</h4>
              <div className="food-quantity">
                {food.quantity} {food.quantityUnit?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
