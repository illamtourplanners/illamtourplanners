import React from 'react';
import { FiUsers, FiMap, FiDollarSign, FiCalendar, FiSettings, FiSearch, FiPackage, FiGlobe, FiCheckCircle } from 'react-icons/fi';

export default function TourAdminHomePage() {
  // Tour package metrics
  const stats = [
    { icon: <FiUsers size={24} />, title: "Total Travelers", value: "1,892", change: "+8%", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: <FiMap size={24} />, title: "Active Tours", value: "42", change: "+3", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: <FiDollarSign size={24} />, title: "Revenue", value: "$86,420", change: "+14%", color: "text-green-500", bg: "bg-green-50" },
    { icon: <FiCalendar size={24} />, title: "Upcoming Bookings", value: "317", change: "+22", color: "text-orange-500", bg: "bg-orange-50" }
  ];

  // Recent bookings data
  const recentBookings = [
    { id: "#TB-1257", traveler: "Emma Johnson", tour: "Bali Adventure", date: "15 Jul 2023", status: "confirmed" },
    { id: "#TB-1256", traveler: "Michael Chen", tour: "European Explorer", date: "18 Jul 2023", status: "pending" },
    { id: "#TB-1255", traveler: "Sarah Williams", tour: "Japan Cultural", date: "22 Jul 2023", status: "completed" },
    { id: "#TB-1254", traveler: "David Miller", tour: "Safari Kenya", date: "25 Jul 2023", status: "cancelled" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Tour Package Dashboard</h1>
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings, tours..." 
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`p-6 rounded-xl ${stat.bg} shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traveler</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Package</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.traveler}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.tour}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <FiCheckCircle className="text-blue-500" size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Booking #TB-1268 confirmed</p>
                  <p className="text-sm text-gray-500">Sophia Rodriguez - Greek Islands Cruise</p>
                  <p className="text-xs text-gray-400">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <FiPackage className="text-purple-500" size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">New tour added</p>
                  <p className="text-sm text-gray-500">Norwegian Fjords Expedition</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <FiUsers className="text-green-500" size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Traveler registered</p>
                  <p className="text-sm text-gray-500">Robert Kim - Premium member</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center">
                <FiUsers size={20} className="mb-2" />
                <span>Add Traveler</span>
              </button>
              <button className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center">
                <FiGlobe size={20} className="mb-2" />
                <span>Create Tour</span>
              </button>
              <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center">
                <FiCalendar size={20} className="mb-2" />
                <span>New Booking</span>
              </button>
              <button className="p-4 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex flex-col items-center">
                <FiSettings size={20} className="mb-2" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}