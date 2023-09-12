import { FoodForm } from "./components/forms/FoodForm";
import { FoodList } from "./components/lists/FoodList";
import { Navbar } from "./components/nav/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      >
        <Route path="new" element={<FoodForm />} />
        <Route path="all" element={<FoodList />} />
      </Route>
    </Routes>
  );
};
