import React from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiPieChart, FiActivity, FiCalendar, FiSettings, FiSearch } from 'react-icons/fi';

export default function AdminHomePage() {
  // Sample data
  const stats = [
    { icon: <FiUsers size={24} />, title: "Total Users", value: "2,345", change: "+12%", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: <FiShoppingBag size={24} />, title: "Products", value: "1,234", change: "+5%", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: <FiDollarSign size={24} />, title: "Revenue", value: "$34,789", change: "+18%", color: "text-green-500", bg: "bg-green-50" },
    { icon: <FiActivity size={24} />, title: "Activity", value: "1,023", change: "+7%", color: "text-orange-500", bg: "bg-orange-50" }
  ];

  const recentOrders = [
    { id: "#1234", customer: "John Smith", amount: "$129.99", status: "shipped" },
    { id: "#1235", customer: "Sarah Johnson", amount: "$89.99", status: "processing" },
    { id: "#1236", customer: "Michael Brown", amount: "$249.99", status: "delivered" },
    { id: "#1237", customer: "Emily Davis", amount: "$59.99", status: "pending" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
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

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
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
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-full mr-3">
                    <FiCalendar className="text-gray-500" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New order #{1230 + item} placed</p>
                    <p className="text-sm text-gray-500">{item * 15} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center">
                <FiUsers size={20} className="mb-2" />
                <span>Add User</span>
              </button>
              <button className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center">
                <FiShoppingBag size={20} className="mb-2" />
                <span>Add Product</span>
              </button>
              <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center">
                <FiDollarSign size={20} className="mb-2" />
                <span>Create Order</span>
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