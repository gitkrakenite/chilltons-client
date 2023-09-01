// import { useState } from "react";
import logo from "../assets/chlogo.png";
import bg from "../assets/bg2.png";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="w-full h-[100vh]">
      <img
        src={bg}
        alt="Background Placeholder"
        className="w-full h-[100vh] object-cover"
      />

      {/* overlay div */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.6)]" />
      {/* content */}
      <div>
        {/* topbar */}
        <div className="absolute w-full h-full top-0  text-white px-[5em]  ">
          <div className="flex justify-between items-center">
            {/* logo */}
            <div>
              {/* <h2>CHILLTONS</h2> */}
              <img src={logo} alt="" className="w-20 h-20" />
            </div>
            <div className="z-10">
              <p
                className="text-md font-bold bg-red-600 px-4 py-2 border-none outline-none rounded-md"
                style={{ letterSpacing: "1px" }}
              >
                LOGIN
              </p>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
          <p className="text-5xl mb-5 font-bold">
            Welcome to Chilltons Restaurant
          </p>
          <p className="text-3xl mb-5">
            Delicious Food, Quality Food, Fast Delivery
          </p>
          <div>
            <Link to="/home">
              <p id="specialBg">PROCEED WITHOUT ACCOUNT</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
