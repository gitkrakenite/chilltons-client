import React, { useEffect, useState } from "react";
import Hello from "../assets/hello.png";
import { FiRefreshCcw } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Progress = () => {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const dataFromPreviousPage = location?.state?.data;
    setUrl(dataFromPreviousPage);
  }, []);

  return (
    <div className="px-[5em] pt-[1em]">
      {/* wrapper */}
      <div>
        <Link to="/home">
          <AiOutlineArrowLeft className="text-2xl" />
        </Link>
        <div>
          <div>
            <h2 className="text-center mb-[1em] font-bold">
              Hello There {url}
            </h2>
            <div className="flex justify-center">
              <img src={Hello} alt="" />
            </div>
          </div>
          <div>
            <p className="text-center mt-[1em]">
              Thank You For Ordering From Us
            </p>
          </div>
        </div>
        {/*, received, preparing, shipping, rejected, delivered  */}
        <div className="mt-[2em] flex justify-evenly items-center">
          <div>Current Stage : sent</div>
          <FiRefreshCcw className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Progress;
