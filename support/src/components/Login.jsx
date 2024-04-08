import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try{
      const res = await axios.post('/api/v1/user/login', formData);

      if(res?.data?.success) {
        // console.log('try login successfull:',res.data.message)
        const user = res?.data?.user
        console.log('user login  -----:', user)
        toast.success(res.data.message);
        dispatch(login({createdBy: user?._id, name: user?.name, email: user?.email, role: user?.role}))
        navigate('/dashboard');
      }else{
        console.log('error in login details:', res.data.message)
        toast.error(res.data.message);
      }
    }catch(error){
      if (error.response) {
       
        const { status, data } = error.response;
        if (status === 404) {
          toast.error("Registration endpoint not found");
        } else {
          toast.error(`Server error: ${status} - ${data.message}`);
        }
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        console.log('errorro')
        toast.error("Error occurred while sending request");
      }

      // console.log('error:', error);
      // toast.error('Something went wrong')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"> 
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      <div className="flex items-center justify-between mb-4"> 
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-full rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </div>
      <div className="text-sm">
      <p>
        Not registered?{" "}
        <Link to="/" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
    </form>
    
  </div>
  );
};

export default Login;
