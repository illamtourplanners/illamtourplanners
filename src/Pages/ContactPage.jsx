import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { GiPathDistance, GiJourney } from 'react-icons/gi';
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
    <div  className='dark:bg-gray-900 text-gray-800'>
 <section
  className="relative bg-[url('https://themewagon.github.io/pacific/images/bg_1.jpg')] bg-cover bg-center py-24 text-center opacity-75 text-white overflow-hidden"
>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.travelandleisure.com/thmb/3xJDPQxG1W8Q0w6TZ-6I7jXzQoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kerala-backwaters-KERALAOUT0218-1a9b5a8a7e2c4a7d9e3b5c5e5e5e5e5e.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Get In Touch 
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
             We're here to help and answer any questions you might have. 
          </p>
          <div className="mt-8">
            <GiJourney className="inline-block text-4xl text-amber-200 animate-bounce" />
          </div>
        </div>
      </section>
   
      <div className=" mx-auto min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-amber-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
          >
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500">
              Drop Us a Line
            </h3>
            
            <div className="mb-6">
              <label className="block mb-3 text-md font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-amber-300"
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
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-amber-300"
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
                className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-amber-300"
                rows="6"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-amber-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
            >
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500">
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
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <FaMapMarkerAlt className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Madikai, Kanhangad</p>
                    <p className="text-amber-500 dark:text-amber-400 text-sm mt-2">Visit us for a cup of coffee!</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <FaPhone className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Phone Numbers</h4>
                    <div className="space-y-1">
                      <p className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        <a href="tel:+919400440686">+91 9400440686</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        <a href="tel:+918547854685">+91 8547854685</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        <a href="tel:+918943806318">+91 8943806318</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        <a href="tel:+919633628540">+91 9633628540</a>
                      </p>
                    </div>
                  </div>
                </motion.li>
                
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl mr-4 shadow-inner">
                    <FaEnvelope className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      <a href="mailto:illamtourplanners@gmail.com">illamtourplanners@gmail.com</a>
                    </p>
                    <p className="text-amber-500 dark:text-amber-400 text-sm mt-2">Response within 24 hours</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-opacity-20 border-amber-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
            >
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500">
                When We're Available
              </h3>
              <ul className="space-y-6 text-gray-600 dark:text-gray-300">
                <li className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-lg">Monday - Friday</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-lg">Saturday</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">10:00 AM - 4:00 PM</span>
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