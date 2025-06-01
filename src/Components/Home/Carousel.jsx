import React, { useState, useEffect } from 'react';

const images = [
  {
    url: 'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1689856183/bbj/kkckwydgkxdfjoft6typ.jpg',
    title: "Backwaters of Kerala",
    description: "Explore the serene waterways of Alleppey"
  },
  {
    url: 'https://media.holidify.com/images/cmsuploads/compressed/waynadu-1024x768_20241008180836.jpg',
    title: "Wayanad",
    description: "Beauty of wayand"
  },
  {
    url: 'https://www.flamingotravels.co.in/_next/image?url=https%3A%2F%2Fimgcdn.flamingotravels.co.in%2FImages%2FCountry%2FKerala%20State.JPG&w=1080&q=75',
    title: "Munnar Tea Gardens",
    description: "Discover the rolling hills of tea plantations"
  },                 
];

export const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    resetAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrent(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      const timer = setTimeout(() => setIsAutoPlaying(true), 5000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [current, isAutoPlaying, isHovering]);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto mt-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video bg-gray-100">
        {/* Slides */}
        <div 
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Slide content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10 space-y-2">
                <span className="text-sm font-medium text-blue-300">Featured Destination</span>
                <h3 className="text-3xl font-bold tracking-tight">{image.title}</h3>
                <p className="text-lg opacity-90 max-w-2xl">{image.description}</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full z-10 transition-all hover:scale-110"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
          <div 
            className="h-full bg-blue-400 transition-all duration-1000 ease-linear"
            style={{ width: isAutoPlaying && !isHovering ? '100%' : '0%' }}
            onAnimationEnd={nextSlide}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === current && (
              <span className="absolute -inset-1.5 rounded-full border-2 border-blue-400 animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="text-center mt-3 text-gray-500 text-sm">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};