import React from 'react' 
import {fetchEvents} from '../services/eventService'
import { FaAngleLeft } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
 
const Events = () => { 

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
  const location = useLocation()
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState(events)
  const selectedcategory = location.state?.category || '';
+
  useEffect(() => {
     if(selectedcategory){
      setFilteredEvents(events.filter(event => event.category.toLowerCase() === selectedcategory.toLowerCase()))
     } else {
       setFilteredEvents(events)
     }
  }, [selectedcategory,events])
  

  return (
    <div className='w-full h-[1100px] bg-[#151515] absolute'>
       <FaAngleLeft onClick={()=>navigate('/')} className='absolute text-white text-3xl left-5 top-5' />
       <p className='font-bold text-white text-2xl absolute left-16 top-5'>All Events</p>
       <div className='w-full lg:w-[1150px] top-20 lg:left-44 absolute h-[600px] grid grid-cols-2 lg:grid-cols-3 gap-y-3'>
        {filteredEvents.map((event,index)=>(
        <div onClick={()=>navigate("/event-detail", {state:{event}})} key={index} className='cursor-pointer w-44 lg:w-80 lg:h-72 h-52 border rounded-lg relative top-2 left-2'>
          <img src={event.image} alt="" className='rounded-lg w-full h-full object-cover brightness-90' />
          <div className='w-16 h-6 absolute text-white bg-sky-600 rounded-lg text-xs flex justify-center items-center font-bold top-1 left-2'>{event.category}</div>
          <GrFavorite className='text-white text-xl font-bold absolute top-2 left-[80%] lg:left-[90%]' />
          <div className='text-white flex flex-col absolute top-[155px] lg:top-56 left-2'>
           <p className='font-bold lg:text-xl'>{event.name}</p>
           <p className='text-sm'>{event.date}</p>
          </div>
       </div>
       ))} 
      </div>
    </div>
  )
}

export default Events