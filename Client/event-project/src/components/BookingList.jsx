import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


const BookingList = () => {
  
  const navigate = useNavigate()
  const [list, setList] = useState([])
    
  useEffect(() => {
    const loadList = async()=>{
    try {
      const res = await axios.get("https://event-w16s.onrender.com/api/events/booking")
      console.log(res.data)
      setList(res.data)
    } catch (error) {
      console.log(error.message)
    }}
    loadList(); 
  }, [])

  const handleDelete = async(id)=>{
   try {
    const res = await axios.delete(`https://event-w16s.onrender.com/api/events/booking/${id}`)
    console.log(res.data)
    setList((prevList) => prevList.filter((item) => item._id !== id));
   } catch (error) {
    console.log(error)
   }
  }

  return ( 
    <div className='w-full h-full absolute flex flex-col items-center gap-5'>
        <p className='text-2xl font-bold text-white absolute top-5'>Your Booking List</p>
        <FaAngleLeft onClick={()=>navigate('/')} className='text-white absolute top-7 left-5 text-2xl cursor-pointer' />
        {list.map((item,index)=>(
         <div key={index} className='w-[80%] lg:w-[40%] h-[110px] bg-sky-600 rounded-lg relative top-20 flex items-center'>
           <div className='w-20 h-24 border absolute left-2 rounded-lg'>
           <img src={item.image} alt=""  className='w-full h-full object-cover rounded-lg'/>  
           </div>
           <p className='text-white font-bold absolute top-3 left-[102px] text-xl'>{item.name}</p>
           <p className='text-white absolute left-[102px]'>Tickets: {item.tickets}</p>
           <p className='text-white absolute top-[70px] left-[102px]'>Status:</p>
           <p className='text-red-400 absolute top-[70px] left-[156px]'>Pending</p>
           <MdDelete onClick={()=>handleDelete(item._id)} className='lg:text-3xl text-white absolute lg:top-9 top-16 cursor-pointer left-[87%] lg:left-[90%] text-2xl' />
        </div>
        ))}
    </div>
  )
}

export default BookingList
