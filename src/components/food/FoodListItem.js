import { useNavigate } from "react-router-dom";

export const FoodListItem = ({ food }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column w-3/12 basis-[32%] p-[10px] bg-[#bd956d] rounded-2xl text-black justify-between border-white border-4">
      <div className="flex items-center">
        <img
          className="aspect-square w-full min-w-full"
          src={food.image.address}
          alt={food.image.name}
        />
      </div>
      <div className="flex-1 flex flex-col flex-wrap justify-between">
        <h3
          className="text-3xl text-white font-semibold px-6 ml-6 w-max py-2 rounded-b-lg border-t-2 border-white border-4 mx-2 -translate-y-3 bg-slate-950/10"
          onClick={() => {
            navigate(`/food/${food.id}`);
          }}
        >
          {food.name}
        </h3>
        <div className="flex flex-col flex-wrap ml-4 w-max px-2 items-start justify-center">
          <div className="flex">
            <span className="bg-[#bd956d] px-2 py-1 rounded-l-lg border-white border-2 border-r-0 text-white font-semibold">
              Expires on:
            </span>{" "}
            <span className="bg-[#f3dbc2] px-2 py-1 rounded-r-lg border-white border-2 font-extrabold text-[#1c0702]">
              {food.expirationDate}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-initial flex flex-col justify-between">
        <div className="flex flex-col justify-items-end items-end">
          <div className="bg-[#14373b] font-semibold py-0.5 px-2 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg">
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.type.name}
            </span>
          </div>
          <div className="bg-[#1c0702] py-0.5 px-2 font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] rounded-lg my-2">
            <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              {food.storage.name}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <span className="bg-[#f3dbc2] px-2 py-1 rounded-l-lg border-white border-2 font-extrabold text-[#1c0702]">
            {food.quantity}
          </span>
          <span className="bg-[#bd956d] px-2 py-1 rounded-r-lg border-white border-2 border-l-0 text-white font-semibold">
            {food.quantityUnit.name}
          </span>
        </div>
      </div>
    </div>
  );
};
