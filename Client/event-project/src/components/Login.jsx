import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const url = "https://event-w16s.onrender.com/api/login"
      const res = await axios.post(url, data)
      console.log(res.message)
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
        // navigate('/')
      } else{
        console.log("token not found")
        }
     
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    <div className="w-full h-full absolute flex justify-center">
      <div className="flex flex-col items-center">
        <p className="text-white font-bold text-4xl absolute top-24">
          Welcome Back
        </p>
        <p className="text-white font-semibold absolute top-36">
          Enter details to login into your account
        </p>
      </div>

      <div className="w-[80%] lg:w-[45%] h-80 top-52 absolute flex flex-col items-center gap-6">
        <div className="border-sky-600 border-2 w-[85%] h-16 rounded-full relative top-2 flex items-center">
          <MdOutlineEmail className="text-sky-600 text-2xl absolute left-4" />
          <input
            name="email"
            value={data.email}
            required
            onChange={handleChange}
            type="text"
            className="w-[80%] h-full absolute left-11 bg-transparent outline-none text-white pl-1"
            placeholder="Enter Your Username..."
          />
        </div>
        <div className="border-sky-600 border-2 w-[85%] h-16 rounded-full relative top-2 flex items-center">
          <RiLockPasswordLine className="text-sky-600 text-2xl absolute left-4" />
          <input
            name="password"
            value={data.password}
            required
            onChange={handleChange}
            type="password"
            className="w-[80%] lg:w-[45%] h-full absolute left-11 bg-transparent outline-none text-white pl-1"
            placeholder="Enter Your Password..."
          />
        </div>
      </div>
       <button type="submit" onClick={handleSubmit} className="text-white w-48 h-12 bg-sky-600 rounded-lg absolute top-[420px]">Login Now</button>
       <div className="flex justify-center gap-2 text-white absolute top-[500px]">
        <p>Don't have an account?</p>
        <Link to='/signup'>
        <p className="text-sky-600 underline">Create account</p>
        </Link>
       </div>
    </div>
  );
};

export default Login;
