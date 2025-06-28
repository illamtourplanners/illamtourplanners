// src/components/PackagesPage.jsx
import React, { useEffect, useState } from 'react';
import { GiSuitcase, GiWorld, GiPearlNecklace } from 'react-icons/gi';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

export const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get("/package/getall");
        setPackages(response.data.data);
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

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-teal-500"></div>
          <GiSuitcase className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500 text-2xl" />
        </div>
        <span className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300">
          Discovering exotic destinations...
        </span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-b from-blue-50 to-teal-50 text-gray-800'}`}>
      {/* Hero Section with Parallax Effect */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/80 to-blue-800/80"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-float">
            <GiPearlNecklace className="text-2xl text-amber-300 mr-2" />
            <span className="text-white font-medium">Premium Experiences</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Discover <span className="text-amber-300">Luxury</span> Travel
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-10 font-light">
            Immerse yourself in extraordinary journeys crafted by our travel artisans
          </p>
          <button className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore Collections
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 relative -mt-12 z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">Curated Travel Experiences</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-amber-200/50 z-0"></span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Each package is a masterpiece, blending luxury, adventure, and cultural immersion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg._id}
                onClick={() => redirect(pkg._id)}
                className={`group rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-white'}`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.PackageName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => toggleFavorite(pkg._id, e)}
                      className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                    >
                      {favorites.has(pkg._id) ? 
                        <FaHeart className="text-amber-500" /> : 
                        <FaRegHeart className="text-gray-700 dark:text-gray-300" />
                      }
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <div className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full mr-2 flex items-center">
                      <IoIosFlash className="mr-1" /> Featured
                    </div>
                    <div className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-sm font-semibold rounded-full">
                      ${pkg.PricePerPerson} <span className="font-normal">/person</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {pkg.PackageName}
                    </h3>
                    <div className="flex items-center text-amber-400">
                      <FaStar className="text-sm" />
                      <FaStar className="text-sm" />
                      <FaStar className="text-sm" />
                      <FaStar className="text-sm" />
                      <FaStar className="text-sm" />
                    </div>
                  </div>
                  
                  {/* <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-teal-500 flex-shrink-0" />
                    <span className="truncate">{pkg.description}</span>
                  </div> */}

<div className="mb-4 group">
  <div className="flex items-start p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-md">
    <div className="p-1.5 mr-3 bg-teal-100/80 dark:bg-teal-900/30 rounded-lg">
      <FaMapMarkerAlt className="text-teal-500 dark:text-teal-400" />
    </div>
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
        Destination Feature
      </h4>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {pkg.description}
      </p>
    </div>
  </div>
   
</div>
<div className="mb-4">
  <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="p-1.5 mr-3 bg-amber-100/80 dark:bg-amber-900/30 rounded-lg flex-shrink-0">
      <GiSuitcase className="text-amber-600 dark:text-amber-400" />
    </div>
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
        Package Includes
      </h4>
      <ul className="space-y-1.5">
        {Array.isArray(pkg.includes) ? (
          pkg.includes.map((item, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item}
              </span>
            </li>
          ))
        ) : (
          <li className="flex items-start">
            <svg className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {pkg.includes || 'No inclusions listed'}
            </span>
          </li>
        )}
      </ul>
    </div>
  </div>
</div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt className="mr-2 text-teal-500" />
                      <span>{pkg.day} days</span>
                    </div>
                    <button className="px-4 py-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium rounded-full text-sm hover:bg-teal-500 hover:text-white transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="py-20 bg-[url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block p-3 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <GiWorld className="text-3xl text-amber-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready for Your <span className="text-amber-300">Dream</span> Vacation?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Our concierge team will craft a completely personalized experience just for you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book a Consultation
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full border-2 border-white transition-all duration-300 transform hover:scale-105">
              View Sample Itineraries
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Travelers <span className="text-teal-500">Love Us</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our globetrotting guests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-white hover:bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "The attention to detail in their packages is unmatched. Every moment felt special and well-curated."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item+20}.jpg`} 
                      alt="Traveler" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Luxury Traveler</p>
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