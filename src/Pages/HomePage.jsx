import React from 'react';
import { HeroSection } from '../Components/Home/HeroSection';
import { Popular } from '../Components/Home/Popular';
import { FaLeaf } from 'react-icons/fa';

import { FaPrayingHands,FaBell, FaCompass, FaWater, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
export const HomePage = () => {
 

  const testimonials = [
    {
      id: 1,
      quote: "The tea garden tour was absolutely magical! Our guide was knowledgeable and made the experience truly special. Can't wait to visit Ilam again!",
      author: "Sarah Johnson, UK"
    },
    {
      id: 2,
      quote: "Vaidehi Holidays organized the perfect itinerary for our family. Every detail was taken care of, and we got to experience the real Ilam beyond the tourist spots.",
      author: "Rajesh Kumar, India"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection/>

      {/* Welcome Section */}
<section className="py-16 px-4 bg-gradient-to-br from-green-50 to-teal-50">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
      {/* Devotional & Adventure Content */}
      <div className="lg:w-1/2 order-2 lg:order-1">
        <div className="relative inline-block mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Spiritual & Adventure Experiences in Kerala
          </h2>
          <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full"></div>
        </div>
        
        <div className="space-y-4 mb-8">
          {/* Devotional Content */}
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaPrayingHands className="text-xl" />
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">Sacred Temples:</span> Visit Guruvayur Sri Krishna Temple, Sabarimala Ayyappa Temple, and Attukal Bhagavathy Temple
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaBell className="text-xl" />
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">Festivals:</span> Experience vibrant festivals like Thrissur Pooram, Attukal Pongala, and Aranmula Vallamkali
            </p>
          </div>
          
          {/* Adventure Content */}
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaCompass className="text-xl" />
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">Trekking:</span> Explore the Western Ghats with guided hikes to Meesapulimala (2,650m) and Chembra Peak
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 text-green-600">
              <FaWater className="text-xl" />
            </div>
            <p className="text-gray-700">
              <span className="font-semibold">Water Sports:</span> Kayaking through backwaters, river rafting in Idukki, and surfing at Kovalam
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
        <a href='/contact'><button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center">
            <FaMapMarkedAlt /> Spiritual Packages
          </button></a> 
         <a href='/contact'> <button className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2 justify-center">
            <FaPhoneAlt /> Speak to Our Guide
          </button></a>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="lg:w-1/2 order-1 lg:order-2">
        <div className="grid grid-cols-2 gap-4">
          {/* Guruvayur Temple Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 md:h-56">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqCfvD4_2PvXcyY8xjLqNtcXo9bQj8QG_Vw&s" 
              alt="Guruvayur Temple" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">Guruvayur Temple</span>
            </div>
          </div>
          
          {/* Trekking Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 md:h-56">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/051/135/041/small_2x/man-hiker-on-a-top-of-a-mountain-hiking-in-mountains-photo.jpg" 
              alt="Trekking in Kerala hills" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">Mountain Trekking</span>
            </div>
          </div>
          
          {/* Thrissur Pooram Festival Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 md:h-56">
            <img 
              src="https://bharatarticles.com/wp-content/uploads/2025/04/ChatGPT-Image-Apr-15-2025-12_17_13-AM.jpg" 
              alt="Thrissur Pooram Festival" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">Thrissur Pooram</span>
            </div>
          </div>
          
          {/* Kayaking Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-48 md:h-56">
            <img 
              src="https://images.unsplash.com/photo-1604537466573-5e94508fd243?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80" 
              alt="Kayaking in Kerala backwaters" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white text-sm font-medium">Backwater Kayaking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Popular Tours */}
 <Popular/>

{/* Why Choose Us - Modern Stylish Version */}
<section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-5 z-0">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
  </div>
  <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-green-100/30 blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16">
      <span className="inline-block text-sm font-medium text-emerald-600 mb-4 tracking-widest uppercase">
        The Vaidehi Difference
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
        <span className="relative z-10">Excellence in Every Journey</span>
        <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100/70 -z-0"></span>
      </h2>
      <p className="text-gray-500/90 max-w-2xl mx-auto text-lg leading-relaxed">
        Where Himalayan hospitality meets unparalleled travel expertise for experiences that linger in memory
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card 1 - Local Expertise */}
      <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/80 hover:border-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
            <span className="relative z-10">Local Expertise</span>
            <span className="absolute bottom-0 left-0 w-8 h-1 bg-emerald-200/80 -z-0 group-hover:w-12 transition-all duration-500"></span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our born-and-raised guides reveal Ilam's hidden gems and authentic culture beyond the tourist trails.
          </p>
        </div>
      </div>

      {/* Card 2 - Fair Pricing */}
      <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/80 hover:border-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
            <span className="relative z-10">Transparent Value</span>
            <span className="absolute bottom-0 left-0 w-8 h-1 bg-emerald-200/80 -z-0 group-hover:w-12 transition-all duration-500"></span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            No hidden costs - just exceptional experiences priced fairly with clear breakdowns of what you're paying for.
          </p>
        </div>
      </div>

      {/* Card 3 - Safety First */}
      <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/80 hover:border-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
            <span className="relative z-10">Safety First</span>
            <span className="absolute bottom-0 left-0 w-8 h-1 bg-emerald-200/80 -z-0 group-hover:w-12 transition-all duration-500"></span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Fully certified guides, insured activities, and rigorous safety protocols for complete peace of mind.
          </p>
        </div>
      </div>

      {/* Card 4 - Eco-Friendly */}
      <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/80 hover:border-emerald-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 relative">
            <span className="relative z-10">Eco-Conscious</span>
            <span className="absolute bottom-0 left-0 w-8 h-1 bg-emerald-200/80 -z-0 group-hover:w-12 transition-all duration-500"></span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Sustainable tourism that supports local communities while preserving Ilam's natural beauty.
          </p>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center mt-16">
      <button className="relative inline-flex items-center px-8 py-4 overflow-hidden font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full group hover:shadow-lg transition-all duration-300 hover:to-emerald-700">
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative flex items-center">
          <span className="text-lg font-semibold">Begin Your Journey</span>
          <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</section>

      {/* Testimonials */}
<section className="py-20 bg-gradient-to-br from-green-50 to-teal-50 px-4">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-green-900 mb-16 relative">
      <span className="relative z-10 px-4 bg-gradient-to-br from-green-50 to-teal-50">
        Voices of Happy Travelers
      </span>
      <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent z-0"></span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Testimonial 1 */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 text-lg italic mb-6">"The cultural immersion was beyond anything I expected. Vaidehi Holidays showed me the real Kerala."</p>
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-1 rounded-full">
              <div className="bg-white p-0.5 rounded-full">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">S</div>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-gray-900">Sanathmohan</h4>
              <p className="text-sm text-gray-500">Kanhangad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 text-lg italic mb-6">"Every detail was perfect. The team's knowledge made our trip extraordinary."</p>
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-1 rounded-full">
              <div className="bg-white p-0.5 rounded-full">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">K</div>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-gray-900">Kavya</h4>
              <p className="text-sm text-gray-500">Nileshwar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 text-lg italic mb-6">"Perfect balance of adventure and relaxation. Can't wait to book my next trip!"</p>
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-1 rounded-full">
              <div className="bg-white p-0.5 rounded-full">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">J</div>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-gray-900">Jeswin Joseph</h4>
              <p className="text-sm text-gray-500">Manthavady, Wayanad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Call to Action */}
    <section 
  className="relative py-28 text-center overflow-hidden"
>
  {/* Background with parallax effect */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
    style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/ilam-cta-bg.jpg')" }}
  ></div>
  
  {/* Animated elements */}
  <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
    <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-green-400 opacity-20 animate-blob"></div>
    <div className="absolute top-1/3 right-32 w-24 h-24 rounded-full bg-teal-400 opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-amber-300 opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  {/* Content */}
  <div className="relative z-20 max-w-4xl mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-300">
        Ready to Explore Vaidehi?
      </span>
    </h2>
    <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto">
      Let us craft your perfect Kerala holiday experience
    </p>
    
    <div className="flex flex-col sm:flex-row justify-center gap-6">
     <a href='/package'> <button 
        className="relative group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <span className="relative z-10">Book Now</span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button></a>
      <a href='/contact'>
      <button 
        className="relative group border-2 border-white hover:border-transparent text-white hover:text-green-700 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:bg-white transform hover:-translate-y-1"
      >
        <span className="relative z-10">Contact Us</span>
        <span className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button></a>
    </div>
    
    {/* Trust indicators */}
    <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>500+ Happy Travelers</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Custom Itineraries</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>24/7 Support</span>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};