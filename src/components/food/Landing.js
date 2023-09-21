import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <ul className="navbar h-[600px]">
      <li className="navbar__item">
        <Link className="navbar__link" to="/pantry">
          Pantry
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/fridge">
          Refrigerator
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/freezer">
          Freezer
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/all">
          View All
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/food/new">
          Add Food
        </Link>
      </li>
    </ul>
  );
};
