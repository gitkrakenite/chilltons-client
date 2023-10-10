import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "../components/Spinner";

const CheckOut = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please Sign in");
    }
  }, [user, navigate]);

  const [newPhone, setNewPhone] = useState("");
  const [location, setLocation] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [progress, setProgress] = useState("received");

  // fetch products from cart
  // fetch products from localstorage
  const [cartProducts, setCartProducts] = useState([]);
  function getSortedProductsFromLocalStorage() {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Sort the cart items in reverse order based on the timestamp or any other relevant property
    const sortedCartItems = cartItems.sort((a, b) => b.timestamp - a.timestamp);

    // Update the cart state with the sorted products
    setCartProducts(sortedCartItems);
    // console.log(sortedCartItems);
  }

  useEffect(() => {
    getSortedProductsFromLocalStorage();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    handlePostClick();

    // username from saved user, phone number below, product details from cart and progress default = sent

    let username = user?.username;

    if (!username) {
      navigate("/login");
      return toast.error("You need an account to create order");
    }

    if (!newPhone || !location) {
      return toast.error("Phone number or location missing");
    }

    try {
      setLoading(true);
      const dataToSend = {
        username,
        newPhone,
        location,
        moreInfo,
        progress,
        product: cartProducts,
      };

      const response = await axios.post("/orders/create", dataToSend);
      if (response) {
        setLoading(false);
        toast.success("Order sent succesfully");
        // Clear the existing cart items
        localStorage.setItem("cart", JSON.stringify([]));
        let orderId = response.data._id;
        if (orderId) {
          navigate("/progress", { state: { data: { orderId } } });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error creating order");
    }
  };

  // working on modal

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // what happens when we click on a post
  const handlePostClick = () => {
    setIsPopUpOpen(true);
  };

  // const PopUpPage = ({ onClose }) => {
  //   return (
  //     <div className="pop-up-page prompt">
  //       {/* close btn */}

  //       {/* data */}
  //       <div className="pop-up-content">
  //         <div className="flex justify-center my-[20px] z-[999] ">
  //           {/* <button onClick={onClose}>
  //             <AiOutlineClose
  //               className="text-5xl text-zinc-800 p-[10px] rounded-full "
  //               style={{
  //                 border: "2px solid #188c56",
  //                 position: "sticky",
  //                 top: "20px",
  //               }}
  //               title="close"
  //             />
  //           </button> */}
  //         </div>
  //         <div className=" ">
  //           <h2>Hello {user?.username}.</h2>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
          <Link to="/charges">
            <h2 className="text-center font-bold mb-[10px] text-red-500 underline">
              click to see delivery charges
            </h2>
          </Link>
        </div>

        <form className=" pt-[2em] w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto">
          <div className="flex flex-col gap-[15px]">
            {/* user details */}
            <input
              type="text"
              placeholder="Enter phone number"
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
            {/* shipping details */}
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Enter location to deliver. Be as Specific as possible"
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></textarea>
            {/* Anymore details */}

            <select
              name="delivery"
              id="delivery"
              value={moreInfo}
              onChange={(e) => setMoreInfo(e.target.value)}
              className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
            >
              <option value="">Choose</option>
              <option value="inside">inside campus</option>
              <option value="outside">outside campus</option>
            </select>

            <div>
              <p className="text-center text-sm mb-2">
                Payment inclusive of delivery fee
              </p>
            </div>

            {loading ? (
              <div>
                <Spinner message="creating order" />
              </div>
            ) : (
              <button
                className="bg-red-800 p-[10px] text-white rounded-md"
                onClick={handleCreateOrder}
              >
                Order Now
              </button>
            )}
          </div>
        </form>
      </div>
      {/*  */}
      {/* pop up screen */}
      {/* {isPopUpOpen && (
        <div className="pop-up-overlay">
          <PopUpPage onClose={() => setIsPopUpOpen(false)} />
        </div>
      )} */}
    </div>
  );
};

export default CheckOut;
