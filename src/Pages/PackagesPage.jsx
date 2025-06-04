import React from 'react';
import { GiJourney } from 'react-icons/gi';

export const PackagesPage = () => {
  const packages = [
    {
      id: 1,
      title: 'Backwaters of Kerala',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada',
      video: 'https://www.youtube.com/embed/7peOHGR1BcU', // Sample Kerala backwaters video
      description: 'Enjoy a serene houseboat ride through the lush green backwaters. Our package includes 2 nights in traditional houseboats, authentic Kerala meals, and guided village tours. Experience the tranquility of palm-fringed canals and witness local life along the waters.',
      price: '₹12,500',
    },
    {
      id: 2,
      title: 'Munnar Tea Hills',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      video: 'https://www.youtube.com/embed/6W9P1aYQqYw', // Sample Munnar video
      description: 'Explore rolling tea gardens, misty hills, and cool weather. This 3-day package includes visits to tea factories, trekking to Anamudi peak, and stays in colonial-style bungalows. Enjoy panoramic views and learn about tea processing from leaf to cup.',
      price: '₹9,800',
    },
    {
      id: 3,
      title: 'Alleppey Beach Retreat',
      image: 'https://images.unsplash.com/photo-1570734269385-b4d1a9c9b28a',
      video: 'https://www.youtube.com/embed/1QH4JlyP_3Y', // Sample Alleppey video
      description: 'Relax by golden beaches and experience traditional Kerala culture. Our beachfront resort package includes Ayurvedic spa treatments, Kathakali dance performances, sunset cruises, and authentic seafood dinners by the Arabian Sea.',
      price: '₹11,200',
    },
  ];

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
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
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