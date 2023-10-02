import { useState, useEffect } from "react";
import { getFreezerFood } from "../../services/foodService";
import { FoodListItem } from "../food/FoodListItem";
import viewFreezer from "../../assets/images/viewFreezer.png";

export const FreezerList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    getFreezerFood(currentUser).then((foodArray) => {
      setFoods(foodArray);
    });
  }, [currentUser]);

  useEffect(() => {
    const foundFood = foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(foundFood);
  }, [foods, searchTerm]);

  return (
    <div className="flex flex-col bg-[#a4bdba] pb-6 mt-2 rounded-3xl">
      <div className="flex justify-between pt-2">
        <div className="flex items-center bg-[#e8d7b1] w-max ml-8 pr-8 py-2 pt-2 rounded-t-xl border-x-4 border-white border-t-4">
          <span className="shadow-text mx-10 bg-[#c09571] px-2">
            Search Food:
          </span>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search All"
            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#c09571]"
          />
        </div>
        <div className="pb-2">
          <img src={viewFreezer} alt="View All" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-around items-start gap-y-5 py-5 bg-[#e8d7b1] border-white border-8 rounded-3xl">
        {filteredFoods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
