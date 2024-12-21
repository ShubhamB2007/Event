import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDateRange } from "react-icons/md";

const Create = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    venue: "",
    category: "",
    price: "",
    capacity: "",
    email: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const defaultDate = new Date();
    const formattedDate = defaultDate.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const isValid = Object.values(eventData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [eventData]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
    setEventData({ ...eventData, date: e.target.value });
  };

  const handleIconClick = () => {
    const dateInput = document.querySelector(".date");
    if (dateInput) {
      dateInput.focus();
      dateInput.showPicker();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventData);
    try {
      const res = await axios.post(
        "https://event-w16s.onrender.com/api/events",
        eventData
      );
      console.log("Event Created", res.data);
      navigate("/organize-event");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="flex justify-center bg-[#151515] h-[820px]">
      <div className="w-[80%] h-[490px] absolute top-6 z-10 flex flex-col items-center gap-4 rounded-lg">
        <p className="text-white text-2xl font-bold absolute">Add an Event</p>
        <input
          onChange={handleChange}
          required
          name="name"
          type="text"
          className="border-2 border-sky-600 outline-none bg-transparent w-[80%] lg:w-[40%] h-12 rounded-lg pl-4 relative top-11 text-white font-semibold"
          placeholder="Enter Event Name"
        />
        <div className="border-2 border-sky-600 outline-none bg-transparent w-[40%] lg:w-[40%] lg:left-[370px] h-12 rounded-lg absolute top-28 left-9">
          <input
            onChange={handleChangeDate}
            required
            value={date}
            name="date"
            type="date"
            className="date absolute w-full h-full bg-transparent lg:pl-4 pl-2"
          />
          <MdDateRange
            onClick={handleIconClick}
            className="text-xl text-white absolute top-[13px] left-[110px] lg:left-[450px] cursor-pointer"
          />
        </div>
        <input
          onChange={handleChange}
          required
          name="venue"
          type="text"
          className="border-2 border-sky-600 outline-none bg-transparent w-[80%] h-12 lg:w-[40%] rounded-lg pl-4 relative top-28 font-semibold text-white"
          placeholder="Enter Venue"
        />
        <select
          onChange={handleChange}
          required
          name="category"
          className="border-2 border-sky-600 outline-none bg-transparent w-[80%] h-12 rounded-lg pl-4 lg:w-[40%] relative top-28 text-white font-semibold"
        >
          <option value="">Select Category</option>
          <option value="Concerts">Concerts</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Festivals">Festivals</option>
          <option value="Comedy">Comedy</option>
        </select>
        <input
          onChange={handleChange}
          required
          name="price"
          type="number"
          className="border-2 border-sky-600 outline-none bg-transparent w-[35%] lg:w-[17.5%] h-12 rounded-lg pl-4 absolute top-[305px] left-9 text-white lg:left-[370px]"
          placeholder="Enter Price"
        />
        <input
          onChange={handleChange}
          required
          name="capacity"
          type="number"
          className="border-2 border-sky-600 outline-none bg-transparent w-[40%] lg:w-[20%] h-12 rounded-lg pl-4 absolute top-[305px] left-[165px] lg:left-[613px] text-white"
          placeholder="Enter Capacity"
        />
        <input
          onChange={handleChange}
          required
          name="email"
          type="text"
          className="border-2 border-sky-600 outline-none bg-transparent w-[80%] h-12 rounded-lg pl-4 relative top-44 text-white font-semibold lg:w-[40%]"
          placeholder="Enter Your Email"
        />
        <p className="text-white absolute left-9 lg:left-[370px] font-semibold top-[430px]">
          Enter Image URL:
        </p>
        <input
          onChange={handleChange}
          required
          name="image"
          type="text"
          className="border-sky-600 lg:w-[40%] absolute w-[80%] h-12 outline-none pl-4 border-2 rounded-lg top-[460px] bg-transparent text-white"
        />
        <textarea
          onChange={handleChange}
          required
          name="description"
          placeholder="Enter Description"
          className="w-[80%] lg:w-[40%] h-32 bg-transparent border-sky-500 border-2 outline-none p-4 absolute top-[520px] text-white rounded-lg text-sm"
        ></textarea>
        <button
          className={`text-white w-36 h-10 hover:bg-sky-700 hover:duration-200 font-semibold absolute rounded-lg top-[670px] ${
            isFormValid ? "bg-sky-600" : "bg-gray-600 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Create;
