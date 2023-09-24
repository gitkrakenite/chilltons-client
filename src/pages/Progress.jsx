import React, { useEffect, useState } from "react";
import Hello from "../assets/hello.png";
import { FiRefreshCcw } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Progress = () => {
  const location = useLocation();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dataFromPreviousPage = location?.state?.data;
    setUrl(dataFromPreviousPage);
  }, []);

  const [currentOrder, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchOrderStatus = async () => {
    try {
      setLoading(true);
      let currentId = { id: url.orderId };
      let dataToSend = currentId.id;

      let response = await axios.get("/orders/specific/" + dataToSend);
      if (response) {
        setLoading(false);
        setCurrentOrder(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Check Progress");
    }
  };

  return (
    <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[1em]">
      {/* wrapper */}
      <div>
        <Link to="/home">
          <AiOutlineArrowLeft className="text-2xl" />
        </Link>
        <div>
          <div>
            <h2 className="text-center mb-[1em] font-bold">Hello There</h2>

            <div className="flex justify-center">
              <img src={Hello} alt="" />
            </div>
          </div>
          <div>
            <p className="text-center mt-[1em]">We Have Seen Your Order</p>

            {console.log(currentOrder)}

            {currentOrder._id && (
              <>
                <div className=" mt-[1em]">
                  <p className="text-center">
                    To be delivered at {currentOrder.location}
                  </p>
                  <p className="text-center">
                    We will call you at {currentOrder.newPhone}
                  </p>
                </div>
              </>
            )}

            <p className="text-center mt-[1em]">
              Keep Pressing the icon below to check progress
            </p>
          </div>
        </div>
        {/*, received, preparing, shipping, rejected, delivered  */}

        <div className="mt-[2em] flex justify-evenly gap-[20px] items-center">
          <div>
            {loading ? (
              <Spinner message="checking progress" />
            ) : (
              <p className="text-red-600">
                {currentOrder.progress || "received"}
              </p>
            )}
          </div>

          {console.log(currentOrder)}

          {!loading && (
            <FiRefreshCcw
              className="text-2xl"
              onClick={handleFetchOrderStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
