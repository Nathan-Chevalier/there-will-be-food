import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import foodLogo from "../../assets/images/foodLogo.png";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "honey_user",
          JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            userImageId: user.userImageId,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <div className="flex flex-col items-center bg-[#a4bdba] font-helvetica py-64">
      <section className="card">
        <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
          <div className="flex self-center">
            <img src={foodLogo} alt="There Will Be Food Logo" />
          </div>
          <div className="bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
            <h2 className="shadow-text mb-2">Please sign in</h2>
            <fieldset>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#995e40]"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
          </div>

          <div className="self-center">
            <button className="btn-save" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </section>
      <section>
        <Link to="/register">
          <span className="btn-save">Not a member yet?</span>
        </Link>
      </section>
    </div>
  );
};
