import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../app/features/authSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state?.auth)
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    try{
      const res = await axios.post('/api/v1/user/register', formData);

      if(res.data.success) {
        const user = res?.data?.newUser;
        toast.success(res.data.message);
      }else{
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
        toast.error("Error occurred while sending request");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"> 
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4"> {/* Added margin bottom */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="text-sm">
          <p>
            Already registered?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        </form>
        
      </div>
   
    </>
    
  );
};

export default Register;
