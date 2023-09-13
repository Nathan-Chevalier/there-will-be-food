import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
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
        <Link className="navbar__link" to="/new">
          Add Food
        </Link>
      </li>
      {localStorage.getItem("honey_user") ? (
        <li className="navbar__item navbar-logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("honey_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
