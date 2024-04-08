import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state?.auth?.user);
  const [tickets, setTickets] = useState([]);
  const { createdBy, role } = user;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/tickets/get-all-tickets/${createdBy}`, {
        headers: {
          role: role,
        }
      });

      setTickets(res.data.tickets);
    } catch (error) {
      console.log("error in dashboard:", error);
    }
  };

  const handleClick = () => {
    navigate("/create-ticket");
  };

  const handleView = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Tickets</h4>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Query</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket._id} className="border-t border-gray-200">
                    <td className="px-4 py-4 truncate text-center">
                      {ticket.query.length > 10
                        ? `${ticket.query.substring(0, 15)}...`
                        : ticket.query}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleView(ticket._id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-center" colSpan="3">
                    No tickets found.{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {role === 'user' && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Create Ticket
          </button>
        )}
        {user?.role === "admin" && (
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/dashboard/tech-support')}
          >
            Assign Tech Support
          </button>
        )}
      </div>
    </div>
  );

};

export default Dashboard;
