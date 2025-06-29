import React, { useState, useEffect } from 'react';
import {
  FiSearch, FiFilter, FiCalendar, FiUser, FiDollarSign, FiPackage,
  FiCheck, FiX, FiClock, FiChevronDown, FiChevronUp, FiPhone, FiDownload,
  FiUsers
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const AdminBookingsPage = () => {
  const { id } = useParams();
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
    revenue: 0,
    totalPassengers:0,
  });
  const [packageName, setPackageName] = useState('Package');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/checkout/bookings/${id}`);
        const data = response.data.data;
        console.log(data);
        
        // Extract package name from the first booking
        if (data.length > 0) {
          setPackageName(data[0].packageDetails[0]?.packageName || 'Package');
        }
        
        const formatted = data.map((item, index) => {
          const id = item._id;
          const customer = item.customers[0];
          const travelDate = item.packageDate?.split('T')[0];
          const bookingDate = item.createdAt?.split('T')[0] || '2025-07-01';
          const travelers = item.customers.length;
         
          const price = item.customers.reduce(
            (sum, customer) => sum + (customer.price || 0), 
            0
          );
          
          const status = (item?.status || 'pending').toLowerCase();
          const paymentStatus = item.paymentStatus || 'pending';

          return {
            id: item.bookingNumber || `BK${index + 1}`,
            customer: customer?.fullName || 'N/A',
            package: item.packageDetails[0]?.packageName || 'N/A',
            bookingDate,
            travelDate,
            travelers,
            price,
            phoneNumber: customer?.phoneNumber || 'N/A',
            status,
            paymentStatus,
            bookingId: id
          };
        });

        const total = formatted.length;
        const confirmed = formatted.filter(b => b.status === 'confirmed').length;
        const pending = formatted.filter(b => b.status === 'pending').length;
        const cancelled = formatted.filter(b => b.status === 'cancelled').length;
        const revenue = formatted.reduce(
          (sum, b) => b.status === 'confirmed' ? sum + b.price : sum, 
          0
        );
 const totalPassengers = formatted.reduce((sum, b) => sum + b.travelers, 0);
        setBookings(formatted);
        setStats({ total, confirmed, pending, cancelled, revenue ,totalPassengers});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  // Function to generate CSV report
  const generateReport = () => {
    if (filteredBookings.length === 0) {
      alert('No bookings to generate report');
      return;
    }

    // Create CSV headers
    const headers = [
      'Sl.No', 'Booking ID', 'Customer', 'Package', 'Booking Date', 
      'Travel Date', 'Travelers', 'Phone', 'Status', 'Price', 'Payment Status'
    ];
    
    // Create CSV rows
    const rows = filteredBookings.map((booking, index) => [
      index + 1,
      booking.id,
      `"${booking.customer.replace(/"/g, '""')}"`,
      `"${booking.package.replace(/"/g, '""')}"`,
      booking.bookingDate,
      booking.travelDate,
      booking.travelers,
      booking.phoneNumber,
      booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      booking.price,
      booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${packageName.replace(/ /g, '_')}_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      case 'pending': return 'text-blue-600';
      case 'refunded': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const navigateToBooking = (id) => {
    navigate(`/admin/booking/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Bookings</h1>
          <p className="mt-2 text-gray-600">Manage all package bookings for your tourism business</p>
        </div>
        <button 
          onClick={generateReport}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition"
        >
          <FiDownload className="mr-2" />
          Generate Report
        </button>
      </div>

     

<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
  <StatCard icon={<FiPackage />} label="Total Bookings" value={stats.total} color="blue" />
  <StatCard icon={<FiCheck />} label="Confirmed" value={stats.confirmed} color="green" />
  <StatCard icon={<FiClock />} label="Pending" value={stats.pending} color="yellow" />
  <StatCard icon={<FiX />} label="Cancelled" value={stats.cancelled} color="red" />
  {/* <StatCard 
    icon={<FiDollarSign />} 
    label="Revenue" 
    value={`₹${stats.revenue.toLocaleString()}`} 
    color="purple" 
  /> */}
  <StatCard 
    icon={<FiUsers />} 
    label="Total Passengers" 
    value={stats.totalPassengers} 
    color="teal" 
  />
</div>


      <div className="bg-white rounded-xl shadow mb-8">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="relative w-full max-w-md mb-4 md:mb-0">
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
          
          <div className="flex items-center w-full md:w-auto">
            <button 
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="mr-1" />
              Filters
              {showFilters ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
            </button>
            
            {showFilters && (
              <div className="ml-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['SL.NO', 'Booking ID', 'Customer', 'Package', 'Booking Date', 'Travel Date', 'Travelers', 'Phone', 'Status', 'Actions'].map(head => (
                  <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="10" className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-8 text-center text-gray-500">No bookings match your search criteria</td>
                </tr>
              ) : (
                filteredBookings.map((booking, index) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.package}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{booking.bookingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">
                      {booking.travelDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <FiUser className="mr-1 text-gray-500" />
                      {booking.travelers} {booking.travelers > 1 ? 'People' : 'Person'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <FiPhone className="mr-1 text-gray-500" />
                      {booking.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigateToBooking(booking.bookingId)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Showing {filteredBookings.length} bookings • Last updated: Today</p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  // Map color names to Tailwind classes
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center">
      <div className={`rounded-full ${colors.bg} p-3 mr-4`}>
        {React.cloneElement(icon, { className: `${colors.text} text-xl` })}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default AdminBookingsPage;