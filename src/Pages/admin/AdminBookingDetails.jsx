import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useParams } from 'react-router-dom';

const BookingDetailsPage = () => {
  

  
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  // const [notes, setNotes] = useState(bookings?.notes);
 const [bookings, setBooking] = useState(null);

  
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(`/checkout/bookingdetail/${id}`);
        const bookingData = response.data.data;
        console.log(bookingData);
        
        // Map API data to component structure
        const mappedBooking = {
          id: bookingData.bookingNumber,
          customers: bookingData.customers,
          tourPackage: {
            name: bookingData.packageName,
            duration: `${bookingData.packageDetails[0]?.packageDay || 0} Days`,
            destinations: bookingData.packageDetails.map(pkg => pkg.packageDestination),
            inclusions: [] // Not in API response
          },
          dates: {
            bookedDate:bookingData.createdAt,
            start: bookingData.packageDate,
            end: calculateEndDate(
              bookingData.packageDate,
              bookingData.packageDetails[0]?.packageDay
            ),
          },
          guests: {
            adults: bookingData.customers.length,
            children: 0 // Not in API response
          },
       
          pricing: {
            total: bookingData.amount ,// Not in API response
            advancePayment:bookingData.advancePayment,
            perperson:bookingData.totalPerPerson,
          },
          paymentStatus: 'Completed', // Placeholder
          paymentMethod: 'Online', // Placeholder
          paymentDate: bookingData.createdAt, // Placeholder
          paymentImage: bookingData.image,
          specialRequests: '', // Not in API response
          status: 'Confirmed', // Placeholder
          notes: '', // Placeholder
          transactionId: bookingData.transactionId,
          packageDetails: bookingData.packageDetails[0]
        };
        
        setBooking(mappedBooking);
        setNotes(mappedBooking.notes);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    fetchBooking();
  }, [id]);

  const calculateEndDate = (startDate, days) => {
    if (!days) return startDate;
    const result = new Date(startDate);
    result.setDate(result.getDate() + parseInt(days));
    return result.toISOString();
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    // In a real app, this would save to backend
    console.log("Notes saved:", notes);
  };


const sendConformation=async()=>{
  console.log("df");
  
 try {
  const response = await axiosInstance.post("/checkout/confirm", {
  bookingId: id,
  transactionId: bookings?.transactionId,
  customerEmail: bookings?.customers?.email,
  customerName: bookings?.customers?.name,
  packageName: bookings?.tourPackage?.name,
  travelDate: bookings?.dates?.start,
});
console.log(response);

 } catch (error) {
  console.log(error);
  
 }
}
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tour Booking Details</h1>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-gray-600">Booking ID: {bookings?.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                bookings?.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : bookings?.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {bookings?.status}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {/* <button className="px-4 py-2 flex items-center gap-1 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              Edit Booking
            </button> */}
            <button className="px-4 py-2 flex items-center gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Payment Actions
            </button>
            {/* <button className="px-4 py-2 flex items-center gap-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button> */}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tour Package</h3>
              <p className="text-lg font-semibold mt-1">{bookings?.tourPackage.name}</p>
              <p className="text-gray-600 text-sm">{bookings?.tourPackage.duration}</p>
            </div>
            
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Travel Dates</h3>
              <p className="text-lg font-semibold mt-1">
                {new Date(bookings?.dates.start).toLocaleDateString()} - {new Date(bookings?.dates.end).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">{bookings?.guests.adults + bookings?.guests.children} travelers</p>
            </div>
            
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Amount</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">₹{bookings?.pricing.total.toFixed(2)}</p>
              <p className="text-sm text-gray-600">
                <span className={`px-1 py-0.5 rounded ${bookings?.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {bookings?.paymentStatus}
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</h3>
              <div className="flex gap-2 mt-2">
                <button
                onClick={() => sendConformation()}

                 className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                  Send Confirmation
                </button>
                <button className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">
                  Print Itinerary
                </button>
                <button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('details')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Booking Details
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('payment')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Payment Details
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('documents')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1 -mt-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Documents
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
       {/* Customer Information */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="p-5 border-b border-gray-200">
    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      Customer Information
    </h2>
  </div>
  <div className="p-5 space-y-6">
    {bookings?.customers?.map((customer, index) => (
      <div key={customer._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
        <h3 className="font-medium text-gray-700 mb-3">Customer {index + 1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem 
            icon="user" 
            label="Full Name" 
            value={customer.fullName} 
          />
          {customer.email && (
            <DetailItem 
              icon="mail" 
              label="Email" 
              value={customer.email} 
            />
          )}
          <DetailItem 
            icon="phone" 
            label="Phone" 
            value={customer.phoneNumber} 
          />
          <DetailItem 
            icon="location" 
            label="Pickup Point" 
            value={customer.pickupPoint || 'Not specified'} 
          />
          <DetailItem 
            icon="id" 
            label="Aadhaar Number" 
            value={customer.aadhaarNumber} 
          />
          <DetailItem 
            icon="user" 
            label="Gender" 
            value={customer.gender} 
          />
        </div>
      </div>
    ))}
  </div>
</div>


            {/* Tour Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Tour Package Details
                </h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <DetailItem icon="calendar" label="Booking Date" value={new Date(bookings?.dates.bookedDate).toLocaleDateString()} />
                  <DetailItem icon="clock" label="Duration" value={bookings?.tourPackage.duration} />
                  <DetailItem icon="users" label="Travelers" value={`${bookings?.guests.adults} Adults, ${bookings?.guests.children} Children`} />
                  <DetailItem icon="credit-card" label="Package Price" value={`₹${bookings?.pricing.perperson.toFixed(2)}`} />
                </div>
                
                <div className="mt-5">
                  <h3 className="font-medium text-gray-700 mb-2">Destinations</h3>
                  <div className="flex flex-wrap gap-2">
                    {bookings?.tourPackage.destinations.map((destination, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* <div className="mt-5">
                  <h3 className="font-medium text-gray-700 mb-2">Inclusions</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {booking.tourPackage.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {inclusion}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Booking Timeline
                </h2>
              </div>
              <div className="p-5">
                <div className="relative">
                  {/* Timeline item */}
                  <div className="mb-6 ml-6">
                    <div className="absolute w-6 h-6 bg-blue-200 rounded-full -left-3 border border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <h3 className="font-medium text-gray-900">Booking Created</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">{new Date(bookings?.dates.bookingDate).toLocaleDateString()}</time>
                    <p className="text-sm text-gray-600">Customer placed booking through website</p>
                  </div>
                  
                  {/* Timeline item */}
                  <div className="mb-6 ml-6">
                    <div className="absolute w-6 h-6 bg-green-200 rounded-full -left-3 border border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <h3 className="font-medium text-gray-900">Payment Received</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">{new Date(bookings?.paymentDate).toLocaleDateString()}</time>
                    <p className="text-sm text-gray-600">Payment processed successfully via {bookings?.paymentMethod}</p>
                  </div>
                  
                  {/* Timeline item */}
                  <div className="ml-6">
                    <div className="absolute w-6 h-6 bg-gray-200 rounded-full -left-3 border border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <h3 className="font-medium text-gray-900">Tour Starts</h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">{new Date(bookings?.dates.start).toLocaleDateString()}</time>
                    <p className="text-sm text-gray-600">Tour begins in {bookings?.tourPackage.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Summary
                </h2>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid Amount</span>
                    <span className="font-medium">₹{bookings?.pricing.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Advance Amount</span>
                    <span className="font-medium">₹{bookings?.pricing.advancePayment.toFixed(2)}</span>
                  </div>
                  
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Payment Method</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {bookings?.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Date</span>
                    <span>{new Date(bookings?.paymentDate).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Proof */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Payment Proof
                </h2>
              </div>
              <div className="p-5">
                {bookings?.paymentImage ? (
                  <>
                    <div 
                      className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition"
                      onClick={() => setImageModalOpen(true)}
                    >
                      <img 
                        src={bookings?.paymentImage} 
                        alt="Payment receipt" 
                        className="w-full h-48 object-contain"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      Click image to enlarge
                    </p>
                    
                  
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-4">No payment image uploaded</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Upload Payment Proof
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && bookings?.paymentImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-medium">Payment Receipt</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setImageModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-4 flex justify-center">
              <img 
                src={bookings?.paymentImage} 
                alt="Payment receipt" 
                className="max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-4 border-t flex justify-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable detail item component with icons
const DetailItem = ({ icon, label, value }) => {
  const getIcon = () => {
    switch(icon) {
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'mail':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case 'location':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-start">
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-gray-900">{value}</div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;