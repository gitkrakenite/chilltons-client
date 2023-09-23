import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../components/Comment";

import axios from "../axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const SpecificProduct = () => {
  const { user } = useSelector((state) => state.auth);

  // fetch the food
  const { id } = useParams();
  const [singleFood, setSingleFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFood = async () => {
    try {
      setLoading(true);

      let checkParam = id;
      const response = await axios.get("/food/specific/" + checkParam);
      if (response) {
        setLoading(false);
        setSingleFood([response.data]);
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Food.");
      toast.error("Network error or doesn't exist");
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const [cartItemCount, setCartItemCount] = useState(0);
  let [newQuantity, setNewQuantity] = useState(0);
  let [newPrice, setNewPrice] = useState(0);

  // let us use localstorage to store cart
  const handleAddCart = async (product, extraData) => {
    // Retrieve the existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      // Product already exists, return a message
      toast.error("Already Added To Cart");
      return;
    }

    // Merge the product and extraData into a new object
    const productWithExtraData = { ...product, ...extraData };

    // Create a new cart with the existing items and the new product
    const updatedCart = [...cartItems, productWithExtraData];

    console.log(extraData);

    // Update the cart items in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the cart item count in the parent component
    setCartItemCount((prevCount) => prevCount + 1);

    toast.success(`${product.title} added to Cart`);
    return;
  };

  // read from state
  useEffect(() => {
    // Function to count the number of items in localStorage
    const countItemsInCart = () => {
      try {
        // Retrieve the existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Get the number of items in the cart
        const itemCount = cartItems.length;
        // Update the state with the item count
        setCartItemCount(itemCount);
      } catch (error) {
        // Handle any errors that might occur during parsing or reading from localStorage
        console.error("Error reading from localStorage:", error);
      }
    };

    countItemsInCart(); // Call the function when the component mounts
  }, [handleAddCart]);

  const [quantity, setQuantity] = useState(1);

  // like product
  const handleLikeProduct = async (product) => {
    try {
      if (!user) {
        toast.error("Please Login To leave a like", { theme: "dark" });
        return;
      }

      let username = user.username;
      let id = product._id;
      let likeData = { username };

      await axios.post("/food/like/" + id, likeData);
      window.location.reload();
    } catch (error) {
      toast.error("Failed To Like");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar */}
        <div className="w-full ">
          <Link to="/home">
            <div className=" px-2 sm:px-8 py-[1em] flex items-center gap-[10px]">
              <AiOutlineArrowLeft className="text-xl" />
              <p>Back Shopping</p>
            </div>
          </Link>
        </div>

        {/* product */}

        {loading ? (
          <div className="w-full justify-center flex mt-[8em]">
            <Spinner message="Fetching Product" />
          </div>
        ) : (
          <div>
            <div className=" px-[10px] md:px-[3em] xl:px-[5em]">
              {singleFood?.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-[2em]"
                  >
                    {/* img side */}
                    <div className="flex-[0.5]">
                      <img
                        src={item.image}
                        alt=""
                        className=" md:max-h-[500px]"
                      />
                    </div>
                    {/* text side */}
                    <div className="flex-[0.5]">
                      {/* options */}
                      <div className="flex justify-between">
                        <div>
                          <p># {item.category}</p>
                        </div>
                        <div className="flex gap-2">
                          {item.available ? (
                            <div className="flex gap-2">
                              <AiOutlineShoppingCart
                                className="text-2xl text-red-600 cursor-pointer z-10"
                                title="Add To Cart"
                                onClick={() =>
                                  handleAddCart(item, {
                                    newQuantity: quantity,
                                    newPrice,
                                  })
                                }
                              />
                              <p>{cartItemCount}</p>
                            </div>
                          ) : (
                            <span className="bg-orange-700 text-white p-2 rounded-md">
                              Cannot Add To Cart
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-[1em]">
                          <div className="flex items-center gap-2">
                            <AiOutlineLike
                              className="text-2xl text-red-600 cursor-pointer z-10"
                              title="Like This Product"
                              onClick={() => handleLikeProduct(item)}
                            />
                            <p>{item.likes.length}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <AiOutlineComment className="text-2xl text-red-600 " />
                            <p>{item.comments.length}</p>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div>
                        <p className="text-2xl font-bold my-[1em]">
                          {item.title}
                        </p>
                        <p className="mb-[2em]">{item.description}</p>
                        <p className="mb-[2em]">
                          {item.available ? (
                            <span className="bg-emerald-700 text-white p-2 rounded-md">
                              available
                            </span>
                          ) : (
                            <span className="bg-orange-700 text-white p-2 rounded-md">
                              not available
                            </span>
                          )}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className=" flex gap-3 items-center">
                            <div>
                              <p>Add Quantity</p>
                            </div>
                            <select
                              name="quantity"
                              id="quantity"
                              className="bg-zinc-800 rounded-md text-white p-1"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(item.quantity)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="">
                            <p>
                              {" "}
                              Ksh.{" "}
                              {
                                (newPrice =
                                  parseInt(item.price) * parseInt(quantity))
                              }
                            </p>

                            {/* <p className="hidden">{(item.quantity = quantity)}</p> */}
                            {/* <p>{item.quantity}</p> */}
                          </div>
                        </div>
                      </div>
                      {/* comments` */}
                      <div className="mt-[1em]">
                        <Comment item={item} />
                      </div>
                    </div>
                  </div>
                  {/* RECOMMENDED */}
                  <div className="mt-[2em]">{/* <p>RECOMMENDED</p> */}</div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificProduct;
