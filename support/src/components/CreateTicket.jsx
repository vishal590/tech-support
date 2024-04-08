import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../app/features/ticketSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateTicket = () => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
    const {user} = useSelector(state => state?.auth)
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log('user,', user)
    console.log('query,', query)


    if (!query.trim()) {
      toast.error("Please enter you query");
      return;
    }

    // const formData = new FormData();
    // for (let [key, value] of formData.entries()) { 
    //     console.log(key, value);
    //    }     
    // if(query) formData.append('query', query);
    // console.log("formData",formData)
    // if(file){
    //     formData.append('file', file);
    // }
    // if(user?.createdBy) formData.append('createdBy', user?.createdBy);

    // console.log('user?._id', user?.createdBy);

    // const ticketData = {
    //   query,
    //   file,
    //   createdBy: user?.createdBy,
    // };

    const ticketData = {
        query,
        createdBy: user?.createdBy,
        userName: user?.name
      };

    // console.log("formData:", formData);
    

    try{
        const res = await axios.post('/api/v1/tickets/create-tickets', ticketData);

        // const res = await axios.post('/api/v1/tickets/create-tickets', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   });
      


        if(res.data.success){
            console.log(res.data.message);
            // dispatch(addTicket({query, file, createdBy: user?._id}));
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }catch(error){
        console.log('Error in Create ticket:', error);
        toast.error('Something went wrong');
    }

    setQuery('');
    setFile(null);

  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('selectedFile', selectedFile)
    setFile(selectedFile);
  };

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-500">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="query" className="font-semibold mb-2">
            Query:
          </label>
          <textarea
            id="query"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="w-full h-40 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="font-semibold mb-2">
            Optional File Attachment:
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <Link to="/dashboard">
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
              Back
            </button>
          </Link>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
