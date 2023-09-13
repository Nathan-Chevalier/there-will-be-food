import { Route, Routes, Outlet } from "react-router-dom";
import { Navbar } from "../components/nav/Navbar";
import { FoodForm } from "../components/forms/FoodForm";
import { FoodList } from "../components/lists/FoodList";
import { useEffect, useState } from "react";

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
        <Route path="new" element={<FoodForm currentUser={currentUser} />} />
        <Route path="all" element={<FoodList currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
