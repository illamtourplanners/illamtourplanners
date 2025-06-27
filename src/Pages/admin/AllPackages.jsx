import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminPackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
const navigate=useNavigate()
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/package/getall');
        console.log(response.data.data);
        
        if (response.data.success) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.PackageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.dropoff?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

 const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this package?")) {
    try {
      const response = await axiosInstance.delete(`/package/delete/${id}`);
      if (response.data.success) {
        // Update the UI after successful deletion
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      } else {
        alert("Failed to delete package.");
      }
    } catch (err) {
      console.error("Error deleting package:", err);
      alert("An error occurred while deleting the package.");
    }
  }
};



const nav = (id) => {
    navigate(`/admin/passengers/${id}`);
  };

  // Pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-700 mb-4 sm:mb-0">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
          <span className="font-medium">{Math.min(indexOfLastItem, filteredPackages.length)}</span> of{' '}
          <span className="font-medium">{filteredPackages.length}</span> results
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            &larr; Prev
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const page = currentPage <= 3 
              ? i + 1 
              : currentPage >= totalPages - 2 
                ? totalPages - 4 + i 
                : currentPage - 2 + i;
                
            return page <= totalPages && page > 0 ? (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ) : null;
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Package Management</h1>
            <p className="text-gray-600 mt-1">Manage all tour packages and itineraries</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Package
          </button>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search packages by name or location..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Package Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                      <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPackages.length > 0 ? (
                      currentPackages.map(pkg => (
                        <tr key={pkg._id} className="hover:bg-gray-50 transition">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{pkg.PackageName}</div>
                            <div className="text-xs text-gray-500 sm:hidden">{pkg.night}N/{pkg.day}D</div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                            ₹{pkg.PricePerPerson.toLocaleString()}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                            {new Date(pkg.date).toLocaleDateString('en-IN')}
                          </td>
                          <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                            {pkg.night}N / {pkg.day}D
                          </td>
                          <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-gray-500 max-w-[160px] truncate">
                            {pkg.pickupPoints?.join(', ') || '-'}
                          </td>
                          <td className="hidden lg:table-cell px-4 sm:px-6 py-4 text-gray-500">
                            {pkg.dropoff}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                              onClick={() => nav(pkg.pkgNumber)}
                               className="text-blue-600 hover:text-blue-900 transition flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </button>
                              <button 
                                onClick={() => handleDelete(pkg._id)}
                                className="text-red-600 hover:text-red-900 transition flex items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className="text-gray-500 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg font-medium">No packages found</p>
                            <p className="mt-1">Try adjusting your search or create a new package</p>
                            <button 
                              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                              onClick={() => setSearchTerm('')}
                            >
                              Clear search
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPackagesPage;