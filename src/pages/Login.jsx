import React, { useEffect, useState } from "react";
import logo from "../assets/chlogo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [seePass, setSeePass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Please Check Login Details");
      toast.error("Also Check Network");
    }

    if (user || isSuccess) {
      navigate("/home");
      // toast.success("Welcome Back");
    }

    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const [loading, setLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!username) {
      setLoading(false);
      return toast.error("username missing");
    }

    if (!password) {
      setLoading(false);
      return toast.error("password missing");
    }

    try {
      setLoading(true);
      const userData = { username, password };
      dispatch(login(userData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to sign you in");
    }
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
        Log in to your account
      </h2>
      <form
        className=" w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto"
        onSubmit={handleSignin}
      >
        <div className="flex flex-col gap-[10px] mb-[22px]">
          <label htmlFor="username" className="font-bold text-zinc-500">
            Enter Your username
          </label>
          <input
            type="text"
            id="username"
            placeholder="username i.e lucythegreat"
            className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="flex flex-col gap-[10px] mb-[22px] flex-[0.98]">
            <label htmlFor="password" className="font-bold text-zinc-500">
              Enter Your Password
            </label>
            <input
              type={seePass ? "text" : "password"}
              id="password"
              placeholder="password needed"
              className="bg-transparent border border-zinc-400 p-[8px] rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        {loading ? (
          <div>
            <Spinner message="authorizing ..." />
          </div>
        ) : (
          <div>
            <button
              className="bg-red-800 text-white p-[10px] w-full rounded-md"
              onClick={handleSignin}
            >
              Log in
            </button>
          </div>
        )}
      </form>
      <div className="mt-[2em] w-full flex justify-center gap-[3em] flex-wrap">
        <Link to="/register" className="underline">
          <p>Create Account ?</p>
        </Link>
        <div className="underline">
          <a href="tel:+254 798 556471">Call Us O798 556471</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
