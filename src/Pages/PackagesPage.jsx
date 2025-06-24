import React, { useEffect, useState } from 'react';
import { GiJourney } from 'react-icons/gi';
import { axiosInstance } from '../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const PackagesPage = () => {
  const [packag,setPackages]=useState([])
const [loading, setLoading] = useState(true);
 const navigate=useNavigate()
useEffect(() => {
  const fetchPackages = async () => {
    try {
      const response = await axiosInstance.get("/package/getall");
      setPackages(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchPackages();
}, []);

const redirect=(id)=>{
  navigate(`/checkout/${id}`)
}


  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-800 py-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.travelandleisure.com/thmb/3xJDPQxG1W8Q0w6TZ-6I7jXzQoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kerala-backwaters-KERALAOUT0218-1a9b5a8a7e2c4a7d9e3b5c5e5e5e5e5e.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Discover Our Upcoming Packages</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Get ready to explore beautiful destinations with our curated travel packages.
          </p>
          <div className="mt-6">
            <GiJourney className="inline-block text-4xl text-amber-200 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packag.map((pkg) => (
            <div key={pkg.id} onClick={() => redirect(pkg._id)} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={pkg.image} alt={pkg.title} className="h-56 w-full object-cover" />
              <div className="p-4">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={pkg.video} 
                    title={`${pkg.title} video`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-48 rounded-lg"
                  ></iframe>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{pkg.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};