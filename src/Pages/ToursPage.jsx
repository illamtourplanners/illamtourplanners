import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSailboat, GiFlowerTwirl } from 'react-icons/gi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function WeddingGallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/tour/getall');
        setPosts(response.data.posts);
        
        const initialFavorites = {};
        response.data.posts.forEach(post => {
          initialFavorites[post._id] = false;
        });
        setFavorites(initialFavorites);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError("Failed to load galleries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const toggleFavorite = (postId) => {
    setFavorites(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Multiple pattern sequences for varied layouts
  const patternSequences = [
    // Pattern 1: Balanced layout
    [
      "col-span-2 row-span-2",       // Large square
      "col-span-1 row-span-1",       // Small
      "col-span-1 row-span-1",       // Small
      "col-span-1 row-span-1",       // Small
      "col-span-1 row-span-1",       // Small
      "col-span-2 md:col-span-4 row-span-1" // Wide rectangle
    ],
    // Pattern 2: Horizontal emphasis
    [
      "col-span-2 md:col-span-4 row-span-1", // Wide top
      "col-span-1 row-span-1",             
      "col-span-1 row-span-1",             
      "col-span-2 row-span-2",             // Large square
      "col-span-1 row-span-1",             
      "col-span-1 row-span-1"              
    ],
    // Pattern 3: Vertical flow
    [
      "col-span-1 row-span-2",           // Tall
      "col-span-1 row-span-1",           // Small
      "col-span-1 row-span-1",           // Small
      "col-span-1 row-span-2",           // Tall
      "col-span-2 row-span-1 md:col-span-2", // Medium wide
      "col-span-1 row-span-1"            // Small
    ],
    // Pattern 4: Diagonal emphasis
    [
      "col-span-1 row-span-1",           // Small
      "col-span-1 row-span-2",           // Tall
      "col-span-1 row-span-1",           // Small
      "col-span-1 row-span-1",           // Small
      "col-span-1 row-span-2",           // Tall
      "col-span-2 row-span-2 md:col-span-3"  // Large rectangle
    ]
  ];

  const getImageSrc = (src) => src || 'https://via.placeholder.com/500x500?text=Wedding+Image';

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Hero Section */}
      <section className="relative bg-[url('https://radiancetour.com/wp-content/uploads/2024/01/thai-3.jpg')] bg-cover bg-center py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/70 to-pink-700/70"></div>
        <div className="relative z-10 px-4 container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg"
          >
            Our Tour Galleries
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-rose-100 font-light"
          >
            Cherished moments from beautiful celebrations
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="mt-12 flex justify-center"
          >
            <GiFlowerTwirl className="text-5xl text-rose-200 animate-spin-slow" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 max-w-screen-2xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-rose-500 text-4xl"
            >
              <GiFlowerTwirl />
            </motion.div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-rose-700 text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {posts.map((post, sectionIndex) => {
              const images = post.images.slice(0, 6);
              // Select pattern based on gallery index
              const pattern = patternSequences[sectionIndex % patternSequences.length];
              
              return (
                <motion.div 
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-20 bg-white rounded-2xl shadow-lg p-6 md:p-8 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-rose-800">
                      {post.title || `Gallery ${sectionIndex + 1}`}
                    </h2>
                    <button 
                      onClick={() => toggleFavorite(post._id)}
                      className="text-rose-500 hover:text-rose-700 transition-colors text-2xl"
                      aria-label={favorites[post._id] ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorites[post._id] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4 grid-flow-dense">
                    {images.map((src, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: imageIndex * 0.1 }}
                        className={`overflow-hidden rounded-xl shadow-lg relative group ${pattern[imageIndex]}`}
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={getImageSrc(src)}
                          alt={`Gallery image ${imageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Available';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white text-sm font-light">
                            Photo {imageIndex + 1}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-rose-600 text-white p-4 rounded-full shadow-lg z-10"
        aria-label="Share galleries"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </motion.button>
    </div>
  );
}