import React from 'react';
import { HeroSection } from '../Components/Home/HeroSection';
import { Popular } from '../Components/Home/Popular';

export const HomePage = () => {
 

  const testimonials = [
    {
      id: 1,
      quote: "The tea garden tour was absolutely magical! Our guide was knowledgeable and made the experience truly special. Can't wait to visit Ilam again!",
      author: "Sarah Johnson, UK"
    },
    {
      id: 2,
      quote: "Ilam Tour Planners organized the perfect itinerary for our family. Every detail was taken care of, and we got to experience the real Ilam beyond the tourist spots.",
      author: "Rajesh Kumar, India"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection/>

      {/* Welcome Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-green-800 mb-6 relative after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-1 after:bg-green-600">
                Welcome to Ilam Tour Planners
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ilam Tour Planners is your premier guide to exploring the breathtaking landscapes,
                tea gardens, and cultural heritage of Ilam, Nepal. With years of experience and
                local expertise, we create unforgettable travel experiences tailored to your
                preferences.
              </p>
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Learn More About Us
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://t4.ftcdn.net/jpg/07/90/21/05/360_F_790210505_iB8YkNfoljWvhObY0ci3FKbOEEewGsyD.jpg" 
                alt="Welcome to Ilam" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours */}
 <Popular/>

      {/* Why Choose Us */}
<section class="py-16 px-4 bg-white">
  <div class="max-w-6xl mx-auto">
    
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-3 relative pb-2">
        Why Choose Ilam Tour Planners?
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-500 rounded-full"></span>
      </h2>
      <p class="text-gray-600 max-w-xl mx-auto">
        Exceptional experiences crafted by local experts
      </p>
    </div>

  
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     
      <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
        <div class="text-green-500 text-2xl mb-4">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Local Expertise</h3>
        <p class="text-gray-600 text-sm">
          Born-and-raised guides showing you the real Ilam
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
        <div class="text-green-500 text-2xl mb-4">
          <i class="fas fa-wallet"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Fair Pricing</h3>
        <p class="text-gray-600 text-sm">
          Quality experiences at honest prices
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
        <div class="text-green-500 text-2xl mb-4">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Safety First</h3>
        <p class="text-gray-600 text-sm">
          Certified guides and insured activities
        </p>
      </div>


      <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-50">
        <div class="text-green-500 text-2xl mb-4">
          <i class="fas fa-leaf"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
        <p class="text-gray-600 text-sm">
          Sustainable tourism practices
        </p>
      </div>
    </div>

    <div class="text-center mt-12">
      <a href="#contact" class="inline-block px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow-md">
        Start Your Journey
        <i class="fas fa-chevron-right ml-1 text-xs"></i>
      </a>
    </div>
  </div>
</section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12 relative after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-green-600">
            What Our Guests Say
          </h2>
          <div className="space-y-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
                <blockquote className="text-center">
                  <p className="text-gray-700 italic text-lg mb-4">"{testimonial.quote}"</p>
                  <footer className="text-gray-600 font-medium">{testimonial.author}</footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-20 text-center text-white bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/ilam-cta-bg.jpg')" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Ilam?</h2>
          <p className="text-xl mb-8">Contact us to plan your perfect Ilam adventure</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-lg transition duration-300">
              Book Now
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};