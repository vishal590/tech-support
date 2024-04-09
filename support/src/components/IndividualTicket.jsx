import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addMessages, setMessages } from "../app/features/ticketSlice";

const IndividualTicket = () => {
  const params = useParams();
  const paramsId = params?.id;
  //   console.log("paramsId:", paramsId);
  const [ticket, setTicket] = useState([]);
  const { role, createdBy, name } = useSelector((state) => state?.auth?.user);
  const users = useSelector((state) => state?.auth?.user);
  const [reply, setReply] = useState("");
  // const [messages, setMessages] = useState([]);
  const messages = useSelector((state) => state?.tickets?.messages);
  const dispatch = useDispatch();

  console.log(messages, "messagesss -");
  const fetchTicket = async () => {
    try {
      const res = await axios.get(`/api/v1/tickets/get-tickets/${paramsId}`);
      console.log(res.data.ticket, "res.data.ticket");
      setTicket(res.data.ticket);
      //   setMessages(res?.data?.messagesArray || []);
      console.log(res?.data?.ticket, 'messages in array')
      dispatch(setMessages(res.data?.ticket?.messages || []));
    } catch (error) {
      console.log("error in dashboard:", error);
    }
  };
  useEffect(() => {
    fetchTicket();
  }, []);

  const handleComplete = async () => {
    try {
      const res = await axios.put(`/api/v1/tickets/update-status/${paramsId}`, {
        status: "complete",
      });
      console.log("res.data.ticket:", res.data.ticket);

      toast.success(res?.data?.message);
    } catch (error) {
      console.log("error in status complete:", error);
      toast.error(res?.data?.message);
    }
  };

  const handleSend = async () => {
    try {
      const res = await axios.post(`/api/v1/tickets/send-message/${paramsId}`, {
        message: reply,
        sender: createdBy,
        userName: name,
      });
      toast.success(res?.data?.message);
      // const message = res?.data?.messagesArray
      // setMessages(prevMessages => [...prevMessages, message?.[message?.length - 1]])

      dispatch(addMessages(res?.data?.messagesArray));

      // setMessages([...messages, message])
      console.log("messesage in handleSend:", res?.data?.messagesArray);
      setReply("");
    } catch (error) {
      console.log("error in sedning message:", error);
    }
  };

  // const renderFile = (file) => {
  //   if(file.endsWith('.pdf')){
  //     return <PDFViewer file={file} />
  //   }else if (file.endsWith(".docx") || file.endsWith(".doc")) {
  //     return <DocumentViewer file={file} />;
  //   } else if (file.match(/\.(jpg|png)$/)) {
  //     return (
  //       <div className="w-1/4">
  //         <img
  //           src={`http://localhost:8080/${ticket?.file?.replace(/\\/g, "/")}`}
  //           alt="Images"
  //           className="w-full"
  //         />
  //       </div>
  //     );
  //   } else {
  //     return <div>File type not supported</div>;
  //   }
  // }

  const renderFile = (file) => {
    if (!file) {
      return <div>File not found</div>;
    }else if (file.match(/\.(jpg|png)$/)) {
      return (
        <div className="w-1/4">
          <img
            src={`http://localhost:8080/${file.replace(/\\/g, "/")}`}
            alt="Images"
            className="w-full"
          />
        </div>
      );
    } else {
      return <div>File type not supported</div>;
    }
  }
  
  const handleKeyPress = (e) => {
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-5/6 mx-4">
        <h2 className="text-xl font-bold mb-4 text-blue-500">Ticket Details</h2>
        <div className="w-full flex justify-between">
          <div className="w-1/2 mr-2">
            <div className="flex flex-col mb-4">
              <label htmlFor="query" className="font-semibold mb-2">
                Query:
              </label>
              <textarea
                id="query"
                name="query"
                value={ticket?.query}
                className="w-full h-40 border border-gray-300 rounded-md p-2"
                disabled={true}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="file" className="font-semibold mb-2">
                Attached File:
              </label>
              {renderFile(ticket?.file)}
            </div>

          </div>
          <div className="w-1/2 flex flex-col mr-2">
            {role !== "user" && (
              <div className="flex flex-col mb-4">
                <label htmlFor="techSupport" className="font-semibold mb-2">
                  Tech Support:
                </label>
                <textarea
                  id="techSupport"
                  name="techSupport"
                  className="w-full h-40 border border-gray-300 rounded-md p-2  text-blue-900 mb-2"
                  disabled={role === "tech_support"}
                  value={messages
                    .map(
                      (message) => `${message.userName}: ${message.content}\n`
                    )
                    .join("")}
                />
              </div>
            )}
            {role === "user" && (
              <div className="flex flex-col mb-4">
                <label htmlFor="user" className="font-semibold mb-2">
                  User:
                </label>
                <textarea
                  id="user"
                  name="user"
                  className="w-full h-40 border border-gray-300 rounded-md p-2  text-blue-900 mb-2"
                  disabled={role === "user"}
                  value={messages.map(message => `${message.userName}: ${message.content}\n`).join('')}
                  onChange={handleKeyPress}
                />
              </div>
            )}
            <div className="flex flex-col mb-4">
              <label htmlFor="reply" className="font-semibold mb-2">
                Reply:
              </label>
              <textarea
                id="reply"
                name="reply"
                className="w-full h-40 border border-gray-300 rounded-md p-2"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <Link to="/dashboard">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
                    Back
                  </button>
                </Link>
                <button
                  className={` text-white font-bold py-2 px-4 rounded mr-2 ${
                    ticket?.status === "complete"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  onClick={handleComplete}
                  disabled={ticket?.status === "complete"}
                >
                  Complete
                </button>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTicket;
