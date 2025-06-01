import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [duration, setDuration] = useState('7');
  const [travelers, setTravelers] = useState(2);
  
  const tourPackages = [
  {
    id: 1,
    name: "Bali Adventure",
    description: "Explore the island of gods with our adventure package",
    price: 899,
    duration: "7 days",
    destinations: ["Ubud", "Uluwatu", "Nusa Penida", "Canggu"],
    features: [
      "Private villa accommodation",
      "Surfing lessons",
      "Water temple tour",
      "Traditional cooking class"
    ],
    highlight: true,
    color: "from-amber-500 to-orange-500",
    image: "bali"
  },
  {
    id: 2,
    name: "European Highlights",
    description: "Discover the best of Europe in one unforgettable journey",
    price: 1499,
    duration: "10 days",
    destinations: ["Paris", "Rome", "Barcelona", "Amsterdam"],
    features: [
      "4-star hotels",
      "Guided city tours",
      "Fast train transfers",
      "Wine tasting experience"
    ],
    highlight: false,
    color: "from-blue-500 to-indigo-600",
    image: "europe"
  },
  {
    id: 3,
    name: "Japanese Discovery",
    description: "Immerse yourself in ancient traditions and modern wonders",
    price: 1799,
    duration: "12 days",
    destinations: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    features: [
      "Traditional ryokan stay",
      "Cherry blossom viewing",
      "Sushi making class",
      "Bullet train experience"
    ],
    highlight: false,
    color: "from-rose-500 to-pink-600",
    image: "japan"
  },
  {
    id: 4,
    name: "African Safari",
    description: "Get close to nature with an unforgettable safari adventure",
    price: 2099,
    duration: "8 days",
    destinations: ["Serengeti", "Ngorongoro", "Lake Manyara", "Tarangire"],
    features: [
      "Luxury tented camps",
      "Big Five game drives",
      "Local village visit",
      "Sunset bush dinner"
    ],
    highlight: true,
    color: "from-yellow-600 to-red-500",
    image: "safari"
  },
  {
    id: 5,
    name: "Australian Escape",
    description: "Explore the land down under from cities to the outback",
    price: 1899,
    duration: "11 days",
    destinations: ["Sydney", "Cairns", "Uluru", "Melbourne"],
    features: [
      "Great Barrier Reef tour",
      "Outback camping",
      "Opera House visit",
      "Wildlife sanctuary"
    ],
    highlight: false,
    color: "from-green-400 to-blue-500",
    image: "australia"
  },
  {
    id: 6,
    name: "South American Explorer",
    description: "Adventure through vibrant cultures and natural wonders",
    price: 1599,
    duration: "10 days",
    destinations: ["Rio de Janeiro", "Buenos Aires", "Machu Picchu", "Lima"],
    features: [
      "Guided ruins exploration",
      "Tango dance class",
      "Amazon river cruise",
      "Street food tasting"
    ],
    highlight: false,
    color: "from-purple-600 to-red-400",
    image: "southamerica"
  },
  {
    id: 7,
    name: "Canadian Rockies",
    description: "Breathtaking landscapes and cozy mountain towns await",
    price: 1399,
    duration: "7 days",
    destinations: ["Banff", "Jasper", "Lake Louise", "Calgary"],
    features: [
      "Glacier walking tour",
      "Hot springs pass",
      "Wildlife viewing",
      "Lakeside picnic"
    ],
    highlight: true,
    color: "from-cyan-500 to-blue-700",
    image: "canada"
  },
  {
    id: 8,
    name: "Thailand Getaway",
    description: "Discover tropical paradise and rich culture",
    price: 999,
    duration: "9 days",
    destinations: ["Bangkok", "Chiang Mai", "Phuket", "Krabi"],
    features: [
      "Temple hopping",
      "Thai cooking class",
      "Island snorkeling",
      "Elephant sanctuary visit"
    ],
    highlight: false,
    color: "from-lime-400 to-green-600",
    image: "thailand"
  },
  {
    id: 9,
    name: "Northern Lights Iceland",
    description: "Chase the aurora and explore dramatic landscapes",
    price: 1899,
    duration: "6 days",
    destinations: ["Reykjavik", "Golden Circle", "Vik", "Blue Lagoon"],
    features: [
      "Northern lights tour",
      "Geothermal spa",
      "Glacier hike",
      "Volcano museum"
    ],
    highlight: true,
    color: "from-teal-600 to-indigo-800",
    image: "iceland"
  },
  {
    id: 10,
    name: "Greek Island Hopping",
    description: "Sail across the stunning Aegean Sea and island gems",
    price: 1299,
    duration: "8 days",
    destinations: ["Santorini", "Mykonos", "Naxos", "Athens"],
    features: [
      "Ferry island transfers",
      "Beachside resorts",
      "Ancient ruins tours",
      "Mediterranean cuisine tasting"
    ],
    highlight: false,
    color: "from-sky-500 to-blue-900",
    image: "greece"
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
    on: { backgroundColor: "#0ea5e9" }
  };

  const handleSelect = (id) => {
    setSelectedPackage(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
              WORLD EXPLORER
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our handcrafted tour packages designed for unforgettable experiences
          </p>
        </motion.div>

        

        {/* Package Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 "
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
                  MOST POPULAR
                </div>
              )}
              
              {/* Package Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">{pkg.name}</h3>
                </div>
              </div>
              
              <div className="bg-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600">{pkg.duration} • {pkg.destinations.length} destinations</p>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{pkg.name}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">from</p>
                    <p className="text-3xl font-bold text-sky-600">${pkg.price}</p>
                    <p className="text-gray-500 text-sm">per person</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{pkg.description}</p>
                
                <div className="mb-6 mt-">
                  <h4 className="font-semibold text-gray-900 mb-3">Destinations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.destinations.map((destination, index) => (
                      <motion.span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {destination}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-3">Included:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    className="flex-1 py-3 px-6 rounded-lg font-bold text-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Select
                  </motion.button>
                  
                  
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Testimonials */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Travelers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                tour: "Bali Adventure",
                comment: "The Bali Adventure tour exceeded all my expectations! The surfing lessons and temple tours were incredible. Highly recommend!",
                rating: 5
              },
              {
                name: "Michael Chen",
                tour: "Japanese Discovery",
                comment: "An amazing cultural immersion. The ryokan stay was a highlight. Everything was perfectly organized from start to finish.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sky-600">{testimonial.tour}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Our travel experts are ready to help you plan the perfect getaway
          </p>
          <motion.button
            className="bg-white text-sky-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Travel Experts
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;