import { useState, useEffect } from "react";
import { getAllFood } from "../services/foodService";

export const FoodList = () => {
  const [allFood, setAllFood] = useState([]);

  useEffect(() => {
    getAllFood().then((foodArray) => {
      setAllFood(foodArray);
    });
  }, []);

  return <>Food List</>;
};
