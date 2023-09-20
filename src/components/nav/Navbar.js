import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserImages } from "../../services/formService";
import pantryButton from "../../assets/images/pantryButton.png";
import freezerButton from "../../assets/images/freezerButton.png";
import refrigeratorButton from "../../assets/images/refrigeratorButton.png";
import allButton from "../../assets/images/allButton.png";

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
          <img src={pantryButton} alt="View Pantry" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/refrigerator">
          <img src={refrigeratorButton} alt="View Refrigerator" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/freezer">
          <img src={freezerButton} alt="View Freezer" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/all">
          <img src={allButton} alt="View All" />
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
