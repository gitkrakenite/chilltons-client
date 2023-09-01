import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineLike,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../components/Comment";

const SpecificProduct = () => {
  const DummyProduct = [
    {
      id: 11,
      title: "Chicken Burger",
      price: "120",
      category: "snack",
      description:
        "Bread on either side with a slab of chicken, tomato and ketchup inside",
      image:
        "https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg?auto=compress&cs=tinysrgb&w=1600",
      likes: [
        {
          id: 1,
          sender: "mercydoe",
        },
        {
          id: 2,
          sender: "juliusdoe",
        },
      ],
      comments: [
        {
          id: 1,
          sender: "chrisdoe",
          comment: "I like your fries",
        },
        {
          id: 2,
          sender: "mercyjoe",
          comment: "I like the chipo masala",
        },
      ],
      quantity: 5,
      available: true,
    },
  ];

  const [cartItemCount, setCartItemCount] = useState(0);

  // let us use localstorage to store cart
  const handleAddCart = async (product) => {
    // Retrieve the existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Product already exists, return a message
      toast.error("Already Added To Cart");
      return;
    }

    // Create a new cart with the existing items and the new product
    const updatedCart = [...cartItems, product];

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

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar */}
        <Link to="/home">
          <div className=" px-2 sm:px-8 py-[1em] flex items-center gap-[10px]">
            <AiOutlineArrowLeft className="text-xl" />
            <p>Back Shopping</p>
          </div>
        </Link>

        {/* product */}
        <div className=" px-[10px] md:px-[3em] xl:px-[5em]">
          {DummyProduct.map((item) => (
            <>
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-[2em]"
              >
                {/* img side */}
                <div className="flex-[0.5]">
                  <img src={item.image} alt="" className=" md:max-h-[500px]" />
                </div>
                {/* text side */}
                <div className="flex-[0.5]">
                  {/* options */}
                  <div className="flex justify-between">
                    <div>
                      <p># {item.category}</p>
                    </div>
                    <div>
                      <AiOutlineShoppingCart
                        className="text-2xl text-red-600 cursor-pointer z-10"
                        title="Add To Cart"
                        onClick={() => handleAddCart(item)}
                      />
                    </div>
                    <div>
                      <AiOutlineLike
                        className="text-2xl text-red-600 cursor-pointer z-10"
                        title="Like This Product"
                        onClick={() => handleAddCart(item)}
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div>
                    <p className="text-2xl font-bold my-[1em]">{item.title}</p>
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

                      <div className="mt-5">
                        <p> Ksh. {(item.price = item.price * quantity)}</p>
                        <p className="hidden">{(item.quantity = quantity)}</p>
                      </div>
                    </div>
                  </div>
                  `{/* comments` */}
                  <div>
                    <Comment item={item} />
                  </div>
                </div>
              </div>
              {/* RECOMMENDED */}
              <div className="mt-[2em]">
                <p>RECOMMENDED</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificProduct;
