import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import backgroundImage from "../../assets/Images/Bgimage.jpg";
import pdfbackgroundImage from "../../assets/Images/ticket.jpg";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const BuyTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(event.ticketprice || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerNIC, setCustomerNIC] = useState("");
  const [customers, setCustomers] = useState([]); // To hold customer names and NICs

  useEffect(() => {
    // Fetch all customer names from the backend
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
    setTotalPrice(quantity * (event.ticketprice || 0));
  }, [quantity, event.ticketprice]);

  // Generate QR code and return a promise
  const generateQRCode = (ticketDetails) => {
    return QRCode.toDataURL(JSON.stringify(ticketDetails), {
      errorCorrectionLevel: 'H',
    });
  };

  const handleGeneratePDF = async () => {
    const ticketDetails = {
      customerName,
      customerNIC,
      eventName: event.event_name || "N/A",
      price: event.ticketprice || "N/A",
      quantity,
      totalPrice,
      date: event.event_date || "N/A",
      time: event.event_time || "N/A",
      venue: event.venue || "N/A",
      description: event.description || "N/A",
    };

    try {
      const qrCodeDataUrl = await generateQRCode(ticketDetails);
      setQrCodeUrl(qrCodeDataUrl);

      const doc = new jsPDF("p", "mm", "a4");

      // Background image
      const backgroundImageBase64 = pdfbackgroundImage;
      doc.addImage(backgroundImageBase64, 'JPEG', 0, 0, 210, 80);



      // Ticket details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      let y = 8;

      const ticketFields = [
        [ticketDetails.customerNIC],
        [`${ticketDetails.price} /-`],
      ];

      // Change the positioning of the ticket fields
      ticketFields.forEach(([value], index) => {
        if (index === 0) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10); 
          doc.text(value, 167, 8);
        } else {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16); // Reset font size for price
          doc.text(value, 170, 73);
        }
        doc.setTextColor(0, 0, 0);
        
      });

      // QR Code Section
      if (qrCodeDataUrl) {
        doc.setFont("helvetica", "semibold");
        doc.setTextColor(0, 0, 0);
        doc.text("Scan for Details", 161, 17);
        doc.addImage(qrCodeDataUrl, "PNG", 160, 20, 40, 40); // Position QR on right side
      }

      // Footer with Additional Info
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 280, 210, 17, "F");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text(
        "Thank you for your purchase! Please bring a printed or digital copy of this ticket to the event.",
        105,
        288,
        { align: "center" }
      );

      const pdfBlob = doc.output("blob");
      const generatedPdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(generatedPdfUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setCustomerName(selectedName);

    // Find the corresponding NIC for the selected customer name
    const selectedCustomer = customers.find(customer => customer.name === selectedName);
    if (selectedCustomer) {
      setCustomerNIC(selectedCustomer.nic);
    } else {
      setCustomerNIC("");
    }
  };


  return (
    <div className="relative flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Left Section (Image) */}
      <div
        className={`bg-center bg-cover lg:w-1/2 h-1/2 lg:h-full ${isModalOpen ? "blur-sm" : ""
          }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="p-6">
          <button
            className="w-10 h-10 bg-white rounded-full lg:w-12 lg:h-12 hover:bg-black hover:text-white hover:border hover:border-white"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
          </button>
        </div>
      </div>

      {/* Right Section (Ticket Details) */}
      <div
        className={`flex bg-[#121212] text-white flex-col items-center justify-center p-8 lg:w-1/2 ${isModalOpen ? "blur-sm" : ""
          }`}
      >
        <div className="w-full max-w-md">
          <h1 className="mb-6 text-2xl font-bold text-center">BUY TICKET</h1>
          <div className="p-6">

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">CUSTOMER NAME</h2>
              <select
                value={customerName}
                onChange={handleNameChange} // Update here
                className="w-1/2 p-2 text-black border border-gray-300 rounded"
              >
                <option value="" disabled>Select a name</option>
                {customers.map((customer) => (
                  <option key={customer.nic} value={customer.name}>{customer.name}</option>
                ))}
              </select>
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">CUSTOMER NIC</h2>
              <input
                type="text"
                value={customerNIC}
                readOnly // Make the NIC field read-only
                className="w-1/2 p-2 text-black border border-gray-300 rounded"
              />
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">EVENT NAME</h2>
              <p>{event.event_name || "N/A"}</p>
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">DATE</h2>
              <p>{event.event_date ? new Date(event.event_date).toISOString().split("T")[0] : "N/A"}</p>
            </div>

            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">TIME</h2>
              <p>{event.event_time || "N/A"}</p>
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">VENUE</h2>
              <p>{event.venue || "N/A"}</p>
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">TICKET PRICE</h2>
              <p>{event.ticketprice || "N/A"} LKR</p>
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">QUANTITY</h2>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-1/2 p-2 text-black border border-gray-300 rounded"
              />
            </div>
            <hr className="mb-2 border-gray-600" />

            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">TOTAL PRICE</h2>
              <p>{totalPrice} LKR</p>
            </div>
            <hr className="mb-4 border-gray-600" />

            <button
              onClick={handleGeneratePDF}
              className="w-full px-4 py-2 font-bold text-white bg-black hover:bg-white hover:text-black"
            >
              <ShoppingCartIcon /> BUY TICKET
            </button>
          </div>
        </div>
      </div>

      {/* Modal for PDF preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute text-xl font-bold text-gray-700 top-2 right-2 hover:text-red-600"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              title="PDF Preview"
              className="border"
            ></iframe>
            <div className="flex justify-end mt-4 ">
              <a
                href={pdfUrl}
                download="ticket.pdf"
                className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyTicket;
