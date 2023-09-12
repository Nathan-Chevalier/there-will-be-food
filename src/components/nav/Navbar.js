import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/all">
          View All
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/new">
          Add Food
        </Link>
      </li>
    </ul>
  );
};
