import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserImages } from "../../services/formService";
import pantryButton from "../../assets/images/pantryButton.png";
import freezerButton from "../../assets/images/freezerButton.png";
import refrigeratorButton from "../../assets/images/refrigeratorButton.png";
import allButton from "../../assets/images/allButton.png";
import addButton from "../../assets/images/addButton.png";
import foodLogo from "../../assets/images/foodLogo.png";

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
    <div className="flex justify-center bg-[#995e40] rounded">
      <ul className="navbar flex justify-between items-center bg-[#e8d7b1] border-[12px] border-white rounded-3xl p-2 w-11/12">
        <li className="relative">
          <Link to="/">
            <img src={foodLogo} alt="Landing Page" />
          </Link>
        </li>
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
        {localStorage.getItem("honey_user") ? (
          <li className="flex justify-center items-center bg-[#bd956d] p-2 rounded-2xl scale-90 border-white border-4">
            <div className="flex flex-col justify-center items-center bg-slate-950/10 h-min px-2 mx-2 rounded-2xl border-slate-950/10 border-2">
              <span className="text-white shadow-text m-1 font-bold">
                {currentUser.firstName}
              </span>
              <Link
                className="btn-save mb-2 scale-75"
                to=""
                onClick={() => {
                  localStorage.removeItem("honey_user");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            </div>
            <img className="" src={image.address} alt={image.name} />
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};
