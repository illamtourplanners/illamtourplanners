// src/pages/BookingDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { FaHome, FaUserFriends, FaCalendarAlt, FaMapMarkerAlt, 
         FaBus, FaTicketAlt, FaPrint, FaDownload, FaSearch } from 'react-icons/fa';
import { GiJourney } from 'react-icons/gi';
import { axiosInstance } from '../config/axiosInstance';
import html2pdf from 'html2pdf.js';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const BookingDetailsPage = () => {
  const [bookingNumber, setBookingNumber] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
const [booking, setBooking] = useState(null); // array

    const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
  console.log("Booking state updated:", booking);
}, [booking]);

  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!bookingNumber.trim()) {
    setError('Please enter a booking number');
    return;
  }

  setIsLoading(true);
  setError('');
  setBookingData(null); // reset before fetch

  try {
    const response = await axiosInstance.get("/checkout/getbyBKN", {
      params: { bookingNumber },
    });

    const data = response.data?.data;

    if (data && data.length > 0) {
      setBookingData(data[0]); // set the correct booking info
    } else {
      setError('Booking not found. Please check your booking number.');
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    setError('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


const handleDownload = () => {
    const element = document.getElementById('booking-details-section');
    if (element) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: `${bookingData.bookingNumber}_booking.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(element)
        .save();
    }
  };

  const handleViewETicket = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (bookingData) {
    // Format package date
    const formattedDate = new Date(bookingData.packageDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    console.log(bookingData);
    
    // Prepare booking data for display
    const displayData = {
      id: bookingData.bookingNumber,
      status: bookingData.status,
      date: formattedDate,
      package: bookingData.packageName,
      duration: `${bookingData.packageDetails[0].packageDay} Day`,
      travelers: bookingData.customers,
      priceDetails: {
        total: bookingData.totalPerPerson*bookingData.customers.length,
        advance: bookingData.advancePayment,
        balance: bookingData.totalPerPerson*bookingData.customers.length - bookingData.advancePayment,
        perPerson: bookingData.totalPerPerson
      },
      contact: {
        email: bookingData.customers[0]?.email || 'N/A',
        phone: bookingData.customers[0]?.phoneNumber || 'N/A'
      },
      notes: `Advance payment of ₹${bookingData.advancePayment.toLocaleString()} has been received. Balance due: ₹${(bookingData.amount - bookingData.advancePayment).toLocaleString()}`,
      pickupPoint: bookingData.customers[0]?.pickupPoint || 'N/A',
      transactionId: bookingData.transactionId,
      createdAt: new Date(bookingData.createdAt).toLocaleString('en-IN')
    };


    return (
      <div id="booking-details-section" className="max-w-7xl mt-15 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
       
        <header className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-xl shadow-lg ">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center space-x-3">
              {/* <div className="bg-white p-2 rounded-lg">
                <FaHome className="text-emerald-600 text-3xl" />
              </div> */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Vaidehi Holidays</h1>
                <p className="text-emerald-100 text-sm">Experience the Extraordinary</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-emerald-100">Booking Reference</p>
              <p className="text-xl font-bold">{displayData.id}</p>
            </div>
          </div>
        </header>

        {/* Booking Status */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{displayData.package}</h2>
              <p className="text-gray-600 mb-4 md:mb-0">
                <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                {displayData.date} • {displayData.duration}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold ${
              displayData.status === 'Confirmed' 
                ? 'bg-emerald-100 text-emerald-800' 
                : displayData.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {displayData.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Traveler Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Traveler Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <FaUserFriends className="text-emerald-600 text-2xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Traveler Details</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {displayData.travelers.map((traveler, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-800">{traveler.fullName}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Gender:</span> {traveler.gender}
                      </p>
                      <p className="text-sm text-gray-600">
  <span className="font-medium">Aadhaar:</span>{" "}
  {`XXXX XXXX ${traveler.aadhaarNumber?.slice(-4)}`}
</p>

                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Phone:</span> {traveler.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Pickup:</span> {traveler.pickupPoint}
                      </p>
                      {/* <p className="text-sm text-gray-600 col-span-2">
                        <span className="font-medium">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          traveler.status === 'Confirmed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {traveler.status}
                        </span>
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Notes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-emerald-600 text-2xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Booking Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800">Package Details</h4>
                  <p className="text-gray-600 mt-1">
                    {bookingData.packageDetails[0].packageDestination}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Package ID: {bookingData.packageDetails[0].packageNumber}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Important Note</h4>
                  <p className="text-gray-600 mt-1">
                    Please carry valid ID proof for all travelers. Pickup time will be shared via SMS one day before the trip.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary & Actions */}
          <div className="space-y-8">
            {/* Price Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Package Cost</span>
                  <span className="font-medium">₹{displayData.priceDetails.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-emerald-600">
                  <span>Advance Paid</span>
                  <span className="font-medium">-₹{displayData.priceDetails.advance.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between font-bold text-lg">
                  <span>Balance Due</span>
                  <span className="text-emerald-700">₹{displayData.priceDetails.balance.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaUserFriends className="text-emerald-600 mr-3" />
                  <span>Travelers: {bookingData.customers.length} Persons</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaBus className="text-emerald-600 mr-3" />
                  <span>Pickup Point: {displayData.pickupPoint}</span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Per Person Cost: ₹{displayData.priceDetails.perPerson.toLocaleString()}</p>
                  <p>Transaction ID: {displayData.transactionId}</p>
                  <p className="mt-2">Booking created on: {displayData.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Contact & Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-3 mb-6">
                <p className="flex items-center">
                  <span className="font-medium w-24">Email:</span>
                  <span className="text-emerald-600">{displayData.contact.email}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">Phone:</span>
                  <span className="text-gray-800">{displayData.contact.phone}</span>
                </p>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Actions</h3>
              
              <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.print()}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <FaPrint className="text-gray-700 text-2xl mb-2" />
              <span className="text-sm font-medium">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <FaDownload className="text-gray-700 text-2xl mb-2" />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button
              onClick={handleViewETicket}
              className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition col-span-2"
            >
              <FaTicketAlt className="text-emerald-700 text-2xl mb-2" />
              <span className="text-sm font-medium text-emerald-800">View E-Tickets</span>
            </button>
          </div>
        </div>
           

            {/* Important Notes */}
            {/* <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h3 className="font-bold text-yellow-800 mb-2">Payment Notes</h3>
              <p className="text-yellow-700 text-sm">{displayData.notes}</p>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">Need assistance with your booking?</p>
              <p className="font-medium text-lg">+91 80 4123 4567</p>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => alert('Modify booking functionality would be implemented here')}
                className="text-emerald-700 font-medium hover:underline"
              >
                Modify Booking
              </button>
              <button 
                onClick={() => alert('Cancel booking functionality would be implemented here')}
                className="text-red-600 font-medium hover:underline"
              >
                Cancel Booking
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} Vaidehi Holidays. All rights reserved.
          </p>
        </footer>

        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          contentLabel="E-Ticket"
          className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
        >
          <h2 className="text-xl font-bold mb-4">E-Ticket</h2>
          <p className="text-sm text-gray-700 mb-2">Booking Reference: <strong>{displayData.id}</strong></p>
          <p className="text-sm text-gray-700 mb-2">Package: {displayData.package}</p>
          <p className="text-sm text-gray-700 mb-2">Travel Date: {displayData.date}</p>
          <p className="text-sm text-gray-700 mb-2">Pickup: {displayData.pickupPoint}</p>
          <p className="text-sm text-gray-700 mb-4">Total Travelers: {displayData.travelers.length}</p>

          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-teal-600 to-emerald-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FaSearch className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Find Your Booking</h1>
          <p className="text-gray-600 mt-2">
            Enter your booking reference number to view details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="bookingNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Booking Reference Number
            </label>
            <input
              id="bookingNumber"
              type="text"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value)}
              placeholder="e.g. BKN123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              'Find Booking'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Don't have your booking number?</p>
          <p className="mt-1">
            Contact our support team at{" "}
            <a href="tel:+918041234567" className="text-emerald-600 hover:underline">
              +91 80 4123 4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;