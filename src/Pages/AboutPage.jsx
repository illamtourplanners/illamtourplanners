import React from 'react';
import { FaStar, FaFacebook, FaLinkedin, FaGithub, FaLeaf, FaRoute, FaUserTie, FaHandsHelping } from 'react-icons/fa';
import { GiPathDistance, GiJourney } from 'react-icons/gi';

export const AboutPage = () => {
  // Partner images
  const partners = [
    { name: 'Kerala Tourism', logo: 'https://s3.india.com/wp-content/uploads/2024/12/Eco-friendly-Travel-In-Kerala.jpg' },
    { name: 'Responsible Travel', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvGKfgEIymHV9z05nMSBAWruhGakAvApZyZw&s' },
    { name: 'Local Guides Association', logo: 'https://www.localguidesconnect.com/t5/image/serverpage/image-id/4549i2B5A2B4D5D5C4F4F0?v=v2&px=400' },
    { name: 'Eco Stay Certified', logo: 'https://ecostay.org/wp-content/uploads/2021/05/ecostay-logo.png' },
  ];

  const teamMembers = [
    { 
      name: 'Keshavapatteri', 
      role: 'Route Designer & Cultural Curator', 
      image: '../../public/images/keshu.jpg',
      bio: 'With 10+ years in cultural tourism, Keshav designs immersive routes that showcase authentic South Indian heritage.',
      social: {
        facebook: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Sreehari', 
      role: 'Tour Operations & Guest Experience', 
      image: '../../public/images/sreehari.jpg',
      bio: 'Ensures seamless operations and creates memorable experiences for every guest.',
      social: {
        facebook: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Rishikesh', 
      role: 'Community Liaison & Logistics', 
      image: '../../public/images/rishi.jpg',
      bio: 'Connects travelers with local communities and manages all logistical details.',
      social: {
        facebook: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    { 
      name: 'Upendran', 
      role: 'Guest Relations Specialist', 
      image: '../../public/images/upz.jpg',
      bio: 'Bridges communication between guests and our team, ensuring exceptional service.',
      social: {
        facebook: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
  ];

  const stats = [
    { value: '100+', label: 'Happy Travelers', icon: <FaUserTie className="text-2xl" /> },
    { value: '15+', label: 'Unique Destinations', icon: <GiPathDistance className="text-2xl" /> },
    { value: '50+', label: 'Local Partnerships', icon: <FaHandsHelping className="text-2xl" /> },
    { value: '100%', label: 'Eco-Conscious', icon: <FaLeaf className="text-2xl" /> }
  ];

  const testimonials = [
    {
      quote: "The cultural immersion was beyond anything I expected. Illam Tour Planners showed me the real Kerala.",
      rating: 5,
      author: "Sarah J.",
      location: "London, UK",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Every detail was perfect. The team's knowledge of local culture made our trip extraordinary.",
      rating: 5,
      author: "Michael T.",
      location: "Toronto, Canada",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The perfect balance of adventure and relaxation. Can't wait to book my next trip with them!",
      rating: 5,
      author: "Priya K.",
      location: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section
  className="relative bg-[url('https://themewagon.github.io/pacific/images/bg_1.jpg')] bg-cover bg-center py-24 text-center opacity-75 text-white overflow-hidden"
>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.travelandleisure.com/thmb/3xJDPQxG1W8Q0w6TZ-6I7jXzQoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kerala-backwaters-KERALAOUT0218-1a9b5a8a7e2c4a7d9e3b5c5e5e5e5e5e.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            About <span className="text-amber-200">Illam</span> Tour Planners
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your gateway to authentic South Indian cultural retreats and serene escapes
          </p>
          <div className="mt-8">
            <GiJourney className="inline-block text-4xl text-amber-200 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative">
                <span className="absolute -left-8 top-3 h-1 w-12 bg-amber-500"></span>
                Our Story
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                Founded in <span className="font-bold text-amber-600 dark:text-amber-400">May 2025</span>, Illam Tour Planners was born from a shared passion for authentic, community-rooted travel. We craft experiences that connect you with heritage, nature, and local life — creating memories that feel like home.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                What began as a small initiative among friends has grown into a beloved tour operator known for its intimate, culturally-rich experiences that showcase the true spirit of South India.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-amber-600 dark:text-amber-400 flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Team exploring cultural sites" 
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
                width="600"
                height="400"
              />
            </div>
          </div>
        </section>

        {/* Vision and Mission */}
        <section className="mb-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            Our Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                  <FaRoute className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">Vision</h3>
              </div>
              <p className="text-lg leading-relaxed">
                To become the most trusted curator of authentic South Indian travel experiences, where every journey fosters cultural appreciation, personal growth, and unforgettable memories.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4 flex-shrink-0">
                  <FaLeaf className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">Mission</h3>
              </div>
              <p className="text-lg leading-relaxed">
                We create sustainable, community-rooted travel experiences that respect local traditions while providing transformative experiences for our guests through authentic connections and responsible tourism practices.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg relative group">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width="160"
                    height="160"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-amber-600 dark:text-amber-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.social.facebook} className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href={member.social.twitter} className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            Our Trusted Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {partners.map((partner, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center" style={{ minHeight: '100px', minWidth: '200px' }}>
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-16 object-contain"
                  loading="lazy"
                  width="160"
                  height="80"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-24 bg-amber-500"></span>
            Traveler Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-amber-500 text-xl ${i < testimonial.rating ? 'opacity-100' : 'opacity-30'}`} />
                  ))}
                </div>
                <p className="italic mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience South India With Us?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're seeking a peaceful retreat, a cultural deep-dive, or an off-the-beaten-path adventure, we're here to guide you every step of the way.
            </p>
            <button className="bg-white text-amber-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
              Contact Our Team
            </button>
            <div className="mt-8">
              <GiJourney className="inline-block text-4xl text-amber-200 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};