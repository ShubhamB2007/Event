import React, { useContext } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdTheaterComedy } from "react-icons/md";
import { MdFestival } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import {fetchEvents} from '../services/eventService'
import { useState,useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';

const Home = () => {

  const { searchQuery ,setSearchQuery, currentTime } = useContext(SearchContext)

  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadEvents = async () => {
      try {
          const data = await fetchEvents(searchQuery);
          setEvents(data);
      } catch (error) {
          console.error("Error fetching events:", error.message);
      }  
  };
  loadEvents()
  }, [searchQuery])
  

  const categories = [
    { name: "Concerts", icon: <IoIosMusicalNotes className='text-sky-500 text-3xl' /> },
    { name: "Movies", icon: <BiSolidMoviePlay className='text-sky-500 text-3xl' /> },
    { name: "Sports", icon: <MdOutlineSportsSoccer className='text-sky-500 text-3xl' /> },
    { name: "Festivals", icon: <MdFestival className='text-sky-500 text-3xl' /> },
    { name: "Comedy", icon: <MdTheaterComedy className='text-sky-500 text-3xl' /> },
  ];


  const goToEvents = (category = '')=>{
        navigate('/events', {state:{category}})
  }

  return ( 
    <div className='w-full h-[1200px] lg:h-[1700px] bg-[#151515] flex justify-center'>
        <p className='text-white font-bold absolute left-7 top-4'>{currentTime}</p>
        <div className='w-[85%] lg:w-[55%] border-sky-500 border-2 h-16 absolute top-20 rounded-lg flex items-center'>
          <IoSearch className='text-white text-2xl absolute left-4' />
           <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" className='absolute left-12 w-64 h-full bg-transparent pl-2 text-white font-semibold outline-none' placeholder='Search For Events...' />
        </div>
 
        <button onClick={()=>navigate('/organize-event')} className='absolute top-3 left-[203px] w-48 h-8 bg-sky-500 text-xs text-white font-bold rounded-lg'>Event Organizer? Click Here.</button>

        <div className='w-full h-36 absolute top-40 lg:left-[34%]'>
            <p className='text-2xl font-bold text-white absolute left-8 lg:left-36 top-2'>Categories</p>
            <div className='w-[87%] h-24 absolute top-11 left-7 flex gap-2'>
              {categories.map((item,index)=>(
               <div key={index} onClick={()=>goToEvents(item.name)} className='cursor-pointer w-16 h-16 rounded-lg relative top-2 bg-gray-700 flex justify-center items-center'>
                  {item.icon}
                  <p className='text-white absolute top-[66px] font-semibold text-xs'>{item.name}</p>
               </div>
               ))}
            </div>
        </div>

        <div className='absolute w-full min-h-[450px] top-[310px] flex justify-center'>
           <div className='w-[85%] lg:w-[50%] flex justify-between absolute top-4'>
              <p className='text-white font-bold text-2xl'>Events For You</p>
              <FaAngleRight onClick={()=>goToEvents()} className='text-white font-semibold text-3xl' />
              <div className='w-full min-h-[388px] absolute top-11 lg:left-4 grid grid-cols-2 gap-x-1 gap-y-2 lg:gap-x-0 lg:gap-y-4'>
                {events.map((item,index)=>(
                <div onClick={()=>navigate('event-detail',{state:{event:item}})} key={index} className='cursor-pointer w-40 lg:w-80 h-44 lg:h-72 border rounded-lg relative'>
                <img src={item.image} alt="" className='rounded-lg w-full h-full object-cover brightness-90' />
                <div className='w-16 h-6 absolute text-white bg-sky-600 rounded-lg text-xs flex justify-center items-center font-bold top-1 left-2'>{item.category}</div>
                <GrFavorite className='text-white text-xl font-bold absolute top-2 left-[80%] lg:left-[90%]' />
                <div className='text-white flex flex-col absolute top-32 lg:top-56 left-2'>
                  <p className='font-bold lg:text-xl'>{item.name}</p>
                  <p className='text-sm'>{item.date}</p>
                </div>
             </div>
                ))}
              </div>
           </div>
        </div>
    </div>
  )
}

export default Home