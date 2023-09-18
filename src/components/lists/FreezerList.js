import { useState, useEffect } from "react";
import { getFreezerFood } from "../../services/foodService";
import { FoodListItem } from "../food/FoodListItem";

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
    <div className="foods-container">
      <h2>Your Freezer:</h2>
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
      <div className="food-cards-small">
        {filteredFoods.map((food) => {
          return <FoodListItem food={food} />;
        })}
      </div>
    </div>
  );
};
