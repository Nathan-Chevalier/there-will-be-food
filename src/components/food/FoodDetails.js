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
    <div className="flex justify-center font-helvetica gap-2">
      <div className="flex bg-[#e8d7b1] w-7/12 mt-20 p-4 rounded-3xl border-white border-8">
        <div className="flex bg-[#bd956d] w-full gap-2 p-6 my-2 rounded-3xl border-white border-8">
          <div className="flex flex-col justify-between">
            <div className="food-image">
              <img src={food.image?.address} alt={food?.image?.name} />
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="btn-save"
                onClick={() => {
                  navigate(`/food/${foodId}/edit`);
                }}
              >
                Edit
              </button>
              <button
                className="bg-[#bd6d6d] hover:bg-[#994040] text-white font-bold py-2 px-4 border-4 border-white hover:border-white rounded-2xl"
                onClick={() => {
                  handleDeleteFood();
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="information-container flex flex-col flex-1 justify-between">
            <div className="flex justify-between flex-col flex-1">
              <div className="flex justify-between pb-6">
                <div className="text-4xl text-white font-semibold px-6 ml-6 w-max h-max py-4 rounded-b-lg border-t-3 border-white border-4 mx-2 -translate-y-7 bg-[#143736]">
                  {food.name}
                </div>
                <div className="flex flex-col justify-center items-end">
                  <div className="bg-[#14373b] font-semibold py-2 px-4 text-white border-white border-2 rounded-lg mb-2">
                    <span className="text-lg">{food.type?.name}</span>
                  </div>
                  <div className="bg-[#1c0702] py-2 px-4 font-semibold text-white border-white border-2 rounded-lg my-2">
                    <span className="text-lg">{food.storage?.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <div className="bg-[#bd956d] px-2 py-1 rounded-t-lg w-max translate-x-2 border-white border-2 border-b-0 text-white font-semibold">
                  Description:{" "}
                </div>
                <div className="h-20 rounded-lg bg-[#f3dbc2] border-white border-2 p-2">
                  <span className="m-2">{food?.description}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between px-2 pt-3">
                <div className="flex">
                  <div>
                    <span className="bg-[#bd956d] px-2 py-1 rounded-l-lg border-white border-2 border-r-0 text-white font-semibold">
                      Expires on:{" "}
                    </span>
                    <span className="bg-[#f3dbc2] px-2 py-1 rounded-r-lg border-white border-2 font-extrabold text-[#1c0702]">
                      {food.expirationDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <span className="bg-[#f3dbc2] px-2 py-1 rounded-l-lg border-white border-2 font-extrabold text-[#1c0702]">
                    {food.quantity}
                  </span>
                  <span className="bg-[#bd956d] px-2 py-1 rounded-r-lg border-white border-2 border-l-0 text-white font-semibold">
                    {food.quantity > 1
                      ? `${food.quantityUnit?.name}s`
                      : food.quantityUnit?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
