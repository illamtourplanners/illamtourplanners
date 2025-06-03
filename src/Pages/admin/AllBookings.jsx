import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

const AllBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'TB001',
      customer: 'Sarah Johnson',
      tour: 'Bali Adventure',
      date: '2023-11-15',
      guests: 2,
      price: '$1,200',
      status: 'Confirmed',
      duration: '7 days'
    },
    {
      id: 'TB002',
      customer: 'Michael Chen',
      tour: 'Italian Gourmet Journey',
      date: '2023-11-22',
      guests: 4,
      price: '$3,800',
      status: 'Pending',
      duration: '10 days'
    },
    {
      id: 'TB003',
      customer: 'Emma Rodriguez',
      tour: 'Japanese Cultural Immersion',
      date: '2023-12-05',
      guests: 1,
      price: '$2,500',
      status: 'Completed',
      duration: '14 days'
    },
    {
      id: 'TB004',
      customer: 'James Wilson',
      tour: 'African Safari Expedition',
      date: '2023-12-10',
      guests: 3,
      price: '$4,200',
      status: 'Confirmed',
      duration: '12 days'
    },
    {
      id: 'TB005',
      customer: 'Olivia Parker',
      tour: 'Greek Island Hopping',
      date: '2023-11-30',
      guests: 2,
      price: '$1,800',
      status: 'Cancelled',
      duration: '8 days'
    },
    {
      id: 'TB006',
      customer: 'Robert Taylor',
      tour: 'Alaskan Wilderness Trek',
      date: '2023-12-18',
      guests: 5,
      price: '$5,600',
      status: 'Confirmed',
      duration: '9 days'
    },
    {
      id: 'TB007',
      customer: 'Sophia Kim',
      tour: 'Thailand Beaches & Temples',
      date: '2023-12-03',
      guests: 2,
      price: '$1,900',
      status: 'Pending',
      duration: '10 days'
    }
  ]);

  const statusStyles = {
    Confirmed: 'bg-green-100 text-green-800 border-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Completed: 'bg-blue-100 text-blue-800 border-blue-300',
    Cancelled: 'bg-red-100 text-red-800 border-red-300'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tour Bookings Management
          </motion.h1>
          <motion.p 
            className="mt-3 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            View and manage all your tour bookings in one place. Confirm, edit, or cancel bookings as needed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
            <p className="text-3xl font-bold mt-2">{bookings.length}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-gray-500 text-sm font-medium">Confirmed</h3>
            <p className="text-3xl font-bold mt-2">{bookings.filter(b => b.status === 'Confirmed').length}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md border-t-4 border-yellow-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold mt-2">{bookings.filter(b => b.status === 'Pending').length}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md border-t-4 border-red-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold mt-2">$19,000</p>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
              <p className="text-gray-600 mt-1">Manage your tour bookings efficiently</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Booking
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <motion.table 
              className="w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Customer</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Tour Details</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Date</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Guests</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Price</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Status</th>
                  <th className="py-4 px-6 text-left text-gray-600 font-semibold uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <motion.tr 
                    key={booking.id}
                    variants={rowVariants}
                    whileHover={{ 
                      scale: 1.005, 
                      backgroundColor: 'rgba(249, 250, 251, 0.8)',
                      transition: { duration: 0.2 }
                    }}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">{booking.customer}</p>
                          <p className="text-gray-500 text-sm mt-1">ID: {booking.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <p className="font-medium text-gray-900">{booking.tour}</p>
                      <p className="text-gray-500 text-sm mt-1">{booking.duration}</p>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-gray-900 font-medium">{booking.date}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">{booking.guests}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-bold text-gray-900">
                      {booking.price}
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex space-x-3">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 font-medium text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 font-medium text-sm flex items-center"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{bookings.length}</span> of{' '}
              <span className="font-medium">{bookings.length}</span> bookings
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-10 text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© 2023 TourEase Booking System. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AllBookings;