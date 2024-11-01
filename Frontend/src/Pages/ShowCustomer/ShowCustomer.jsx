import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../EventDetails/Tablecss/Table.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EventDetails = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState({ nic: "", new_nic: "", name: "", contact_number: "", email: "" });

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getcustomer");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (customerNic) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deletecustomer/${customerNic}`);
      if (response.status === 200) {
        setCustomers(customers.filter((customer) => customer.nic !== customerNic));
      } else {
        console.warn("Failed to delete customer:", response.data);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditClick = (customer) => {
    setIsEditing(true);
    setEditCustomer({ nic: customer.nic, new_nic: customer.nic, name: customer.name, contact_number: customer.contact_number, email: customer.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { nic, new_nic, name, contact_number, email } = editCustomer; // Destructure the editCustomer object

    try {
      const response = await axios.put(`http://localhost:5000/updatecustomer/${nic}`, { new_nic, name, contact_number, email });

      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.nic === nic ? { ...customer, nic: new_nic, name, contact_number, email } : customer
          )
        );
        console.log("Customer updated successfully:", response.data);
        setIsEditing(false); // Close the editing form
        setEditCustomer({ nic: "", new_nic: "", name: "", contact_number: "", email: "" }); // Reset the form fields
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading customers...</div>;
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="p-4">
        <button
          className="w-10 h-10 bg-white rounded-full lg:w-12 lg:h-12 border-black text-black hover:bg-black hover:text-white hover:border hover:border-white"
          onClick={() => navigate(-1)} // Use the navigate function
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      
      <div className="h-full max-w-6xl p-4 mx-auto">
        <h2 className="pt-10 mb-4 text-2xl font-bold text-center">Customer Details</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300 rounded-lg shadow-lg responsive-table">
            <thead className="text-black bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300">Customer Name</th>
                <th className="p-2 border border-gray-300">NIC</th>
                <th className="p-2 border border-gray-300">Contact No</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.nic} className="transition-colors duration-200 hover:bg-[#1E1E1E]">
                    <td className="p-4 font-bold text-center text-yellow-600 border border-gray-300">{customer.name}</td>
                    <td className="p-4 text-center border border-gray-300">{customer.nic}</td>
                    <td className="p-4 text-center border border-gray-300">{customer.contact_number}</td>
                    <td className="p-4 text-center border border-gray-300">{customer.email}</td>
                    <td className="p-4 text-center border border-gray-300">
                      <button onClick={() => handleEditClick(customer)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(customer.nic)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center border border-gray-300">No customers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for editing customer */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#121212] p-6 rounded-lg text-white w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Customer</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editCustomer.new_nic}
                  onChange={(e) => setEditCustomer({ ...editCustomer, new_nic: e.target.value })}
                  placeholder="New NIC"
                  className="p-2 mr-2 rounded w-full mb-2 text-black"
                />
                <input
                  type="text"
                  value={editCustomer.name}
                  onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  placeholder="Name"
                  className="p-2 mr-2 rounded w-full mb-2 text-black"
                />
                <input
                  type="text"
                  value={editCustomer.contact_number}
                  onChange={(e) => setEditCustomer({ ...editCustomer, contact_number: e.target.value })}
                  placeholder="Contact No"
                  className="p-2 mr-2 rounded w-full mb-2 text-black"
                />
                <input
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                  placeholder="Email"
                  className="p-2 mr-2 rounded w-full mb-2 text-black"
                />
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="ml-2 p-2 rounded bg-red-500 text-white">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
