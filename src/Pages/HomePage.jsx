import React from 'react'
import { Carousel } from '../Components/Home/Carousel'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
    

      {/* Hero Section */}
    <div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 -z-10"></div>
  
  <div className="container mx-auto px-6 py-32 md:py-40 text-center">
    <div className="max-w-4xl mx-auto">
      {/* Animated text gradient */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 animate-gradient-x">
          Explore the World
        </span>
        <br />
        <span className="text-gray-800 dark:text-white">with </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
          Illam
        </span>
      </h1>
      
      {/* Elegant description with animated border */}
      <div className="relative inline-block mb-12">
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium relative z-10 px-4">
          Your perfect travel experience starts with us. We plan, you enjoy!
        </p>
        <div className="absolute inset-0 border-l-2 border-r-2 border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>
      
      {/* Glowing CTA button */}
      <button className="relative group bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <span className="relative z-10">Book a Tour</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
        <span className="absolute -inset-1 bg-cyan-400/30 rounded-full blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300 -z-20"></span>
      </button>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-cyan-400/20 rounded-full filter blur-xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400/20 rounded-full filter blur-xl -z-10"></div>
    </div>
  </div>
</div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <Carousel/>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-cyan-600 text-3xl mb-4">✈️</div>
              <h3 className="text-xl font-semibold mb-2">Expert Planning</h3>
              <p className="text-gray-600">Our team creates seamless itineraries tailored to your preferences.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-cyan-600 text-3xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold mb-2">Global Destinations</h3>
              <p className="text-gray-600">Access to exclusive locations and unique experiences worldwide.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-cyan-600 text-3xl mb-4">💖</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated assistance throughout your journey, anytime you need.</p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}