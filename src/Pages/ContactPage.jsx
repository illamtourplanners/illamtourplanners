import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're here to help and answer any questions you might have. 
            <span className="block mt-2 text-blue-600 dark:text-blue-400 font-medium">Let's create something amazing together!</span>
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
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-white backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
          >
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Drop Us a Line
            </h3>
            
            <div className="mb-6">
              <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="mb-8">
              <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                rows="6"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-white backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
            >
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Reach Out Directly
              </h3>
              
              <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Whether you have questions about our services or just want to say hello, we're all ears and ready to connect.
              </p>
              
              <ul className="space-y-8">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Madikai, Kanhangad</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Visit us for a cup of coffee!</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Phone Numbers</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href="tel:+919400440686">+91 9400440686</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href="tel:+918547854685">+91 8547854685</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href="tel:+918943806318">+91 8943806318</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href="tel:+919633628540">+91 9633628540</a>
                      </p>
                    </div>
                  </div>
                </motion.li>
                
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <a href="mailto:illamtourplanners@gmail.com">illamtourplanners@gmail.com</a>
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Response within 24 hours</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-white backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
            >
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                When We're Available
              </h3>
              <ul className="space-y-6 text-gray-600 dark:text-gray-300">
                <li className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-lg">Monday - Friday</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-lg">Saturday</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-lg">Sunday</span>
                  <span className="font-medium text-gray-500 dark:text-gray-500">Closed</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};