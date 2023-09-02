import React from "react";

import Food from "../components/Food";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar announcement */}
        <div className="bg-red-800 text-white p-1">
          <h2 className="text-center text-lg">Delivery from 8AM to 9PM</h2>
        </div>

        <div className=" px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-4">
          {/* food */}
          {user ? (
            <p
              className="text-end font-bold mb-[13px] cursor-pointer"
              onClick={handleLogout}
            >
              LOGOUT
            </p>
          ) : (
            <p
              className="text-end font-bold mb-[13px] cursor-pointer"
              onClick={handleLogout}
            >
              LOGIN
            </p>
          )}

          <div>
            <Food />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
