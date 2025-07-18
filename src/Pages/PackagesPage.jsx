
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Heart, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight,
  Globe,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [expandedPackages, setExpandedPackages] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // ... keep existing code (useEffect hooks and data fetching logic)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get("/package/dataforhome");
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
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative mb-8"
        >
          <div className="rounded-full h-24 w-24 border-4 border-emerald-200 border-t-emerald-600 shadow-lg"></div>
          <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600 w-8 h-8" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Crafting Your Perfect Journey</h3>
          <p className="text-gray-600">Discovering premium destinations worldwide...</p>
        </motion.div>
      </div>
    );
  }

  const testimonials = [
    {
      text: "Vaidehi Holidays exceeded every expectation. The attention to detail and personalized service made our Kerala journey absolutely magical.",
      author: "Unnikrishnan Menon",
      role: "Luxury Traveler",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "From the moment we landed to our departure, every detail was flawlessly orchestrated. This wasn't just a trip—it was a transformative experience.",
      author: "Priya Sharma",
      role: "Cultural Explorer",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c9a9?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "The cultural immersion was beyond anything I expected. Vaidehi Holidays showed me the authentic soul of Kerala through experiences money can't typically buy.",
      author: "Arjun Kumar",
      role: "Adventure Seeker", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Packages', icon: Globe },
    { id: 'premium', label: 'Premium', icon: Award },
    { id: 'cultural', label: 'Cultural', icon: Sparkles },
    { id: 'adventure', label: 'Adventure', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-emerald-900/90"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="flex items-center space-x-2 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Premium Travel Experiences</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl">
              Discover <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">Luxury</span> Travel
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 mb-12 font-light leading-relaxed">
              Immerse yourself in extraordinary journeys crafted by our travel artisans. 
              Every detail curated for the discerning traveler seeking authentic luxury.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              
              
              <div className="flex items-center space-x-4 text-white/80">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">4.9/5</span>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>500+ Happy Travelers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      

      {/* Packages Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Curated Travel Experiences
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Each package is a masterpiece, blending luxury, adventure, and cultural immersion into unforgettable journeys
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
            <AnimatePresence>
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => redirect(pkg._id)}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.PackageName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Premium+Destination";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      <div className="flex space-x-2">
                        <div className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </div>
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                          Premium
                        </div>
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(pkg._id, e)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                      >
                        <Heart 
                          className={`w-5 h-5 transition-colors ${
                            favorites.has(pkg._id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600 hover:text-red-400'
                          }`} 
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{pkg.PackageName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/90">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{pkg.day || 'N/A'} days</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>Small Groups</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white drop-shadow-lg">
                            ₹{pkg.PricePerPerson}
                          </div>
                          <div className="text-white/80 text-sm">per person</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">Premium Location</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-2 flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Experience Highlights</span>
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="p-4 bg-white/80 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Inclusions</span>
                          </h4>
                          <button 
                            onClick={(e) => toggleExpand(pkg._id, e)}
                            className="text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            {expandedPackages.has(pkg._id) ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            }
                          </button>
                        </div>
                        
                        <ul className="space-y-2">
                          {Array.isArray(pkg.includes) ? (
                            pkg.includes
                              .slice(0, expandedPackages.has(pkg._id) ? pkg.includes.length : 3)
                              .map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{item}</span>
                                </li>
                              ))
                          ) : (
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                {pkg.includes || 'Premium inclusions available'}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>Flexible Dates</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Award Winner</span>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Travelers <span className="text-amber-300">Love Us</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our globetrotting guests
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="min-w-full p-12"
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-20 h-20 rounded-full mb-6 border-4 border-white/20 shadow-lg"
                      />
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-amber-400 fill-current mx-0.5" />
                        ))}
                      </div>
                      <p className="text-xl italic text-white mb-8 max-w-3xl leading-relaxed">
                        {testimonial.text}
                      </p>
                      <div>
                        <h4 className="font-bold text-xl text-white mb-1">{testimonial.author}</h4>
                        <p className="text-blue-200">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-amber-400 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-4 mb-8 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200">
              <Globe className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Ready for Your <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Dream</span> Vacation?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our concierge team will craft a completely personalized experience just for you. 
              Let's turn your travel dreams into extraordinary memories.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.a 
                href='/contact'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2">
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.a>
              <motion.a 
                href='/about'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  Learn More About Us
                </button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
