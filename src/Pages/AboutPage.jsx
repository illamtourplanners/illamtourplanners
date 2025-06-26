import React from 'react';
import { FaStar, FaLeaf, FaRoute, FaUserTie, FaHandsHelping, FaInstagram } from 'react-icons/fa';
import { GiPathDistance, GiJourney } from 'react-icons/gi';

export const AboutPage = () => {

  const teamMembers = [
    { 
      name: 'Keshavapatteri', 
      role: 'Route Designer', 
      image: '../../public/images/keshu.jpg',
      bio: 'Designs immersive routes showcasing authentic South Indian heritage with 2+ years experience',
      social: {
        instagram: 'https://www.instagram.com/keshu_mkt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Sreehari', 
      role: 'Tour Operations', 
      image: '../../public/images/sreehari.jpg',
      bio: 'Ensures seamless operations and creates memorable experiences for every guest.',
      social: {
        instagram: 'https://www.instagram.com/__mr_hoonigan__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Rishikesh', 
      role: 'Tour Operations',
      image: '../../public/images/rishi.jpg',
      bio: 'Connects travelers with local communities and manages all logistical details.',
      social: {
        instagram: 'https://www.instagram.com/rishikesh_thekkathillam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Upendran', 
      role: 'Guest Relations', 
      image: '../../public/images/upz.jpg',
      bio: 'Ensures exceptional service through clear communication between guests and our team.',
      social: {
        instagram: 'https://www.instagram.com/u_p_z_z_z?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
  ];

  const stats = [
    { value: '200+',label: 'Happy Travelers', icon: <FaUserTie className="text-2xl" /> },
    { value: '15+', label: 'Unique Routes', icon: <GiPathDistance className="text-2xl" /> },
    { value: '50+', label: 'Local Partners', icon: <FaHandsHelping className="text-2xl" /> },
    { value: '100%', label: 'Eco-Friendly', icon: <FaLeaf className="text-2xl" /> }
  ];

  const testimonials = [
    {
      quote: "The cultural immersion was beyond anything I expected. Vaidehi Holidays showed me the real Kerala ",
      rating: 5,
      author: "Sanathmohan",
      location: "Kanhangad",
    },
    {
      quote: "Every detail was perfect. The team's knowledge made our trip extraordinary.",
      rating: 5,
      author: "Kavya",
      location: "Nileshwar",
    },
    {
      quote: "Perfect balance of adventure and relaxation. Can't wait to book my next trip!",
      rating: 5,
      author: "Jeswin Joseph",
      location: "Manthavady,Wayanad",}
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-teal-800/70"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our <span className="text-emerald-300">Story</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-teal-100">
            Crafting authentic South Indian travel experiences since 2025
          </p>
          <div className="mt-8">
            <GiJourney className="inline-block text-5xl text-emerald-300 animate-float" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-96">
                <img 
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" 
                  alt="Team exploring cultural sites" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-sm font-medium">Founding team in Kanhangad, 2025</p>
                </div>
              </div>
            </div>
            <div className="order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative inline-block">
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></span>
                Who We Are
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                Vaidehi Holidays was founded in <span className="font-bold text-emerald-600 dark:text-emerald-400">2025</span> by a group of passionate travelers and local experts. We believe in travel that respects cultures, supports communities, and preserves environments.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Our name 'Vaidehi' reflects the traditional Kerala homestead - a place of warmth, hospitality, and authentic experiences. This ethos guides every journey we create.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-emerald-600 dark:text-emerald-400 flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-emerald-500"></span>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border-l-4 border-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Authenticity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We showcase the real South India - not just the postcard views, but the living traditions, local flavors, and everyday beauty.
              </p>
            </div>
            <div className="p-6 border-l-4 border-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our tours are designed to give back more than they take, supporting local economies and minimizing environmental impact.
              </p>
            </div>
            <div className="p-6 border-l-4 border-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Connection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We create meaningful interactions between travelers and local communities, fostering mutual understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-emerald-500"></span>
            The Vaidehi Family
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg relative group">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                <div className="mt-4 flex justify-center">
                  <a 
                    href={member.social.instagram} 
                    className="text-pink-600 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Impact Section */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-emerald-500"></span>
              Our Community Impact
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  <FaHandsHelping className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Employment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We directly employ 50+ local guides, drivers, and hospitality staff from the communities we visit.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  <FaLeaf className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Eco Initiatives</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For every booking, we plant 5 trees and support beach/forest clean-up programs.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  <FaRoute className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cultural Preservation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We've helped restore 8 heritage sites and support traditional artisans through our tours.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  <FaUserTie className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Education Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  10% of profits fund scholarships for local students in tourism and hospitality.
                </p>
              </div>
            </div>
            {/* <div className="mt-12 text-center">
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md">
                Learn More About Our Impact
              </button>
            </div> */}
          </div>
        </section>
   
        {/* Testimonials */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-white"></span>
                Traveler Stories
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-yellow-300 text-xl ${i < testimonial.rating ? 'opacity-100' : 'opacity-30'}`} />
                      ))}
                    </div>
                    <p className="italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-white/80">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
            Ready to experience South India through the eyes of those who know it best?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href='/package'>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
              Explore Tours
            </button>
            </a>
            <a href='/contact'>
           <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-700 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md">
              Contact Us
            </button></a>
          </div>
          <div className="mt-8">
            <GiJourney className="inline-block text-4xl text-emerald-500 animate-pulse" />
          </div>
        </section>
      </div>
    </div>
  );
};