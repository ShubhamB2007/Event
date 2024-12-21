import React, { useState, useEffect } from 'react';
import { SlCalender } from "react-icons/sl";
import { FaAngleLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ticketData, setTicketData] = useState({});

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setTicketData({
      name: event.name,
      price: event.price,
      quantity,
      totalPrice: quantity * event.price,
      eventId: event._id,
      image: event.image,
    });
  }; 

  useEffect(() => {
    window.scrollTo({top:0, behavior:'smooth'})
  }, [])
  

  const handleBookNow = async () => {
    const ticketData = {
      name: event.name,
      price: event.price,
      quantity,
      totalPrice: quantity * event.price,
      eventId: event._id,
      image: event.image,
    };
  
    console.log("Final Ticket Data:", ticketData);
    try {
      const res = await axios.post('https://event-w16s.onrender.com/api/events/booking', ticketData);
      console.log("Booking Done:", res.data);
      navigate('/booking-list');
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className='w-full h-full absolute flex justify-center'>
      <div className='w-full h-96 absolute lg:h-full lg:w-[50%] lg:left-0'>
        <img src={event.image} alt="" className='absolute w-full h-full object-cover' />
      </div>

      <FaAngleLeft onClick={() => navigate('/')} className='text-black cursor-pointer text-2xl font-bold x-10 absolute top-4 left-4' />

      <div className='border w-full min-h-96 absolute top-96 lg:h-full lg:w-[50%] lg:left-[50%] lg:top-0 lg:border-l-4'>
        <button onClick={() => setShow(true)} className='w-32 h-8 text-white bg-sky-500 rounded-lg absolute top-5 left-60 lg:left-[585px]'>Book Now</button>
        <p className='text-2xl font-bold text-white absolute top-5 left-7'>{event.name}</p>
        <div className='text-white w-44 absolute top-16 left-5 min-h-[56px] flex items-center'>
          <SlCalender className='text-3xl font-bold absolute left-3' />
          <p className='absolute top-1 left-[56px] text-gray-300'>{event.date}</p>
          <p className='relative top-2 left-[56px] text-xs text-gray-300'>
             {event.venue?.name || "Venue not available"}
           </p>
        </div>
        <p className='text-gray-300 text-sm absolute top-20 left-60 lg:left-[585px]'>11:00 AM - 9:00 PM</p>

        <div className='w-full absolute top-32 h-56'>
          <p className='absolute text-white font-bold text-2xl top-3 left-7'>About</p>
          <div className='w-[87%] h-44 absolute top-12 left-7 overflow-hidden'>
            <p className='text-gray-300 text-sm text-ellipsis'>{event.description}</p>
          </div>
        </div>
      </div>

      {show &&
        <div className='w-[85%] lg:w-[30%] lg:top-64 h-32 bg-black rounded-lg absolute top-52 text-white'>
          <p className='text-lg absolute top-3 left-6'>Ticket Price:</p>
          <p className='font-bold text-sky-500 absolute top-4 left-32'>{event.price}</p>
          <p className='absolute top-4 left-44 lg:left-64'>Ticket Quantity:</p>
          <select
            onChange={handleQuantityChange}
            className='bg-black border rounded-lg w-12 absolute left-72 lg:left-[370px] top-4'
            value={quantity}
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} className='bg-black text-white' value={num}>{num}</option>
            ))}
          </select>
          <div className='flex gap-2 absolute top-[55px] text-lg left-6'>
            <p>Total Amount:</p>
            <p className='font-bold text-sky-500'>{event.price * quantity}</p>
          </div>
          <button
            onClick={handleBookNow}
            className='text-white font-bold bg-sky-500 w-32 h-7 rounded-lg absolute lg:left-[270px] top-[55px] left-52'
          >
            Book Now
          </button>
          <button
            onClick={() => setShow(false)}
            className='bg-red-600 w-20 h-6 text-sm rounded-lg absolute left-[40%] top-24'
          >
            Cancel
          </button>
        </div>
      }
    </div>
  );
};

export default EventDetail;
