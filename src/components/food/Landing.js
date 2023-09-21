import { Link } from "react-router-dom";
import pantrySplash from "../../assets/images/pantrySplash.png";
import refrigeratorSplash from "../../assets/images/refrigeratorSplash.png";
import freezerSplash from "../../assets/images/freezerSplash.png";
import allSplash from "../../assets/images/allSplash.png";
import addSplash from "../../assets/images/addSplash.png";

export const Landing = () => {
  return (
    <ul className="flex justify-around items-center h-fill py-24 bg-[#e8d7b1] rounded-3xl">
      <li className="navbar__item">
        <Link className="navbar__link" to="/pantry">
          <img src={pantrySplash} alt="View Pantry" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/refrigerator">
          <img src={refrigeratorSplash} alt="View Refrigerator" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/freezer">
          <img src={freezerSplash} alt="View Freezer" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/all">
          <img src={allSplash} alt="View All" />
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/food/new">
          <img src={addSplash} alt="View All" />
        </Link>
      </li>
    </ul>
  );
};
