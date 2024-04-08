import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChangeTechSupport = () => {
  const [techSupportUsers, setTechSupportUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchData();
    fetchTechSupportUsers();
    console.log("fsdfaf");
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/tickets/all-tickets`);
      setTickets(res.data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchTechSupportUsers = async () => {
    try {
      const res = await axios.get("/api/v1/user/tech-support", {
        params: { role: "tech_support" },
      });
      setTechSupportUsers(res.data.users);
      console.log("techhh --", res.data.users);
    } catch (error) {
      console.error("Error fetching tech support users:", error);
    }
  };

  const handleUserSelection = (event, ticketId) => {
    const { value } = event.target;
    setSelectedUsers({ ...selectedUsers, [ticketId]: value });
  };

  const assignTechSupport = async (ticketId) => {
    try {
      const techSupportId = selectedUsers[ticketId];
      const techSupportName = techSupportUsers.find(
        (user) => user._id === techSupportId
      )?.name;
      const res = await axios.put(
        `/api/v1/tickets/assign-tech-support/${ticketId}`,
        {
          techSupport: techSupportId,
          techSupportName: techSupportName,
        }
      );
      console.log("assign tech support:", res.data.assignTechSupport);
      
      const updatedTickets = tickets.map((ticket) => {
        if (ticket._id === ticketId) {
          return {
            ...ticket,
            techSupport: res.data.assignTechSupport.techSupportName,
          };
        }
        return ticket;
      });
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error assigning tech support:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-center font-bold mb-4">Assign Tech Support</h2>
      <table className="table-auto w-full border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">Query</th>
            <th className="px-4 py-2 text-center">User</th>
            <th className="px-4 py-2 text-center">Available Tech Support</th>
            <th className="px-4 py-2 text-center">Tech Support</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-t border-gray-200">
              <td className="px-4 py-4 text-center truncate">{ticket.query}</td>
              <td className="px-4 py-4 text-center">{ticket.userName}</td>
              <td className="px-4 py-4 text-center">
                <select
                  value={selectedUsers[ticket._id] || ""}
                  onChange={(event) => handleUserSelection(event, ticket._id)}
                >
                  <option value="">Select...</option>
                  {techSupportUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-1 rounded ml-2"
                  onClick={() => assignTechSupport(ticket._id)}
                >
                  Assign
                </button>
              </td>
              <td className="px-4 py-4 text-center">
                {ticket.techSupportName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/dashboard">
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 m-2 rounded">
          Back
        </button>
      </Link>
    </div>
  );
};

export default ChangeTechSupport;
