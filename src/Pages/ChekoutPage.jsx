import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    primaryTraveler: {
      fullname: '',
      age: '',
      gender: 'male',
      email: '',
      phone: '',
    },
    additionalTravelers: [],
    specialRequests: '',
    paymentMethod: 'creditCard'
  });
  
  const packageDetails = {
    title: "Bali Paradise Escape",
    description: "7 days of luxury in Bali's most stunning locations with private villas, gourmet dining, and exclusive experiences.",
    duration: "7 Days / 6 Nights",
    price: 1899,
    discount: 15,
    inclusions: [
      "Luxury accommodation",
      "Daily breakfast & 3 dinners",
      "Airport transfers",
      "Private guided tours",
      "Spa treatment",
      "24/7 concierge service"
    ],
    image: "bali-villa.jpg",
    startDate: "June 15, 2025",
    endDate: "June 22, 2025"
  };
  
  // Calculate discounted price
  const discountedPrice = packageDetails.price * (1 - packageDetails.discount / 100);
  
  const handleChange = (e, travelerIndex, field) => {
    const { name, value } = e.target;
    
    if (travelerIndex === 'primary') {
      setFormData(prev => ({
        ...prev,
        primaryTraveler: {
          ...prev.primaryTraveler,
          [name]: value
        }
      }));
    } else if (travelerIndex === 'special') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      const updatedTravelers = [...formData.additionalTravelers];
      updatedTravelers[travelerIndex] = {
        ...updatedTravelers[travelerIndex],
        [name]: value
      };
      
      setFormData(prev => ({
        ...prev,
        additionalTravelers: updatedTravelers
      }));
    }
  };
  
  const addTraveler = () => {
    setFormData(prev => ({
      ...prev,
      additionalTravelers: [
        ...prev.additionalTravelers,
        {
          fullName: '',
          age: '',
          gender: 'male',
        }
      ]
    }));
  };
  
  const removeTraveler = (index) => {
    const updatedTravelers = [...formData.additionalTravelers];
    updatedTravelers.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      additionalTravelers: updatedTravelers
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Booking confirmed! Check your email for details.');
  };
  
  return (
    <div className="min-h-screen mt- bg-gradient-to-br from-cyan-50 to-blue-100 py-8 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mt-24 mb-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800"
          >
            Complete Your Booking
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-600 mt-2"
          >
            Finalize your dream vacation in just a few steps
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Package Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/5"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-48 rounded-t-2xl flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h2 className="text-3xl font-bold mb-2">{packageDetails.title}</h2>
                    <p className="text-xl">{packageDetails.duration}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold py-1 px-3 rounded-full">
                  {packageDetails.discount}% OFF
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Travel Dates</h3>
                    <p className="text-gray-600">{packageDetails.startDate} - {packageDetails.endDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through mr-2">₹{packageDetails.price}</span>
                    <span className="text-2xl font-bold text-blue-600">₹{discountedPrice.toFixed(2)}</span>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Package Includes:</h3>
                  <ul className="space-y-2">
                    {packageDetails.inclusions.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Package Price ({formData.additionalTravelers.length + 1} travelers)</span>
                    <span className="text-gray-800 font-medium">₹{(discountedPrice * (formData.additionalTravelers.length + 1)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600 font-medium">-₹{(packageDetails.price * packageDetails.discount / 100 * (formData.additionalTravelers.length + 1)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="text-gray-800 font-medium">₹49.99</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{(discountedPrice * (formData.additionalTravelers.length + 1) + 49.99).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Customer Details Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-3/5"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Traveler Information</h2>
                <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {formData.additionalTravelers.length + 1} Traveler(s)
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Primary Traveler */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Primary Traveler</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.primaryTraveler.fullName}
                        onChange={(e) => handleChange(e, 'primary')}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="John"
                      />
                    </div>
                    
                   
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        min="1"
                        max="120"
                        value={formData.primaryTraveler.age}
                        onChange={(e) => handleChange(e, 'primary')}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="30"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.primaryTraveler.gender}
                        onChange={(e) => handleChange(e, 'primary')}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.primaryTraveler.email}
                        onChange={(e) => handleChange(e, 'primary')}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.primaryTraveler.phone}
                        onChange={(e) => handleChange(e, 'primary')}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Additional Travelers */}
                <AnimatePresence>
                  {formData.additionalTravelers.map((traveler, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8 border border-gray-200 rounded-xl p-6 relative"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold">{index + 2}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">Additional Traveler</h3>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeTraveler(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor={`fullName-₹{index}`} className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            id={`fullName-₹{index}`}
                            name="fullName"
                            value={traveler.fullName}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Jane"
                          />
                        </div>
                        
                       
                        
                        <div>
                          <label htmlFor={`age-₹{index}`} className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                          <input
                            type="number"
                            id={`age-₹{index}`}
                            name="age"
                            min="1"
                            max="120"
                            value={traveler.age}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="28"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor={`gender-₹{index}`} className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                          <select
                            id={`gender-₹{index}`}
                            name="gender"
                            value={traveler.gender}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                        
                      
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="mb-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={addTraveler}
                    className="flex items-center text-blue-600 font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add Another Traveler
                  </motion.button>
                </div>
                
            
                
                
                
                <div className="flex  flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-lg font-bold text-gray-800">Total: 
                      <span className="text-blue-600 ml-2">
                        ₹{(discountedPrice * (formData.additionalTravelers.length + 1) + 49.99).toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">Includes all taxes and fees</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt- sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                  >
                    Complete Booking
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;