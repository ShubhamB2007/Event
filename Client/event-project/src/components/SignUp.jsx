import React, {useState} from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

    
const SignUp = () => {
   
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
  })

  const navigate = useNavigate()

  const handleChange = ({currentTarget:input})=>{
      setData({...data, [input.name]:input.value})
  } 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:3000/api/signup";
        const userData = await axios.post(url, data);
        console.log("Sending user data", userData);
        navigate('/');
    } catch (error) {
        if (error.response) {
            console.log("Validation Error:", error.response.data.details);
        } else {
            console.log(error);
        }
    }
};


  return (
    <div className='w-full h-full flex justify-center'>
       <div className='flex flex-col gap-3 items-center absolute top-12 text-white'>
         <p className='font-bold text-3xl'>Sign Up</p>
         <p>Create your account</p>
       </div>
       <div className='w-[80%] h-80 top-36 absolute flex flex-col items-center gap-6'>
           <div className='border-sky-600 border-2 w-[85%] lg:w-[50%] h-16 rounded-full relative top-2 flex items-center'>
               <AiOutlineUser className='text-sky-600 text-2xl absolute left-4' />
               <input name='name' value={data.name} required onChange={handleChange} type="text" className='w-[80%] h-full absolute left-11 bg-transparent outline-none text-white pl-1' placeholder='Enter Your Username...' />
           </div>
           <div className='border-sky-600 border-2 w-[85%] lg:w-[50%] h-16 rounded-full relative top-2 flex items-center'>
               <MdOutlineEmail className='text-sky-600 text-2xl absolute left-4' />
               <input name='email' value={data.email} required onChange={handleChange} type="text" className='w-[80%] h-full absolute left-11 bg-transparent outline-none text-white pl-1' placeholder='Enter Your Email...' />
           </div>
           <div className='border-sky-600 border-2 w-[85%] lg:w-[50%] h-16 rounded-full relative top-2 flex items-center'>
               <RiLockPasswordLine className='text-sky-600 text-2xl absolute left-4' />
               <input name='password' value={data.password} required onChange={handleChange} type="password" className='w-[80%] h-full absolute left-11 bg-transparent outline-none text-white pl-1' placeholder='Enter Your Password...' />
           </div>
           <div className='border-sky-600 border-2 w-[85%] lg:w-[50%] h-16 rounded-full relative top-2 flex items-center'>
               <RiLockPasswordLine className='text-sky-600 text-2xl absolute left-4' />
               <input type="password" className='w-[80%] h-full absolute left-11 bg-transparent outline-none text-white pl-1' placeholder='Confirm Password...' />
           </div>
       </div>
       <button type='submit' onClick={handleSubmit} className='absolute top-[500px] w-56 h-12 text-white font-semibold bg-sky-600 rounded-lg'>Sign Up</button>
       <div className='flex gap-2 text-white absolute top-[570px]'>
          <p>Already have an account?</p>
          <Link to='/login'>
          <p className='text-sky-600 underline'>Log in</p>
          </Link>
       </div>
    </div>
  )
}

export default SignUp