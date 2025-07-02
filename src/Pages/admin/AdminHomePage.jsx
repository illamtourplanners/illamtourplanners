import React, { useEffect, useState } from 'react';
import {
  FiUsers, FiMap, FiDollarSign, FiCalendar, FiSettings,
  FiSearch, FiPackage, FiGlobe, FiCheckCircle
} from 'react-icons/fi';
import { axiosInstance } from '../../config/axiosInstance';

export default function TourAdminHomePage() {
  const [recentActivities, setRecentActivities] = useState([]);

  const [dashboardData, setDashboardData] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    upcomingBookings: 0,
    allActivePackages: 0,
    recentBookings: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/admin/data", { withCredentials: true });
        setDashboardData(response.data);
         setRecentActivities(response.data.recentActivities || []);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      icon: <FiUsers size={24} />,
      title: "Total Travelers",
      value: dashboardData.totalCustomers,
      change: "+8%",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: <FiMap size={24} />,
      title: "Active Tours",
      value: dashboardData.allActivePackages,
      change: "+3",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: <FiDollarSign size={24} />,
      title: "Revenue",
      value: `₹${dashboardData.totalRevenue.toLocaleString()}`,
      change: "+14%",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: <FiCalendar size={24} />,
      title: "Upcoming Bookings",
      value: dashboardData.upcomingBookings,
      change: "+22",
      color: "text-orange-500",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
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

        {/* Recent Bookings Table */}
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
                {dashboardData.recentBookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookingNumber}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customers?.[0]?.fullName || 'N/A'}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{booking.packageName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.packageDate).toLocaleDateString()}
                    </td>
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

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
  <div className="space-y-4">
    {recentActivities.map((activity, index) => {
      let iconComponent;
      let bgColor;

      switch (activity.icon) {
        case "check":
          iconComponent = <FiCheckCircle className="text-blue-500" size={16} />;
          bgColor = "bg-blue-100";
          break;
        case "package":
          iconComponent = <FiPackage className="text-purple-500" size={16} />;
          bgColor = "bg-purple-100";
          break;
        case "user":
          iconComponent = <FiUsers className="text-green-500" size={16} />;
          bgColor = "bg-green-100";
          break;
        default:
          iconComponent = <FiGlobe className="text-gray-500" size={16} />;
          bgColor = "bg-gray-100";
      }

      return (
        <div key={index} className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${bgColor}`}>
            {iconComponent}
          </div>
          <div>
            <p className="font-medium text-gray-800">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.subtitle}</p>
            <p className="text-xs text-gray-400">{activity.timeAgo}</p>
          </div>
        </div>
      );
    })}
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
