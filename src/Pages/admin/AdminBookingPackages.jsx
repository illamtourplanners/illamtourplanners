import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminBookingPackages = () => {
  const [packages, setPackages] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get('/package/getall');
        if (response.data.success) {
          setPackages(response.data.data); // Assuming your data is in data.data
          console.log(response.data.data);
          
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);


   const nav = (id) => {
    navigate(`/admin/bookings/${id}`);
   }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Packages
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Browse through our curated collection of packages
          </p>
          
          {/* Search and Filter */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search packages..."
                className="flex-1 min-w-0 block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded-l-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <button className="px-6 py-2 bg-blue-600 text-white font-medium text-base leading-tight rounded-r-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out">
                Search
              </button>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full cursor-pointer">
                Popular
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-pointer">
                Newest
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-pointer">
                Trending
              </span>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {packages.map((pkg) => (
    <div key={pkg._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition duration-300">
      <img src={pkg.image} alt={pkg.packageName} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{pkg.packageName}</h3>
        <p className="text-sm text-gray-500 mb-2">Date: {new Date(pkg.date).toLocaleDateString()}</p>
        <p className="text-gray-600 line-clamp-3">{pkg.description}</p>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">Price per person: ₹{pkg.PricePerPerson}</p>
          <p className="text-sm text-gray-500">Advance: ₹{pkg.advancePrice}</p>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Pickup Points: {pkg.pickupPoints.join(', ')}
        </div>
        
        <button
        onClick={() => nav(pkg.pkgNumber)}

         className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  ))}
</div>


        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">
              Previous
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              1
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
              2
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingPackages;