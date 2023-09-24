import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const handleFetchOrders = async () => {
    try {
      setLoading(true);
      let username = user.username;
      let dataToSend = { username };
      const response = await axios.post("/orders/mine", dataToSend);
      if (response) {
        setLoading(false);
        setMyOrders(response.data);
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Error Fetching orders");
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);
  return (
    <div>
      {/* wrapper */}
      <div className=" pt-[1em] px-[10px] sm:px-[2em] md:px-[3em] lg:px-[5em]">
        {/* topbar */}
        <div>
          <Link to="/home">
            <AiOutlineArrowLeft className="3xl" />
          </Link>
        </div>

        {loading ? (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <Spinner message="Fetching your orders" />
          </div>
        ) : (
          <div>
            <h2 className="my-[2em] font-bold">Your Previous Orders</h2>
            <div>
              {myOrders.map((item) => (
                <div key={item._id} className="mb-[30px] bg-zinc-200">
                  {/* items ordered */}
                  <div className="mb-5">
                    {item?.product?.map((del) => (
                      <div key={del._id} className="mb-[20px] ">
                        <div className="flex gap-[20px] mb-[5px]">
                          <p>Vendor : {del.vendor}</p>
                          <p>Category : {del.category}</p>
                        </div>
                        <p className="mb-[5px] font-bold">{del.title}</p>
                        <img
                          src={del.image}
                          alt=""
                          className="h-[50px] object-contain mb-[5px]"
                        />
                        <div className="flex gap-[20px] items-center ">
                          <p>{del.newQuantity}pcs</p>
                          <p>Ksh. {del.newPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* user details */}
                  <div>
                    {/* <p>{item.newPhone}</p> */}
                    <div className="flex gap-[20px] flex-wrap items-center justify-between">
                      <p>{item.location}</p>
                      <p>{item.progress}</p>
                    </div>
                  </div>
                  <div className="text-orange-600 text-sm">
                    {moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
