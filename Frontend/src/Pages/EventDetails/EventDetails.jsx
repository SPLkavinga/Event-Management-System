import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../EventDetails/Tablecss/Table.css";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/event");
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading events...</div>;
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen  ">
      <div className="h-full max-w-6xl p-4 mx-auto">
      <div className="flex flex-col md:flex-row justify-end mt-4 space-x-0 md:space-x-2">

<button
    className="px-4 py-2 mb-2 text-white transition bg-black border border-white rounded-md hover:bg-gray-800"
    onClick={() => navigate("/ADDCustomerForm")}
>
    Add Customers
</button>

<button
    className="px-4 py-2 mb-2 text-white transition bg-black border border-white rounded-md hover:bg-gray-800"
    onClick={() => navigate("/showCustomer")}
>
    View Customers
</button>

<button
    className="px-4 py-2 mb-2 text-white transition bg-black border border-white rounded-md hover:bg-gray-800"
    onClick={() => navigate("/event")}
>
    Add Event
</button>

<button
    className="px-4 py-2 mb-2 text-white transition bg-black border border-white rounded-md hover:bg-gray-800"
    onClick={() => navigate("/QRCodeScanner")}
>
    Scan Tickets
</button>
</div>

        <h2 className="pt-10 mb-4 text-2xl font-bold text-center">
          Event List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300 rounded-lg shadow-lg responsive-table">
            <thead className="text-black bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300">Event Name</th>
                <th className="p-2 border border-gray-300">Description</th>
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Time</th>
                <th className="p-2 border border-gray-300">Venue</th>
                <th className="p-2 border border-gray-300">Ticket Price</th>
                <th className="p-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="transition-colors duration-200 hover:bg-[#1E1E1E]"
                  >
                    <td
                      className="p-4 font-bold text-center text-yellow-600 border border-gray-300"
                      data-label="Event Name"
                    >
                      {event.event_name}
                    </td>
                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Description"
                    >
                      {event.description}
                    </td>
                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Date"
                    >
                      {new Date(event.event_date).toISOString().split("T")[0]}
                    </td>

                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Time"
                    >
                      {event.event_time}
                    </td>
                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Venue"
                    >
                      {event.venue}
                    </td>
                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Ticket Price"
                    >
                      {event.ticketprice}
                    </td>
                    <td
                      className="p-4 text-center border border-gray-300"
                      data-label="Action"
                    >
                      <button
                        className="px-4 py-1 text-white transition bg-black rounded-md hover:bg-gray-800"
                        onClick={() => handleBuyTicket(event)}
                      >
                        Buy Ticket
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center border border-gray-300"
                  >
                    No events available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function handleBuyTicket(event) {
    // Navigate to the BuyTicket page with event details
    navigate("/buyticket", { state: event });
  }

  function handleScanTicket() {
    // Implement your scan ticket logic here
    console.log("Scanning tickets...");
    // You might want to navigate to a different page or show a modal, etc.
  }
};

export default EventDetails;
