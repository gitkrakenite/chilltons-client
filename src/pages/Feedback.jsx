import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "../components/Spinner";

const Feedback = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //handle create feedback
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      if (!category || !message) {
        return toast.error("Either category or message missing");
      }
      if (!user) {
        return toast.error("You must be a signed in user");
      }

      setLoading(true);
      let sender = user.username;
      const dataToSend = { sender, category, message };
      const response = await axios.post("/feedback/create", dataToSend);
      if (response) {
        setLoading(false);
        navigate("/home");
        toast.success("Feedback sent");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error sending feedback");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[2em]">
        {/* topbar */}
        <div>
          <Link to="/home">
            <AiOutlineArrowLeft className="text-3xl" />
          </Link>
        </div>
        {/*  */}
        <div>
          <h2 className="mt-2">
            Hello {user.username} we appreciate your feedback
          </h2>
          <div className="mt-[2em]">
            <form
              className=" w-[98%] sm:w-[80%]  md:w-[70%]  lg:w-[60%] xl:w-[50%] m-auto"
              onSubmit={handleCreate}
            >
              <div className="flex flex-col gap-[10px] mb-[20px]">
                <label htmlFor="category">
                  What best describes your feedback ?
                </label>
                <select
                  name="category"
                  id="category"
                  className="p-2 border border-zinc-400 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="complement">Complement</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-[10px] mb-[20px]">
                <label htmlFor="message">We'd like to here more from you</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="2"
                  placeholder="enter your message"
                  className="p-2 border border-zinc-400 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={100}
                  minLength={5}
                ></textarea>
              </div>
              <div>
                {loading ? (
                  <div>
                    <Spinner message="Sending..." />
                  </div>
                ) : (
                  <button
                    className="bg-red-600 text-white rounded-md p-2 w-full"
                    onClick={handleCreate}
                  >
                    Send Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
