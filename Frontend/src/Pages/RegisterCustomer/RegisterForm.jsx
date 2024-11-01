import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; 

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    contactNo: '',
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addcustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage('Registration successful');
        console.log('User registered:', data);

        // Store name and NIC in local storage
        localStorage.setItem('userFullName', formData.name);
        localStorage.setItem('userNIC', formData.nic);

        // Show alert for successful registration
        window.alert('Data saved to the database successfully!');

        // Clear input fields
        setFormData({
          name: '',
          nic: '',
          contactNo: '',
          email: '',
        });
      } else {
        setSuccessMessage('');
        setErrorMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setSuccessMessage('');
      setErrorMessage('Error: Unable to register');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] lg:bg-[#121212]">
      <div className="absolute top-0 left-0 p-6">
        <button
          className="w-10 h-10 bg-white rounded-full lg:w-12 lg:h-12 hover:bg-black hover:text-white hover:border hover:border-white"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      <form
        className="w-full max-w-sm px-8 pt-20 pb-20 mb-4 bg-white rounded shadow-hidden lg:shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-2 text-3xl font-bold text-center">REGISTER</h1>
        <p className="mb-6 text-center text-gray-600">Register To the Event Management System</p>

        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 py-2 leading-tight text-gray-700 border border-black rounded-md shadow appearance-none bg-gray-50 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 py-2 leading-tight text-gray-700 border border-black rounded-md shadow appearance-none bg-gray-50 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <input
            type="tel"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 py-2 leading-tight text-gray-700 border border-black rounded-md shadow appearance-none bg-gray-50 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-12 px-3 py-2 leading-tight text-gray-700 border border-black rounded-md shadow appearance-none bg-gray-50 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-black rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
