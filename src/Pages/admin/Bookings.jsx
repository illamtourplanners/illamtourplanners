// src/components/AdminBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiCalendar, FiUser, FiDollarSign, FiPackage, FiCheck, FiX, FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0
  });

  // Generate mock bookings data
  useEffect(() => {
    const mockBookings = [
      { id: 'BK001', customer: 'John Doe', package: 'Beach Paradise', bookingDate: '2023-06-15', travelDate: '2023-07-20', travelers: 2, price: 1200, status: 'confirmed', paymentStatus: 'paid' },
      { id: 'BK002', customer: 'Jane Smith', package: 'Mountain Adventure', bookingDate: '2023-06-18', travelDate: '2023-08-05', travelers: 4, price: 1850, status: 'pending', paymentStatus: 'partial' },
      { id: 'BK003', customer: 'Robert Johnson', package: 'City Explorer', bookingDate: '2023-06-20', travelDate: '2023-09-12', travelers: 1, price: 850, status: 'cancelled', paymentStatus: 'refunded' },
      { id: 'BK004', customer: 'Emily Davis', package: 'Luxury Cruise', bookingDate: '2023-06-22', travelDate: '2023-10-15', travelers: 2, price: 3200, status: 'confirmed', paymentStatus: 'paid' },
      { id: 'BK005', customer: 'Michael Wilson', package: 'Wild Safari', bookingDate: '2023-06-25', travelDate: '2023-11-05', travelers: 3, price: 2450, status: 'confirmed', paymentStatus: 'paid' },
      { id: 'BK006', customer: 'Sarah Brown', package: 'Cultural Tour', bookingDate: '2023-06-28', travelDate: '2023-09-25', travelers: 5, price: 1750, status: 'pending', paymentStatus: 'pending' },
      { id: 'BK007', customer: 'David Miller', package: 'Island Getaway', bookingDate: '2023-07-01', travelDate: '2023-12-10', travelers: 2, price: 2800, status: 'confirmed', paymentStatus: 'paid' },
    ];

    // Calculate stats
    const total = mockBookings.length;
    const confirmed = mockBookings.filter(b => b.status === 'confirmed').length;
    const pending = mockBookings.filter(b => b.status === 'pending').length;
    const cancelled = mockBookings.filter(b => b.status === 'cancelled').length;
    const revenue = mockBookings.filter(b => b.status === 'confirmed').reduce((sum, booking) => sum + booking.price, 0);
    
    setBookings(mockBookings);
    setStats({ total, confirmed, pending, cancelled, revenue });
    setLoading(false);
  }, []);

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status styling
  const getPaymentStatusStyle = (status) => {
    switch(status) {
      case 'paid':
        return 'text-green-600';
      case 'partial':
        return 'text-yellow-600';
      case 'pending':
        return 'text-blue-600';
      case 'refunded':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Bookings</h1>
          <p className="mt-2 text-gray-600">Manage all package bookings for your tourism business</p>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition">
          <FiCalendar className="mr-2" />
          Generate Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FiPackage className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FiCheck className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Confirmed</p>
            <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FiClock className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <FiX className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FiDollarSign className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow mb-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search bookings by ID, customer, or package..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="ml-4 flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-1" />
            Filters
            {showFilters ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
                <select 
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <div className="flex items-center">
                  <input 
                    type="date" 
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From"
                  />
                  <span className="mx-2 text-gray-500">to</span>
                  <input 
                    type="date" 
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="To"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Any</option>
                  <option>1-2 Travelers</option>
                  <option>3-5 Travelers</option>
                  <option>6+ Travelers</option>
                </select>
              </div>
              
              <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="10" className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                    No bookings match your search criteria
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                        {booking.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.package}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{booking.travelDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="mr-1 text-gray-500" />
                        {booking.travelers} {booking.travelers > 1 ? 'People' : 'Person'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">${booking.price.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap font-medium ${getPaymentStatusStyle(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of{' '}
                <span className="font-medium">{filteredBookings.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <FiChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <FiChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Note */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Showing {filteredBookings.length} package bookings • Last updated: Today at 10:30 AM</p>
      </div>
    </div>
  );
};

export default AdminBookingsPage;