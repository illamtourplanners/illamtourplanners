import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaLeaf, FaRoute, FaUserTie, FaHandsHelping } from 'react-icons/fa';
import { GiPathDistance, GiJourney } from 'react-icons/gi';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [duration, setDuration] = useState('7');
  const [travelers, setTravelers] = useState(2);
  
  const tourPackages = [
    {
      id: 1,
      name: "Kerala Backwaters",
      description: "Experience the serene beauty of Kerala's famous backwaters",
      price: 899,
      duration: "7 days",
      destinations: ["Alleppey", "Kumarakom", "Kochi", "Marari"],
      features: [
        "Houseboat stay",
        "Traditional canoe rides",
        "Village walks",
        "Ayurvedic massage"
      ],
      highlight: true,
      color: "from-amber-500 to-amber-700",
      image: "kerala"
    },
    {
      id: 2,
      name: "Cultural Kerala",
      description: "Immerse yourself in Kerala's rich cultural heritage",
      price: 1099,
      duration: "8 days",
      destinations: ["Thrissur", "Guruvayur", "Kodungallur", "Chettuva"],
      features: [
        "Temple visits",
        "Kathakali performance",
        "Theyyam ritual",
        "Traditional kalarippayattu"
      ],
      highlight: false,
      color: "from-amber-400 to-amber-600",
      image: "cultural"
    },
    {
      id: 3,
      name: "Western Ghats Trek",
      description: "Explore the biodiversity hotspot of Western Ghats",
      price: 1299,
      duration: "6 days",
      destinations: ["Munnar", "Wayanad", "Silent Valley", "Periyar"],
      features: [
        "Guided nature walks",
        "Tea plantation tour",
        "Wildlife spotting",
        "Eco-lodge stay"
      ],
      highlight: true,
      color: "from-green-600 to-amber-600",
      image: "ghats"
    },
    {
      id: 4,
      name: "Kerala Beach Escape",
      description: "Relax on Kerala's pristine beaches and coastal towns",
      price: 999,
      duration: "7 days",
      destinations: ["Kovalam", "Varkala", "Bekal", "Kappad"],
      features: [
        "Beachfront resorts",
        "Sunset cruises",
        "Seafood cooking class",
        "Yoga sessions"
      ],
      highlight: false,
      color: "from-blue-500 to-amber-500",
      image: "beach"
    },
    {
      id: 5,
      name: "Spice Trail",
      description: "Discover Kerala's famous spice plantations",
      price: 1199,
      duration: "5 days",
      destinations: ["Thekkady", "Kumily", "Peermade", "Wagamon"],
      features: [
        "Spice plantation tours",
        "Cooking demonstrations",
        "Cardamom hills trek",
        "Local market visits"
      ],
      highlight: false,
      color: "from-yellow-600 to-amber-600",
      image: "spice"
    },
    {
      id: 6,
      name: "Kerala Wildlife",
      description: "Explore Kerala's diverse wildlife sanctuaries",
      price: 1399,
      duration: "7 days",
      destinations: ["Periyar", "Parambikulam", "Eravikulam", "Chinnar"],
      features: [
        "Jungle safaris",
        "Bamboo rafting",
        "Nature photography",
        "Tribal village visit"
      ],
      highlight: false,
      color: "from-green-700 to-amber-700",
      image: "wildlife"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const toggleVariants = {
    off: { backgroundColor: "#f3f4f6" },
    on: { backgroundColor: "#f59e0b" }
  };

  const handleSelect = (id) => {
    setSelectedPackage(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mt-14 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
              ILLAM TOUR PLANNERS
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Kerala's Hidden Gems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select from our handcrafted tour packages designed for authentic Kerala experiences
          </p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tourPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden shadow-xl ${
                pkg.highlight ? "transform lg:scale-100 z-10 ring-2 ring-amber-400" : ""
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-4 left-0 bg-amber-400 text-gray-900 font-bold px-4 py-1 rounded-r-full text-sm z-20 shadow-md">
                  RECOMMENDED
                </div>
              )}
              
              {/* Package Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">{pkg.name}</h3>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">{pkg.duration} • {pkg.destinations.length} destinations</p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{pkg.name}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">from</p>
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">₹{pkg.price}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">per person</p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">{pkg.description}</p>
                
                <div className="mb-6 mt-">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Destinations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.destinations.map((destination, index) => (
                      <motion.span 
                        key={index}
                        className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {destination}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Included:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    className="flex-1 py-3 px-6 rounded-lg font-bold text-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Details
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 px-6 rounded-lg font-bold text-lg bg-amber-500 text-white hover:bg-amber-600"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats Section */}
        <section className="mt-24 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            Why Choose Illam Tour Planners
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { value: '100+', label: 'Happy Travelers', icon: <FaUserTie className="text-2xl text-amber-600 dark:text-amber-400" /> },
              { value: '15+', label: 'Unique Destinations', icon: <GiPathDistance className="text-2xl text-amber-600 dark:text-amber-400" /> },
              { value: '50+', label: 'Local Partnerships', icon: <FaHandsHelping className="text-2xl text-amber-600 dark:text-amber-400" /> },
              { value: '100%', label: 'Eco-Conscious', icon: <FaLeaf className="text-2xl text-amber-600 dark:text-amber-400" /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Testimonials */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            What Our Travelers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                tour: "Kerala Backwaters",
                comment: "The houseboat experience was magical! Illam Tour Planners showed us the authentic Kerala that we would never have discovered on our own.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Chen",
                tour: "Cultural Kerala",
                comment: "An amazing cultural immersion. The Kathakali performance and temple visits were highlights. Everything was perfectly organized.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-amber-600 dark:text-amber-400">{testimonial.tour}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-500'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-800 rounded-3xl p-8 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Kerala Adventure?</h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-8">
              Our travel experts are ready to help you plan the perfect Kerala getaway
            </p>
            <motion.button
              className="bg-white text-amber-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Travel Experts
            </motion.button>
            <div className="mt-8">
              <GiJourney className="inline-block text-4xl text-amber-200 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;