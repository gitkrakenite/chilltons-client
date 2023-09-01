import React from "react";

import Food from "../components/Food";

const Home = () => {
  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar announcement */}
        <div className="bg-red-800 text-white p-1">
          <h2 className="text-center text-lg">Delivery from 8AM to 9PM</h2>
        </div>

        <div className=" px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-4">
          {/* food */}
          <div>
            <Food />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
