import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GiCook } from "react-icons/gi";

import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import "./masonry.css";
import { BiPhoneCall } from "react-icons/bi";
import logo from "../assets/chlogo.png";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const Food = () => {
  const { user } = useSelector((state) => state.auth);

  const [allFood, setAllFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchFood = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/food/all");
      if (response) {
        setLoading(false);
        setAllFood(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Food");
    }
  };

  useEffect(() => {
    handleFetchFood();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allFood?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allFood?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const handleClick = (number) => {
    setStart(number);
    setEnd(number + 3);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClick(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      handleClick(currentPage);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  // search  states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // search user func
  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    // console.log(searchText);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allFood?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [cartItemCount, setCartItemCount] = useState(0);

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
  }, []);

  // handle fetch onOffer
  const [onOffer, setOnOffer] = useState([]);

  const handleFetchOffers = async () => {
    try {
      let dataToSend = { onOffer: "yes" };
      const response = await axios.post("/food/offer", dataToSend);
      if (response) {
        setOnOffer(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      // setLoading(false);
      console.log("Error");
      // toast.error("Error Fetching Offers");
    }
  };

  useEffect(() => {
    handleFetchOffers();
  }, []);

  return (
    <div>
      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-red-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* logo and options */}

      {!searchText && (
        <div className="flex justify-between items-center px-1 sm:px-2">
          <div>
            <Link to="/">
              <img src={logo} alt="" className="w-16 h-16" />
            </Link>
          </div>
          <div className="flex gap-[20px] items-center">
            <Link to="/sendus">
              <p>GROCERY</p>
            </Link>
            <Link to="/drinks">
              <p>DRINKS</p>
            </Link>
            <Link to="/cart" className="flex gap-1">
              <p>
                <AiOutlineShoppingCart className="text-2xl" />
              </p>
              <p className="mt-[-10px] ">{cartItemCount}</p>
            </Link>

            {user?.isAdmin == "yes" && (
              <div>
                {/* to="https://admin-chilltons.web.app/" */}
                <Link to="http://localhost:5173/" target="_blank">
                  <AiOutlineSetting className="text-2xl" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Offers */}
      {onOffer.length > 0 && !searchText && (
        <div className="mt-[1em]">
          <div className="mb-[15px] flex items-center gap-2">
            <p className="">SCROLL ON OFFER</p>
            <p>
              <AiOutlineArrowRight />
            </p>
          </div>
          {/* DATA */}
          <div>
            <div className="flex gap-[10px] overflow-x-scroll w-full prompt pb-2">
              <div className="flex flex-nowrap">
                {onOffer?.map((item) => (
                  <div key={item._id} className="flex-shrink-0 mr-[15px]">
                    <Link to={`/product/${item._id}`}>
                      <div className="relative rounded-lg group ">
                        <div className="overlay absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100">
                          <div
                            className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                          >
                            {/* top stats */}
                            <div>
                              <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                <div>
                                  <p className="text-white">{item.vendor}</p>
                                </div>
                                <div className="flex gap-[20px]">
                                  <p className="text-white text-md flex items-center gap-[5px]">
                                    <AiOutlineLike className="text-lg" />
                                    <span>{item.likes.length}</span>
                                  </p>
                                  <p className="text-white text-md flex items-center gap-[5px]">
                                    <span>Ksh. {item.price}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-[80px] left-3">
                                <p className="text-white">{item.title}</p>
                              </div>
                            </div>
                            {/*  */}
                            <div className="absolute bottom-[20px] left-[20px]  flex gap-[10%] w-full ">
                              <div>
                                <div className="flex gap-[10px] text-zinc-300">
                                  {/* <p>{item.location}</p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          src={item.image}
                          alt=""
                          className="w-72 h-80 rounded-md object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      )}

      {/* search bar & categories */}
      <div className=" w-full mt-[1em]">
        {/* searchbar */}
        <div className="w-full flex justify-center">
          <form className=" w-[98%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-zinc-300 flex gap-[5px] items-center p-[8px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search For Food"
              className="bg-transparent outline-none w-full "
              required
              // maxLength={15}
              // minLength={2}
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        {/* categories */}
        {!searchText && (
          <div className="mt-4">
            {/* <div className="mb-[15px] flex items-center gap-2">
              <p className="">SCROLL TO FILTER</p>
              <p>
                <AiOutlineArrowRight />
              </p>
            </div> */}
            <div className=" overflow-x-scroll prompt">
              <div className="flex justify-center">
                <ul className="flex  space-x-7  pb-1 ">
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={handleFetchFood}
                  >
                    <GiCook />
                    all
                  </li>
                  {/* <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "kioko";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find kioko");
                      }
                    }}
                  >
                    <GiCook />
                    kioko
                  </li> */}
                  {/* <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "food_palace";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find food palace");
                      }
                    }}
                  >
                    <GiCook />
                    food_palace
                  </li> */}
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "chilltons";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find chilltons");
                      }
                    }}
                  >
                    <GiCook />
                    chilltons
                  </li>
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "cafeteria";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find cafetaria");
                      }
                    }}
                  >
                    <GiCook />
                    cafeteria
                  </li>
                  {/* <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "dowells";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find dowells");
                      }
                    }}
                  >
                    <GiCook />
                    dowells
                  </li>
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "supafries";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find supa fries");
                      }
                    }}
                  >
                    <GiCook />
                    supa_fries
                  </li>
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "njuguna";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find njuguna");
                      }
                    }}
                  >
                    <GiCook />
                    njuguna
                  </li>
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "j&s";
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setOnOffer([]);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find j&s");
                      }
                    }}
                  >
                    <GiCook />
                    J&S
                  </li>
                  <li
                    className="cursor-pointer flex items-center gap-1"
                    onClick={async () => {
                      setLoading(true);
                      let vendor = "shawarma_hub";
                      setOnOffer([]);
                      let dataToSend = { vendor };
                      try {
                        const response = await axios.post(
                          "/food/vendor",
                          dataToSend
                        );
                        if (response) {
                          setLoading(false);
                          setAllFood(response.data);
                          // console.log(response.data);
                        }
                      } catch (error) {
                        setLoading(false);
                        toast.error("Failed to find shawarma_hub");
                      }
                    }}
                  >
                    <GiCook />
                    shawarma_hub
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/*  */}
      </div>

      {/* wrapper */}

      <div className="mt-[1em]">
        {/* pagination */}
        {!searchText && (
          <nav className="flex justify-center">
            <ul className="flex gap-[2em] mt-[10px] px-[5px] py-[10px] items-center ">
              {/* map */}

              <>
                <li>
                  <a href="#" onClick={prevPage} className="text-zinc-800">
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Prev
                    </p>
                  </a>
                </li>
                <li className="flex gap-[10px] ">
                  {numbers.slice(start - 1, end).map((item, index) => (
                    <li
                      key={index}
                      className={`normal-nav ${
                        currentPage === item && "active-nav"
                      }`}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          handleClick(item);
                          changeCurrentPage(item);
                        }}
                      >
                        <p className="">{item}</p>
                      </a>
                    </li>
                  ))}
                </li>

                <li>
                  <a href="#" onClick={nextPage}>
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Next
                    </p>
                  </a>
                </li>
              </>
            </ul>
          </nav>
        )}
        {/* food */}
        <div>
          {searchText ? (
            <>
              <div className="mb-[15px] text-zinc-400">
                {searchText && <p>Results For : {searchText}</p>}
              </div>

              {searchedResults?.length > 0 ? (
                <div>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                    columnClassName="my-masonry-grid_column"
                  >
                    {searchedResults?.map((item) => (
                      <Link to={`/product/${item._id}`} key={item._id}>
                        <div key={item._id} className="flex-shrink-0 mb-3">
                          <div className="relative rounded-lg group ">
                            <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                              <div
                                className="bg-gradient-to-t
                                    from-transparent to-black opacity-75 w-full h-full rounded-md"
                              >
                                {/* top stats */}
                                <div>
                                  <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                    <div>
                                      <p className="text-white">
                                        #{item.vendor}
                                      </p>
                                    </div>
                                    <div className="flex gap-[20px]">
                                      <p className="text-white text-md flex items-center gap-[5px]">
                                        <AiOutlineLike className="text-lg" />
                                        <span>{item.likes?.length}</span>
                                      </p>
                                      <p className="text-white text-md flex items-center gap-[5px]">
                                        <AiOutlineComment className="text-lg" />
                                        <span>{item.comments?.length}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/*  */}
                              </div>
                            </div>

                            <img
                              src={item.image}
                              alt=""
                              className=" rounded-lg"
                            />

                            <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                              <p className="text-zinc-900 font-bold">
                                {item.title}
                              </p>
                              <p className="text-zinc-800">Ksh.{item.price}</p>
                            </div>
                          </div>
                          {/*  */}
                        </div>
                      </Link>
                    ))}
                  </Masonry>
                </div>
              ) : (
                <div className="w-full h-[65vh] flex justify-between items-center">
                  <p className="text-center w-full justify-center flex">
                    😥No results for :
                    <span className="text-red-600">{searchText}</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div className="mt-[8em]">
                  <Spinner message="Fetching ..." />
                </div>
              ) : (
                <>
                  {records.length < 1 ? (
                    <div className="mt-[4em] text-center">
                      <p>😥Nothing to show</p>
                    </div>
                  ) : (
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid "
                      columnClassName="my-masonry-grid_column"
                    >
                      {records?.map((item) => (
                        <Link to={`/product/${item._id}`} key={item._id}>
                          <div
                            key={item._id}
                            className="flex-shrink-0 mb-3 mt-6"
                          >
                            <div className="relative rounded-lg group ">
                              <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                                <div
                                  className="bg-gradient-to-t
                                from-transparent to-black opacity-75 w-full h-full rounded-md"
                                >
                                  {/* top stats */}
                                  <div>
                                    <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                      <div>
                                        <p className="text-white">
                                          #{item.vendor}
                                        </p>
                                      </div>
                                      <div className="flex gap-[20px]">
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineLike className="text-lg" />
                                          <span>{item.likes?.length}</span>
                                        </p>
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineComment className="text-lg" />
                                          <span>{item.comments?.length}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/*  */}
                                </div>
                              </div>

                              <img
                                src={item.image}
                                alt=""
                                className=" rounded-lg"
                              />

                              <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                                <p className="text-zinc-900 font-bold">
                                  {item.title}
                                </p>
                                <p className="text-zinc-800">
                                  Ksh.{item.price}
                                </p>
                              </div>
                            </div>
                            {/*  */}
                          </div>
                        </Link>
                      ))}
                    </Masonry>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
};

export default Food;
