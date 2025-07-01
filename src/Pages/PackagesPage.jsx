// src/components/PackagesPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { GiSuitcase, GiWorld, GiPearlNecklace } from 'react-icons/gi';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import { motion } from 'framer-motion';

export const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [expandedPackages, setExpandedPackages] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const testimonialRef = useRef(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const redirect = (id) => {
    navigate(`/address/${id}`);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedPackages);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpandedPackages(newExpanded);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="rounded-full h-20 w-20 border-t-4 border-b-4 border-teal-500"></div>
          <GiSuitcase className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500 text-2xl" />
        </motion.div>
        <motion.span 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300"
        >
          Discovering exotic destinations...
        </motion.span>
      </div>
    );
  }

  const testimonials = [
    {
      text: `"Vaidehi Holidays gave me an authentic taste of Kerala’s rich culture — truly an unforgettable experience."`,
      author: "Unnikrishnan",
      role: "Luxury Traveler"
    },
    {
      text: `"It wasn’t just a trip — it was a deep dive into Kerala’s soul. Vaidehi Holidays made it magical."`,
      author: "Priya Menon",
      role: "Cultural Explorer"
    },
    {
      text: `"The cultural immersion was beyond anything I expected. Vaidehi Holidays showed me the real Kerala."`,
      author: "Arjun Kumar",
      role: "Adventure Seeker"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-b from-blue-50 to-teal-50 text-gray-800'}`}>
      

      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/80 to-blue-800/80"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Discover <span className="text-amber-300">Luxury</span> Travel
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-10 font-light">
              Immerse yourself in extraordinary journeys crafted by our travel artisans
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 relative inline-block"
            >
              <span className="relative z-10">Curated Travel Experiences</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-amber-200/50 z-0"></span>
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Each package is a masterpiece, blending luxury, adventure, and cultural immersion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => redirect(pkg._id)}
                className={`group rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-white'} shadow-lg hover:shadow-2xl`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.PackageName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300?text=Travel+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => toggleFavorite(pkg._id, e)}
                      className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                      aria-label={favorites.has(pkg._id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorites.has(pkg._id) ?
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <FaHeart className="text-amber-500" />
                        </motion.div> :
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
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
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
                      <div className="w-full">
                        <div className="flex justify-between items-center w-full mb-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Package Includes
                          </h4>
                          <button 
                            onClick={(e) => toggleExpand(pkg._id, e)}
                            className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            {expandedPackages.has(pkg._id) ? 'Show Less' : 'Show More'}
                          </button>
                        </div>
                        
                        <ul className="space-y-1.5">
                          {Array.isArray(pkg.includes) ? (
                            pkg.includes
                              .slice(0, expandedPackages.has(pkg._id) ? pkg.includes.length : 2)
                              .map((item, index) => (
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
                      <span>{pkg.day || 'N/A'} days</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-full text-sm shadow-md hover:shadow-lg transition-shadow"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="py-20 bg-[url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-teal-900/80"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block p-3 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <GiWorld className="text-3xl text-amber-300" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready for Your <span className="text-amber-300">Dream</span> Vacation?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Our concierge team will craft a completely personalized experience just for you
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a 
              href='/contact'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                Book a Consultation
              </button>
            </motion.a>
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

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-750 shadow-xl">
              <div 
                ref={testimonialRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="min-w-full p-8"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-amber-400 mx-0.5" />
                        ))}
                      </div>
                      <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                        {testimonial.text}
                      </p>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                        <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === index 
                      ? 'bg-teal-500 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
  
    </div>
  );
};