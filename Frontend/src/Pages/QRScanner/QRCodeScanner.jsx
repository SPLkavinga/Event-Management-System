// src/QrJsonReaderComponent.js
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; 

const QRCodeScanner = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(true); // State to manage scanning status

  const handleScan = (data) => {
    console.log('Scanned Data:', data); // Log the scanned data

    // Check if data has a text property and is a string
    const scannedData = data?.text; // Extract the text property

    if (scannedData && typeof scannedData === 'string') {
      try {
        const jsonData = JSON.parse(scannedData); // Parse the JSON data
        setTicketDetails(jsonData); // Set the parsed ticket details
        setIsScanning(false); // Stop scanning after successful read
        setError(''); // Clear any previous error
      } catch (e) {
        setError('Invalid JSON format'); // Set an error if JSON parsing fails
        console.error('Error parsing JSON:', e);
      }
    } else {
      setError('No valid data scanned');
      console.error('Invalid scanned data:', data);
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR code:', err);
    setError('Error scanning QR code'); // Set error on scanning failure
  };

  const handleRestartScan = () => {
    setTicketDetails(null); // Clear ticket details
    setError(''); // Clear error messages
    setIsScanning(true); // Restart scanning
  };

  // Render ticket fields if available
  const renderTicketDetails = () => {
    if (!ticketDetails) return null;

    const ticketFields = [
      ["Customer Name", ticketDetails.customerName],
      ["NIC NO", ticketDetails.customerNIC],
      ["Event Name", ticketDetails.eventName],
      ["Date", ticketDetails.date],
      ["Time", ticketDetails.time],
      ["Venue", ticketDetails.venue],
      ["Description", ticketDetails.description],
      ["Price per Ticket", `${ticketDetails.price} LKR`],
      ["No Tickets", `${ticketDetails.quantity}`],
      ["Total Price", `${ticketDetails.totalPrice} LKR`],
    ];

    return (
      <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-2">Scanned Ticket Details:</h2>
        <table className="min-w-full">
          <tbody>
            {ticketFields.map(([label, value], index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 font-medium text-gray-700"><strong>{label}:</strong></td>
                <td className="px-4 py-2 text-gray-600">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button 
          onClick={handleRestartScan} 
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition duration-200"
        >
          Restart Scan
        </button> {/* Button to restart scanning */}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E1E] p-6">
      <div className="p-6 absolute top-0 left-0"> {/* Positioned at top left */}
        <button
          className="w-10 h-10 bg-white rounded-full lg:w-12 lg:h-12 hover:bg-black hover:text-white hover:border hover:border-white"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      {isScanning ? ( // Conditional rendering based on scanning state
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-lg text-gray-700">Scan complete. Please see the ticket details above.</p>
          {renderTicketDetails()} 
        </div>
      )}
      {error && <p className="mt-4 text-red-600">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default QRCodeScanner;
