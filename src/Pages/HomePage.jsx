import React, { useEffect, useState } from 'react';
import { HeroSection } from '../Components/Home/HeroSection';
import { Popular } from '../Components/Home/Popular';
import { FaLeaf } from 'react-icons/fa';

import { FaPrayingHands,FaBell, FaCompass, FaWater, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Bell, Compass, MapPin, Phone, Heart,Droplet  } from 'lucide-react';
export const HomePage = () => {
 
const [video,setVideo]=useState([])
  const testimonials = [
    {
      id: 1,
      quote: "The backwater cruise was absolutely magical! Our guide showed us the hidden gems of Kerala that we never would have found ourselves.",
      author: "Sanathmohan",
      location: "Kanhangad"
    },
    {
      id: 2,
      quote: "Every detail was perfect. The team's knowledge of Kerala's culture and traditions made our trip extraordinary.",
      author: "Kavya",
      location: "Nileshwar"
    },
    {
      id: 3,
      quote: "Perfect balance of adventure and relaxation. The spice plantation tour was incredible. Can't wait to book my next trip!",
      author: "Jeswin Joseph",
      location: "Manthavady, Wayanad"
    }
  ];


const fetchData=async(req,res)=>{
 const videos= await axiosInstance.get("/tour/get-video")
 setVideo(videos.data.data);
}
useEffect(()=>{
  fetchData()
},[])
 
 
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection/>



{/* Ads Video Section */}
{video.length > 0 && (
  <section className="py-20 px-4 bg-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      
      {/* Left: Description */}
      <div className="md:w-1/2 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {video[0].title}
        </h2>
        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
         {video[0].description}
         </p>
        <a href="/package">
          <button className="bg-emerald-600 text-white font-semibold py-3 px-6 md:px-8 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300">
            Explore Packages
          </button>
        </a>
      </div>

      {/* Right: Video */}
      {video.map((vid, index) => (
        <div key={index} className="md:w-1/2 w-full">
          <div className="relative w-full pt-[100%] rounded-xl overflow-hidden ">
            <video
              controls
              autoPlay
              loop
               playsInline
              className="absolute top-0 left-0 w-96 h-full object-cover rounded-xl"
              poster={vid.video}
            >
              <source src={vid.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ))}

    </div>
  </section>
)}





      {/* Welcome Section */}
<section className="py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content */}
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Discover Kerala's
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Sacred Beauty
                  </span>
                </h2>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow duration-300">
                  <div className="mt-1 text-emerald-600">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sacred Temples</h3>
                    <p className="text-gray-600">Visit Guruvayur Sri Krishna Temple, Sabarimala Ayyappa Temple, and experience divine tranquility</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow duration-300">
                  <div className="mt-1 text-emerald-600">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Vibrant Festivals</h3>
                    <p className="text-gray-600">Experience Thrissur Pooram, Attukal Pongala, and Kerala's colorful cultural celebrations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow duration-300">
                  <div className="mt-1 text-emerald-600">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adventure Trekking</h3>
                    <p className="text-gray-600">Explore Western Ghats with guided hikes to Meesapulimala and Chembra Peak</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-emerald-100/50 hover:shadow-md transition-shadow duration-300">
                  <div className="mt-1 text-emerald-600">
                    <Droplet  className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Backwater Bliss</h3>
                    <p className="text-gray-600">Kayaking through serene backwaters, houseboat cruises, and peaceful waterway journeys</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
               <a href="#package"> <button className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 justify-center">
                  <MapPin className="w-5 h-5" />
                  <span>Explore Packages</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </button></a>
                
                <a href="/contact"><button className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center gap-3 justify-center">
                  <Phone className="w-5 h-5" />
                  <span>Speak to Expert</span>
                </button>
                </a>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                      src="https://www.godigit.com/content/dam/godigit/directportal/en/temples-in-kerala.jpg" 
                      alt="Guruvayur Temple" 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">Sacred Temples</span>
                    </div>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Kerala Backwaters" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">Backwater Cruise</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 mt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                      src="https://live.staticflickr.com/4244/34847480635_b38608e5f4_z.jpg" 
                      alt="Kerala Hills" 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">Hill Stations</span>
                    </div>
                  </div>
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                      src="https://static2.tripoto.com/media/filter/tst/img/23898/TripDocument/1587894137_whatsapp_image_2020_04_26_at_15_07_11.jpeg" 
                      alt="Kerala Spices" 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">Spice Gardens</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours */}
 <Popular/>


<section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 z-0">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div> */}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-emerald-600 mb-4 tracking-widest uppercase">
              The Vaidehi Difference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
              <span className="relative z-10">Excellence in Every Journey</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Where Kerala's natural beauty meets unparalleled travel expertise for experiences that create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            {[
              {
                title: "Local Expertise",
                description: "Born-and-raised Kerala guides reveal hidden gems and authentic culture beyond tourist trails.",
                icon: MapPin
              },
              {
                title: "Transparent Value", 
                description: "No hidden costs - just exceptional experiences priced fairly with clear breakdowns.",
                icon: Heart
              },
              {
                title: "Safety First",
                description: "Fully certified guides, insured activities, and rigorous safety protocols for complete peace of mind.",
                icon: Compass
              },
              {
                title: "Eco-Conscious",
                description: "Sustainable tourism that supports local communities while preserving Kerala's natural beauty.",
                icon: Droplet
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/80 hover:border-emerald-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 transition-all duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
           <a href="/tours"> <button className="relative inline-flex items-center px-8 py-4 overflow-hidden font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full group hover:shadow-lg transition-all duration-300 hover:to-teal-700">
              <span className="relative flex items-center">
                <span className="text-lg font-semibold">Begin Your Journey</span>
                <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20 relative">
            <span className="relative z-10 px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
              Voices of Happy Travelers
            </span>
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-0"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-1 rounded-full">
                      <div className="bg-white p-0.5 rounded-full">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


<section>
  
</section>

      {/* Call to Action */}
   <section className="relative py-28 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: "linear-gradient(rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9)), url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" 
          }}
        ></div>
        
        <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
          <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute top-1/3 right-32 w-24 h-24 rounded-full bg-white/10 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-white/10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Explore Kerala?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Let us craft your perfect God's Own Country experience
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="relative group bg-white hover:bg-gray-50 text-emerald-600 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <a href="/package"><span className="relative z-10">Book Now</span></a>
            </button>
            
            <button className="relative group border-2 border-white hover:border-transparent text-white hover:text-emerald-700 font-bold py-4 px-10 rounded-full transition-all duration-300 hover:bg-white transform hover:-translate-y-1">
              <a href="/contact"><span className="relative z-10">Contact Us</span></a>
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-white" />
              <span>500+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white" />
              <span>Custom Itineraries</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};