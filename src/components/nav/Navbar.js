import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserImages } from "../../services/formService";
import pantryButton from "../../assets/images/pantryButton.png";
import freezerButton from "../../assets/images/freezerButton.png";
import refrigeratorButton from "../../assets/images/refrigeratorButton.png";
import allButton from "../../assets/images/allButton.png";
import addButton from "../../assets/images/addButton.png";

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
    <div className="flex justify-center bg-[#995e40] rounded-3xl">
      <ul className="navbar flex justify-evenly bg-[#e8d7b1] border-[12px] border-white rounded-3xl p-2 w-10/12">
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
            <img src={addButton} alt="View All" />
          </Link>
        </li>
        <li></li>
        {localStorage.getItem("honey_user") ? (
          <li className="flex">
            <img src={image.address} alt={image.name} />
            <div className="flex flex-col items-center justify-center">
              {currentUser.firstName}
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
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
