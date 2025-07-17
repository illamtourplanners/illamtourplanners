import React, { useEffect, useState, useMemo } from "react";
import { FaFolder, FaExclamationCircle, FaSpinner, FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const Materials = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/package/getall');
        setPackages(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Filter packages based on search term
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => 
      pkg.PackageName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  const handlePackageClick = (id) => {
    navigate(`/admin/AdminExpense/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-700">Tour Packages</h1>
        
        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search packages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="text-4xl text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading packages...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
          <FaExclamationCircle className="text-4xl text-red-500 mb-4" />
          <p className="text-red-600 font-medium text-lg mb-2">Error</p>
          <p className="text-gray-600 max-w-md text-center">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-yellow-50 rounded-lg">
              <FaFolder className="text-4xl text-yellow-500 mb-4" />
              <p className="text-gray-600 font-medium">No tour packages available</p>
              <p className="text-gray-500 mt-1">Create your first package to get started</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filteredPackages.length} of {packages.length} packages
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Clear search
                  </button>
                )}
              </div>
              
              {filteredPackages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                  <FaSearch className="text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">No packages found</p>
                  <p className="text-gray-500 mt-1">
                    No packages match "<span className="font-semibold">{searchTerm}</span>"
                  </p>
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredPackages.map((pkg) => (
                    <div
                      key={pkg._id}
                      className="p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white cursor-pointer border border-gray-200 hover:border-blue-300"
                      onClick={() => handlePackageClick(pkg._id)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <FaFolder className="text-2xl text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate">{pkg.PackageName}</h3>
                          <p className="text-xs text-gray-500 truncate">
                            {new Date(pkg.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <p className="flex justify-between">
                          <span className="text-gray-500">Days:</span>
                          <span className="font-medium">{pkg.day}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Nights:</span>
                          <span className="font-medium">{pkg.night}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span className="font-medium text-blue-600">₹{pkg.PricePerPerson.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Materials;