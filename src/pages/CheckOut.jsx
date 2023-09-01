import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    // username from saved user, phone number below, product details from cart and progress default = sent
    navigate("/progress", { state: { data: 6 } });
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[1em]">
        <div className="my-[20px]">
          <Link to="/cart">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
        </div>

        <h2 className="text-lg font-bold mb-[1em]">Shipping Details</h2>

        <div className="">
          <h2 className="text-center font-bold mb-[10px]">
            {" "}
            ** Delivery Charges **
          </h2>
          <ul className="text-center">
            <li>Inside Campus extra Ksh. 20</li>
            <li>Outside Campus upto Mexico Hostel, extra Ksh. 50</li>
          </ul>
        </div>

        <form className=" pt-[2em] w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto">
          <div className="flex flex-col gap-[15px]">
            {/* user details */}
            <input
              type="text"
              placeholder="Enter phone number"
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
            />
            {/* shipping details */}
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Enter location to deliver. Be as Specific as possible"
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
            ></textarea>
            {/* Anymore details */}
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="You can add more info about your order here."
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
            ></textarea>
            <button
              className="bg-red-800 p-[10px] text-white rounded-md"
              onClick={handleCreateOrder}
            >
              Order Now
            </button>
          </div>
        </form>
      </div>
      {/*  */}
    </div>
  );
};

export default CheckOut;
