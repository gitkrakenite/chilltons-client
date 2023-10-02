import React, { useEffect, useRef, useState } from "react";
import Hello from "../assets/hello.png";
import { FiRefreshCcw } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
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

  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      // You can also display a success message or perform any other action after copying.
      toast.success("Copied To Clipboard");
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

            <p className="text-center">Total : Items + delivery + container</p>

            {/* {console.log(currentOrder)} */}

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
          </div>
        </div>

        {/*  */}
        <div>
          <div className="flex justify-center gap-[20px] mt-[20px] ">
            <input
              type="text"
              ref={textRef}
              value={`0798556471`}
              readOnly
              className="bg-transparent outline-none text-red-600"
            />
            <button onClick={handleCopy}>
              <MdOutlineContentCopy
                className="text-3xl"
                title="Click To Copy"
              />
            </button>
          </div>
        </div>
        {/*  */}

        {/*, received, preparing, shipping, rejected, delivered  */}
        <p className="text-center mt-[1em]">
          Keep Pressing the icon below to check progress
        </p>

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

          {/* {console.log(currentOrder)} */}

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
