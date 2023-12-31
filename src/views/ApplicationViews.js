import { Route, Routes, Outlet } from "react-router-dom";
import { Navbar } from "../components/nav/Navbar";
import { FoodForm } from "../components/forms/FoodForm";
import { FoodList } from "../components/lists/FoodList";
import { useEffect, useState } from "react";
import { PantryList } from "../components/lists/PantryList";
import { FridgeList } from "../components/lists/FridgeList";
import { FreezerList } from "../components/lists/FreezerList";
import { FoodDetails } from "../components/food/FoodDetails";
import { EditForm } from "../components/forms/EditForm";
import { Landing } from "../components/food/Landing";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser);

    setCurrentUser(honeyUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Landing />} />
        <Route path="food">
          <Route path=":foodId" element={<FoodDetails />} />
          <Route path="new" element={<FoodForm currentUser={currentUser} />} />
          <Route path=":foodId/edit" element={<EditForm />} />
        </Route>
        <Route path="all" element={<FoodList currentUser={currentUser} />} />
        <Route
          path="pantry"
          element={<PantryList currentUser={currentUser} />}
        />
        <Route
          path="refrigerator"
          element={<FridgeList currentUser={currentUser} />}
        />
        <Route
          path="freezer"
          element={<FreezerList currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
