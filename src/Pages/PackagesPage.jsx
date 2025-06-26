// src/components/PackagesPage.jsx
import React, { useEffect, useState } from 'react';
import { GiJourney } from 'react-icons/gi';
import { FaBath, FaBed, FaUmbrellaBeach, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

export const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Mock data instead of API call
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get("/package/getall");
        setPackages(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const redirect = (id) => {
    navigate(`/address/${id}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-xl">Loading packages...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
    
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Discover Our Upcoming Packages</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-10">
            Get ready to explore beautiful destinations with our curated travel packages. Adventure awaits you!
          </p>
          <div className="animate-bounce">
            <GiJourney className="inline-block text-5xl text-amber-300" />
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel Packages</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our handpicked travel experiences designed to create unforgettable memories
            </p>
          </div>
          
          <div className={`grid ${packages.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {packages.map((pkg) => (
              <div 
                key={pkg._id}
                onClick={() => redirect(pkg._id)}
                className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.PackageName} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    ${pkg.PricePerPerson}/person
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-orange-500 font-semibold uppercase flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {pkg.day} Days Tour
                  </p>
                  <h3 className="text-xl font-bold mt-2 mb-3">{pkg.PackageName}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    <span>{pkg.dropoff}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <FaBed className="mr-2 text-orange-500" />
                      <span>2 Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-2 text-orange-500" />
                      <span>Private Bath</span>
                    </div>
                    <div className="flex items-center">
                      <FaUmbrellaBeach className="mr-2 text-orange-500" />
                      <span>Beach</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};