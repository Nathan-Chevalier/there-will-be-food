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
      <div className="flex bg-[#a47f74] w-8/12 gap-4 p-6 m-16 rounded-lg">
        <div className="flex flex-col justify-between">
          <div className="food-image">
            <img src={food.image?.address} alt={food.image?.name} />
          </div>
          <div className="flex flex-col gap-4">
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
          <div className="flex justify-between flex-col flex-1">
            <div className="flex justify-between pb-6">
              <div className="text-5xl text-yellow-400 shadow-text">
                {food.name}
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-green-600 py-0.5 px-2 text-amber-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg">
                  <span className="shadow-text">{food.type?.name}</span>
                </div>
                <div className="bg-green-600 py-0.5 px-2 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg">
                  <span className="shadow-text">{food.storage?.name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
              <div className="shadow-text pb-2">Description: </div>
              <div className="h-20 rounded-lg bg-slate-950/10 border-slate-950/20 border-2 py-1">
                <span className="m-2">{food.description}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between rounded-lg bg-slate-950/10 border-slate-950/20 border-2 py-4 px-2">
              <div className="flex rounded-lg bg-slate-950/10 border-slate-950/20 border-2 py-4 px-2">
                <h4 className="pr-8">
                  <span className="shadow-text">Stored on: </span>
                  {food.storageDate}
                </h4>
                <h4>
                  <span className="shadow-text">Expires on: </span>
                  {food.expirationDate}
                </h4>
              </div>

              <div className="self-center rounded-lg bg-slate-950/10 border-slate-950/20 border-2 py-4 px-2">
                {food.quantity} {food.quantityUnit?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
