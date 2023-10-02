import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { getUserImages } from "../../services/formService";
import foodLogo from "../../assets/images/foodLogo.png";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    firstName: "",
    userImageId: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    getUserImages().then((imageArray) => {
      setImages(imageArray);
    });
  }, []);

  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "honey_user",
          JSON.stringify({
            id: createdUser.id,
            firstName: createdUser.firstName,
            userImageId: createdUser.userImageId,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <div className="flex flex-col items-center bg-[#a4bdba] font-helvetica py-3">
      <form
        className="flex flex-col bg-[#e8d7b1] w-4/12 gap-y-4 p-6 m-5 rounded-3xl border-white border-8"
        onSubmit={handleRegister}
      >
        <div className="self-center">
          <img src={foodLogo} alt="There Will Be Food Logo" />
        </div>
        <div className="flex flex-col gap-4 bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2 translate-y-4">
          <h2 className="shadow-text">Please Register:</h2>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="text"
                id="firstName"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#995e40]"
                placeholder="Enter your first name..."
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="email"
                id="email"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#995e40]"
                placeholder="Enter your email address..."
                required
              />
            </div>
          </fieldset>
        </div>
        <div className="image-container bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2 translate-y-7">
          <div className="shadow-text">Choose an Avatar:</div>
          <fieldset className="image-select flex flex-row flex-wrap justify-between gap-x-8 gap-y-4 m-2">
            {images.map((imageObj) => {
              return (
                <label key={imageObj.id} className="basis-36">
                  <img
                    src={imageObj.address}
                    alt={imageObj.name}
                    value={customer.userImageId}
                    className={
                      customer.userImageId === imageObj.id
                        ? // ? Selected Image style ternary
                          "border-amber-900 border-4 rounded-2xl hover:cursor-pointer"
                        : "hover:cursor-pointer opacity-60"
                    }
                    onClick={() => {
                      const copy = { ...customer };
                      copy.userImageId = parseInt(imageObj.id);
                      setCustomer(copy);
                    }}
                  />
                </label>
              );
            })}
          </fieldset>
        </div>

        <fieldset>
          <div className="flex justify-center translate-y-14">
            <button className="btn-save" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
