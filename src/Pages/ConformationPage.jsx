import React from 'react';
import { CheckCircle, MapPin, Calendar, CreditCard } from 'react-feather';
import { useNavigate } from 'react-router-dom';

export default function VaidehiHolidaysConfirmation() {
  const navigate = useNavigate();

  // Sample booking data
  const bookingDetails = {
    bookingId: 'VH-2023-2876',
    amount: '₹24,999',
    date: new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    package: 'Goa Beach Paradise (4D/3N)',
    travelers: '2 Adults',
    departure: '15 Dec 2023',
    paymentMethod: 'VISA •••• 5678'
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md max-w-2xl w-full border border-blue-100">
        {/* Header with Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2 flex items-center justify-center">
            <span className="bg-blue-100 p-2 rounded-lg mr-3">✈️</span>
            Vaidehi Holidays
          </h1>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Booking Confirmed!</h2>
          <p className="text-gray-600">Your dream vacation is now secured</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-blue-50 rounded-lg p-5 mb-8 border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
            <MapPin className="mr-2" size={18} />
            {bookingDetails.package}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Calendar className="text-blue-600 mr-3 mt-1" size={16} />
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-medium">{bookingDetails.departure}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="text-blue-600 mr-3 mt-1" size={16} />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{bookingDetails.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="border-t border-b border-gray-200 py-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium">{bookingDetails.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Travelers</span>
              <span className="font-medium">{bookingDetails.travelers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-blue-800">{bookingDetails.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Date</span>
              <span className="font-medium">{bookingDetails.date}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">What's Next?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Your booking voucher will be emailed within 24 hours</li>
            <li>Our travel expert will contact you for further details</li>
            <li>Check your spam folder if you don't see our email</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition flex-1"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-2 px-6 rounded-lg border border-blue-200 transition flex-1"
          >
            Contact - Us
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help? Call our support at <a href="tel:+91 9400440686, 8547854685" className="text-blue-600 hover:underline">+91 9400440686, +91 8547854685</a>
        </div>
      </div>
    </div>
  );
}