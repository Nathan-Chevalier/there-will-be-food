import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserImages } from "../../services/formService";

export const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState({});

  useEffect(() => {
    getUserImages().then((imageArr) => {
      const foundImage = imageArr.find(
        (imageObj) => imageObj.id === currentUser.userImageId
      );
      if (foundImage) {
        setImage(foundImage);
      }
    });
  }, [currentUser.userImageId]);

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/pantry">
          Pantry
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/refrigerator">
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
      <li>
        {currentUser.firstName}
        <img src={image.address} alt={image.name} />
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
