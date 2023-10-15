import React, { useEffect, useRef, useState } from "react";

import Food from "../components/Food";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // working on modal
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // what happens when we click on a post
  const handlePostClick = () => {
    setIsPopUpOpen(true);
  };

  useEffect(() => {
    // handlePostClick();
  }, []);

  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      // You can also display a success message or perform any other action after copying.
      toast.success("Copied To Clipboard");
    }
  };

  const PopUpPage = ({ onClose }) => {
    return (
      <div className="pop-up-page prompt">
        {/* data */}
        <div className="pop-up-content">
          <div className=" ">
            {/* share url */}
            <div>
              <p className="text-center mb-[10px]">
                <span className="text-2xl">😀</span>Welcome
              </p>
            </div>
            <h2 className="mb-[10px] text-center font-bold text-red-600">
              IMPORTANT ALERT
            </h2>
            <div className=" text-center">
              <p className="mb-[14px]">
                We shall start delivering from Monday 16th{" "}
              </p>

              <p>Thank you for your patience.</p>
            </div>
            {/*  */}
            <div className="mt-[1.6em] w-full flex justify-center">
              <button onClick={onClose} className="" id="roundedBg">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar announcement */}
        <div
          className="bg-red-800 text-white p-1 w-full z-50"
          style={{ position: "fixed", top: 0, left: 0 }}
        >
          <h2 className="text-center text-lg">Delivery from 8AM to 9PM</h2>
          <p className="text-center text-sm">Delivery Fee Applies</p>
        </div>

        <div className=" px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[5em]">
          {/* food */}
          {/* {console.log(user)} */}
          {user ? (
            <div className="flex justify-end gap-4">
              <Link to="/charges">
                <p className="text-end font-bold mb-[13px] cursor-pointer">
                  FEE
                </p>
              </Link>
              <Link to="/feedback">
                <p className="text-end font-bold mb-[13px] cursor-pointer">
                  VIEWS
                </p>
              </Link>
              <Link to="/orders">
                <p className="text-end font-bold mb-[13px] cursor-pointer">
                  ORDERS
                </p>
              </Link>
              <p
                className="text-end font-bold mb-[13px] cursor-pointer"
                onClick={handleLogout}
              >
                LOGOUT
              </p>
            </div>
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
      {/* pop up screen */}
      {isPopUpOpen && (
        <div className="pop-up-overlay">
          <PopUpPage onClose={() => setIsPopUpOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
