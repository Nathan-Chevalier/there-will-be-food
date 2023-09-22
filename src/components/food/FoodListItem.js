import { useNavigate } from "react-router-dom";

export const FoodListItem = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column w-3/12 basis-[32%] p-[10px] bg-[#c09571] rounded-2xl text-black justify-between border-white border-4">
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
        <div className="flex flex-col flex-wrap ml-4 p-1 rounded-2xl items-start justify-center bg-slate-950/[.075]">
          <div className="">
            <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              Stored on:
            </span>{" "}
            <span className="text-amber-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.storageDate}
            </span>
          </div>
          <div className="">
            <span className="text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.9)]">
              Expires on:
            </span>{" "}
            <span className="text-amber-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.expirationDate}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-initial flex flex-col justify-between">
        <div className="flex flex-col justify-items-end items-end">
          <div className="bg-green-600 py-0.5 px-2 text-amber-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg">
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.type.name}
            </span>
          </div>
          <div className="bg-green-600 py-0.5 px-2 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg my-2">
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.storage.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {food.quantity} {food.quantityUnit.name}
        </div>
      </div>
    </div>
  );
};
