import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { GiSailboat } from 'react-icons/gi';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className='dark:bg-gray-900 text-gray-800'>
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-teal-900/70"></div>
        <div className="relative z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Let's Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-100"
          >
            Our team is ready to help you plan your perfect getaway
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="mt-12"
          >
            <GiSailboat className="inline-block text-5xl text-teal-300 animate-float" />
          </motion.div>
        </div>
      </section>
   
      {/* Main Content */}
      <div className="mx-auto min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-widest uppercase">
              CONTACT US
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              We'd Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">Hear From You</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Have questions or ready to book your next adventure? Our team is here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.form 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 dark:border-gray-700"
            >
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-100 dark:bg-teal-900/20 rounded-full opacity-20"></div>
              
              <h3 className="text-3xl font-bold mb-8 relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
                  Send a Message
                </span>
              </h3>
              
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              
              <div className="mb-6 relative z-10">
                <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="John Doe"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 relative z-10">
                <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="john@example.com"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-8 relative z-10">
                <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Your Message</label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    rows="6"
                    placeholder="Tell us about your travel plans..."
                    required
                  ></textarea>
                  <div className="absolute top-4 right-4">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 group-hover:from-blue-700 group-hover:to-teal-700 rounded-xl shadow-lg"></div>
                <div className="relative z-10 py-4 px-6 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-bold text-white">Sending...</span>
                    </>
                  ) : (
                    <span className="font-bold text-white flex items-center">
                      Send Message
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  )}
                </div>
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <div className="flex flex-col space-y-8">
              {/* Contact Cards */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 dark:border-gray-700"
              >
                <h3 className="text-3xl font-bold mb-8">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
                    Our Contact Details
                  </span>
                </h3>
                
                <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Reach out through any of these channels and we'll respond promptly.
                </p>
                
                <ul className="space-y-6">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start group"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-xl mr-4 shadow-inner group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                      <FaMapMarkerAlt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Our Office</h4>
                      <p className="text-gray-600 dark:text-gray-400">Madikai, Kanhangad, Kerala</p>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-flex items-center hover:underline">
                        View on map
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start group"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-xl mr-4 shadow-inner group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                      <FaPhone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-2">Call Us</h4>
                      <div className="space-y-2">
                        {['+919400440686', '+918547854685', '+918943806318', '+919633628540'].map((number, index) => (
                          <div key={index} className="flex items-center">
                            <a 
                              href={`tel:${number}`} 
                              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                            >
                              <span className="mr-2">{number}</span>
                              <FaWhatsapp className="text-teal-500 ml-2" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start group"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-xl mr-4 shadow-inner group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                      <FaEnvelope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Email Us</h4>
                      <a 
                        href="mailto:vaidehiholidayskanhangad@gmail.com" 
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        vaidehiholidayskanhangad@gmail.com
                      </a>
                      <p className="text-blue-500 dark:text-blue-400 text-sm mt-2">Typically respond within 24 hours</p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
              
              {/* Hours Card */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 dark:border-gray-700"
              >
                <h3 className="text-3xl font-bold mb-8">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400">
                    Business Hours
                  </span>
                </h3>
                
                <div className="space-y-4">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', open: true },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM', open: true },
                    { day: 'Sunday', hours: 'Closed', open: false }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                      <span className="text-lg text-gray-700 dark:text-gray-300">{item.day}</span>
                      <span className={`font-medium ${item.open ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-500'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">24/7 Emergency Support</h3>
                      <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        For urgent travel assistance, call <a href="tel:+919400440686" className="font-semibold underline">+91 9400440686 , +91 8547854685</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};