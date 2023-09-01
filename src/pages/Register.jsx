import React, { useState } from "react";
import logo from "../assets/chlogo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  const [seePass, setSeePass] = useState(false);
  const handleCreateAccount = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {/* topbar */}
      <div className=" w-full h-full top-0  text-white px-[10px] sm:px-[1em] md:px-[3em] lg:px-[4em] xl:px-[5em]  ">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div>
            {/* <h2>CHILLTONS</h2> */}
            <img src={logo} alt="" className="w-20 h-20" />
          </div>
        </div>
      </div>
      <h2 className="text-center mb-[2em] mt-[1em] font-bold">
        Please Create An Account
      </h2>
      <form className=" w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto">
        <div className="flex flex-col gap-[10px] mb-[22px]">
          <label htmlFor="username" className="font-bold text-zinc-500">
            Create a username. No spaces
          </label>
          <input
            type="text"
            id="username"
            placeholder="username i.e lucythegreat"
            className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
          />
        </div>
        <div className="flex flex-col gap-[10px] mb-[22px]">
          <label htmlFor="phone" className="font-bold text-zinc-500">
            Enter Your Phone Number
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Phone i.e 0xxx xxxxxx"
            className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="flex flex-col gap-[10px] mb-[22px] flex-[0.98]">
            <label htmlFor="password" className="font-bold text-zinc-500">
              Create A Strong Password
            </label>
            <input
              type={seePass ? "text" : "password"}
              id="password"
              placeholder="Phone i.e 0xxx xxxxxx"
              className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
            />
          </div>
          <div className="flex-[0.02]">
            {seePass ? (
              <AiOutlineEyeInvisible
                className="text-2xl cursor-pointer"
                onClick={() => setSeePass(false)}
              />
            ) : (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={() => setSeePass(true)}
              />
            )}
          </div>
        </div>
        <div>
          <button
            className="bg-red-800 text-white p-[10px] w-full rounded-md outline-none"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>
      </form>
      <div className="text-center mt-[2em] underline">
        <Link to="/login">
          <p>Already Have An Account</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
