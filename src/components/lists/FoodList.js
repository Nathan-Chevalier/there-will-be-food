import { useState, useEffect } from "react";
import { getAllFood } from "../../services/foodService";
import { FoodListItem } from "../food/FoodListItem";

export const FoodList = ({ currentUser }) => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    getAllFood(currentUser).then((foodArray) => {
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
    <div className="foods-container">
      <h2>All Foods:</h2>
      <div>
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="text"
          placeholder="Search Freezer"
          className="Food Search"
        />
      </div>
      <div className="flex-row flex-wrap justify-between items-start">
        {filteredFoods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
