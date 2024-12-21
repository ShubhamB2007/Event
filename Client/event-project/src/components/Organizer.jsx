import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { fetchEvents } from '../services/eventService';
import { useState, useEffect } from 'react';

const Organizer = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
          const data = await fetchEvents();
          setEvents(data);
      } catch (error) { 
          console.error("Error fetching events:", error.message);
      }   
  };
  loadEvents()
  }, [])

  const navigate = useNavigate() 
  return (
    <div className='absolute w-full h-[1100px] bg-[#151515] flex justify-center'>
        <button className='bg-sky-500 font-semibold w-40 h-12 text-white rounded-lg absolute top-10' onClick={()=>navigate('/create-event')}>Create New Event</button>
        <div className='w-full lg:w-[1280px] absolute top-28 min-h-[600px] justify-center gap-3 lg:grid lg:grid-cols-3 grid grid-cols-2 ml-10'>
            <p className='text-2xl absolute top-2 text-white font-bold left-9'>Created Events:</p>    
            { events.filter(event=> event.email).map((item,index)=>(
            <div onClick={()=>navigate('/event-detail', {state:{event:item}})} key={index} className=' w-[75%] lg:h-72 h-56 border relative top-16 lg:left-20 rounded-lg'>
                <img src={item.image} alt="" className='w-full h-full object-cover rounded-lg' />
                <div className='w-24 h-8 rounded-lg bg-sky-600 text-white font-semibold absolute top-2 left-4 flex justify-center items-center'>{item.category}</div>
                <div className='text-white absolute top-40 left-2 lg:left-6 lg:top-56'>
                   <p className='text-sm font-bold lg:text-xl'>{item.name}</p>
                   <p className='text-sm lg:text-base'>{item.date}</p>
                </div>
                <MdEdit className='text-white text-2xl absolute top-40 left font-bold left-64 lg:left-64 lg:top-60 cursor-pointer' />
            </div>
            ))}
        </div>
    </div>
  )
}

export default Organizer