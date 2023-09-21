import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { getUserImages } from "../../services/formService";

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
    <div className="flex flex-col items-center bg-[#a4bdba] font-helvetica py-64">
      <form
        className="flex flex-col bg-[#a47f74] w-6/12 gap-y-2 p-6 m-5 rounded-3xl"
        onSubmit={handleRegister}
      >
        <div className="self-center">
          <h1>LOGO HERE</h1>
        </div>
        <div className="flex flex-col gap-4 bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
          <h2 className="shadow-text">Please Register</h2>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="text"
                id="firstName"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Enter your first name"
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
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
        </div>
        <div className="image-container bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
          <fieldset className="image-select flex flex-row flex-wrap justify-between gap-x-8 gap-y-4 m-2">
            {images.map((imageObj) => {
              return (
                <label key={imageObj.id}>
                  <div className="image-radio">
                    <input
                      type="radio"
                      id="image"
                      name={imageObj.name}
                      value={imageObj.id}
                      checked={customer.userImageId === imageObj.id}
                      onChange={(event) => {
                        const copy = { ...customer };
                        copy.userImageId = parseInt(event.target.value);
                        setCustomer(copy);
                      }}
                    />
                  </div>
                  <img src={imageObj.address} alt={imageObj.name} />
                </label>
              );
            })}
          </fieldset>
        </div>

        <fieldset>
          <div className="form-group">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-500 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
