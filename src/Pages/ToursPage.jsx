
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Share2, MapPin, Calendar, Users } from 'lucide-react';

export default function TravelGallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

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

  const patternSequences = [
    [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1", 
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 md:col-span-4 row-span-1"
    ],
    [
      "col-span-2 md:col-span-4 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1", 
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1"
    ],
    [
      "col-span-1 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-2", 
      "col-span-2 row-span-1 md:col-span-2",
      "col-span-1 row-span-1"
    ]
  ];

  const getImageSrc = (src) => src || 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';


const downloadImageAsPng = (url, filename = 'download.png') => {
  const img = new Image();
  img.crossOrigin = 'anonymous'; // Important for cross-origin images

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const pngUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.onerror = () => {
    alert('Failed to load image for download.');
  };

  img.src = url;
};






  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 py-32 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div> */}
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-emerald-400/20 animate-float"></div>
        <div className="absolute top-32 right-20 w-12 h-12 rounded-full bg-teal-300/20 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-cyan-400/20 animate-float animation-delay-4000"></div>
        
        <div className="relative z-10 px-4 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
          >
            <Camera className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-200 font-medium">Travel Gallery</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Discover Kerala's
            <span className="block bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Hidden Treasures
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-emerald-100 font-light mb-8"
          >
            Journey through breathtaking landscapes, vibrant culture, and unforgettable moments captured in time
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-emerald-200"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>50+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>1000+ Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>500+ Travelers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-20 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mb-6"
            />
            <p className="text-gray-600 text-lg">Loading beautiful memories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            <AnimatePresence>
              {posts.map((post, sectionIndex) => {
                const images = post.images.slice(0, 6);
                const pattern = patternSequences[sectionIndex % patternSequences.length];
                
                return (
                  <motion.div 
                    key={post._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                    className="group"
                  >
                    {/* Gallery Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                      <div className="flex-1">
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                        >
                          {post.title || `Journey ${sectionIndex + 1}`}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-gray-600 text-lg leading-relaxed max-w-2xl"
                        >
                          {post.description || "Explore the beauty and wonder of Kerala through our carefully curated collection of moments."}
                        </motion.p>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4"
                      >
                        <button 
                          onClick={() => toggleFavorite(post._id)}
                          className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                            favorites[post._id] 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          aria-label={favorites[post._id] ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={`w-6 h-6 ${favorites[post._id] ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button className="p-4 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-all duration-300 transform hover:scale-110 shadow-lg">
                          <Share2 className="w-6 h-6" />
                        </button>
                      </motion.div>
                    </div>

                    {/* Image Grid */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-2 md:grid-cols-4 auto-rows-[280px] md:auto-rows-[320px] gap-6 grid-flow-dense"
                    >
                      {images.map((src, imageIndex) => (
                        <motion.div
                          key={imageIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: (sectionIndex * 0.1) + (imageIndex * 0.05) }}
                          className={`overflow-hidden rounded-2xl shadow-xl relative group cursor-pointer ${pattern[imageIndex]} bg-gradient-to-br from-gray-100 to-gray-200`}
                          whileHover={{ y: -8, scale: 1.02 }}
                          onClick={() => setSelectedImage({ src: getImageSrc(src), title: post.title, index: imageIndex })}
                        >
                          
                          <img
                            src={getImageSrc(src)}
                            alt={`Gallery image ${imageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                            }}
                            loading="lazy"
                          />
                          
                          {/* Overlay */}
                          {/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white font-semibold text-lg mb-1">
          Photo {imageIndex + 1}
        </p>
        <p className="text-gray-300 text-sm">
          {post.title || 'Travel Gallery'}
        </p>
      </div>
      <Camera className="w-6 h-6 text-white/80" />
    </div>
  </div>

  {/* Download Button */}
 <button
  onClick={(e) => {
    e.stopPropagation(); // Prevent modal
    downloadImageAsPng(getImageSrc(src), `travel-photo-${imageIndex + 1}.png`);
  }}
  className="absolute top-4 left-4 bg-white/30 hover:bg-white/50 text-black px-3 py-1 rounded-full text-xs font-medium transition-all"
>
  Download PNG
</button>

</div>


                          {/* Corner Badge */}
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* <Camera className="w-4 h-4 text-white" /> */}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={`${selectedImage.title} - Photo ${selectedImage.index + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl z-40 backdrop-blur-sm border border-white/20"
        aria-label="Share galleries"
      >
        <Share2 className="w-6 h-6" />
      </motion.button> */}
    </div>
  );
}
