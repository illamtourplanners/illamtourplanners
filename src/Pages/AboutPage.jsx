
import React from 'react';
import { Star, Leaf, Users, Shield, Heart, Instagram, Award, TreePine, BookOpen, Target } from 'lucide-react';

import Keshavapatteri from "../../public/images/keshu.jpg"
import Sreehari from "../../public/images/sreehari.jpg"
import Rishikesh from "../../public/images/rishi.jpg"
import Upendran from "../../public/images/upz.jpg"
// import { Header } from '../components/Header';

export const AboutPage = () => {
  const teamMembers = [
    { 
      name: 'Keshavapatteri', 
      role: 'Route Designer', 
      image: Keshavapatteri,
      bio: 'Designs immersive routes showcasing authentic South Indian heritage with 2+ years experience',
      social: {
        instagram: 'https://www.instagram.com/keshu_mkt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Sreehari', 
      role: 'Tour Operations', 
      image: Sreehari,
      bio: 'Ensures seamless operations and creates memorable experiences for every guest.',
      social: {
        instagram: 'https://www.instagram.com/__mr_hoonigan__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Rishikesh', 
      role: 'Tour Operations',
      image: Rishikesh,
      bio: 'Connects travelers with local communities and manages all logistical details.',
      social: {
        instagram: 'https://www.instagram.com/rishikesh_thekkathillam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
    { 
      name: 'Upendran', 
      role: 'Guest Relations', 
      image: Upendran,
      bio: 'Ensures exceptional service through clear communication between guests and our team.',
      social: {
        instagram: 'https://www.instagram.com/u_p_z_z_z?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    },
  ];

  const stats = [
    { value: '200+', label: 'Happy Travelers', icon: <Users className="w-8 h-8" /> },
    { value: '15+', label: 'Unique Routes', icon: <Target className="w-8 h-8" /> },
    { value: '50+', label: 'Local Partners', icon: <Heart className="w-8 h-8" /> },
    { value: '100%', label: 'Eco-Friendly', icon: <Leaf className="w-8 h-8" /> }
  ];

  const testimonials = [
    {
      quote: "The cultural immersion was beyond anything I expected. Vaidehi Holidays showed me the real Kerala.",
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
      location: "Manthavady, Wayanad",
    }
  ];

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-white">
        {/* Premium Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background with parallax effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
            }}
          ></div>
          
          {/* Sophisticated overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/85 to-slate-900/90"></div>
          
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-emerald-400/10 blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full bg-teal-400/10 blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/3 left-1/2 w-36 h-36 rounded-full bg-cyan-400/10 blur-xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-5xl">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-emerald-200 font-medium tracking-wide text-sm border border-white/20">
                EST. 2025
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white">
              Our{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed text-slate-200 mb-12 font-light">
              Crafting extraordinary Kerala experiences through authentic storytelling and sustainable tourism
            </p>
            
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center animate-float shadow-2xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2 tracking-widest">SCROLL</span>
              <div className="w-px h-8 bg-white/50"></div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Introduction */}
          <section className="py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                    <img 
                      src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" 
                      alt="Team exploring cultural sites" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <p className="text-white font-medium">Founding Team</p>
                        <p className="text-emerald-200 text-sm">Kanhangad, Kerala • 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                    WHO WE ARE
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    Rooted in 
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Tradition</span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-8"></div>
                </div>
                
                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                  <p>
                    Vaidehi Holidays emerged from a simple belief: that travel should be a 
                    <span className="font-semibold text-emerald-700"> transformative dialogue</span> between 
                    cultures, not just a collection of photographs.
                  </p>
                  <p>
                    Founded in <span className="font-bold text-gray-900">2025</span> by passionate local experts, 
                    we've redefined Kerala tourism by showcasing not just its scenic beauty, but its soul - 
                    the warmth of its people, the richness of traditions, and the stories that make each place unique.
                  </p>
                  <p>
                    Our name 'Vaidehi' embodies the traditional Kerala homestead philosophy: a space where 
                    strangers become family, stories are shared over authentic meals, and every journey 
                    becomes a cherished memory.
                  </p>
                </div>
                
                {/* Premium Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="group">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 text-center group-hover:-translate-y-1">
                        <div className="text-emerald-600 flex justify-center mb-4 group-hover:text-emerald-700 transition-colors">
                          {stat.icon}
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Premium Values Section */}
          <section className="py-24">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Values That 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Guide Us</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Every decision we make is anchored in principles that honor Kerala's heritage while building its sustainable future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-12 h-12" />,
                  title: "Authenticity",
                  description: "We showcase the real Kerala - not just postcard views, but living traditions, local flavors, and the everyday magic that makes our land special."
                },
                {
                  icon: <TreePine className="w-12 h-12" />,
                  title: "Sustainability", 
                  description: "Our tours are designed to give back more than they take, supporting local economies while preserving the natural beauty for future generations."
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: "Connection",
                  description: "We create meaningful bridges between travelers and local communities, fostering mutual understanding and lasting friendships."
                }
              ].map((value, index) => (
                <div key={index} className="group">
                  <div className="relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:text-emerald-700 transition-colors mx-auto">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Premium Team Section */}
          <section className="py-24">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                MEET THE TEAM
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Vaidehi 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Family</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
            </div>
            
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-white dark:bg-green-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
                <p className="text-sm text-gray-600 dark:text-gray-900 mb-4">{member.bio}</p>
                <div className="mt-4 flex justify-center">
                  <a 
                    href={member.social.instagram} 
                    className="text-pink-600 hover:text-pink-800 dark:hover:text-pink-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          </section>

          {/* Premium Community Impact */}
          <section className="py-24">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-sm border border-gray-100">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                  SOCIAL IMPACT
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Beyond 
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Tourism</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our commitment extends far beyond creating memorable trips - we're building sustainable futures for Kerala's communities
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Users className="w-10 h-10" />,
                    title: "Local Employment",
                    description: "We directly employ 50+ local guides, drivers, and hospitality staff from the communities we visit."
                  },
                  {
                    icon: <Leaf className="w-10 h-10" />,
                    title: "Eco Initiatives", 
                    description: "For every booking, we plant 5 trees and support beach/forest clean-up programs."
                  },
                  {
                    icon: <Shield className="w-10 h-10" />,
                    title: "Cultural Preservation",
                    description: "We've helped restore 8 heritage sites and support traditional artisans through our tours."
                  },
                  {
                    icon: <BookOpen className="w-10 h-10" />,
                    title: "Education Support",
                    description: "10% of profits fund scholarships for local students in tourism and hospitality."
                  }
                ].map((impact, index) => (
                  <div key={index} className="group text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        {impact.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{impact.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{impact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
   
          {/* Premium Testimonials */}
          <section className="py-24">
            <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/5 blur-xl animate-float"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white/5 blur-xl animate-float animation-delay-2000"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-semibold tracking-wide mb-6 border border-white/20">
                    TESTIMONIALS
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Stories from the 
                    <span className="text-emerald-200"> Heart</span>
                  </h2>
                  <div className="w-24 h-1 bg-white rounded-full mx-auto"></div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:-translate-y-2 h-full">
                        <div className="flex items-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-300 fill-current' : 'text-white/30'}`} />
                          ))}
                        </div>
                        <p className="text-lg italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{testimonial.author}</p>
                            <p className="text-sm text-emerald-200">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Premium Call to Action */}
          <section className="py-24">
            <div className="text-center bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100">
              <div className="max-w-4xl mx-auto">
                <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold tracking-wide mb-6">
                  JOIN THE JOURNEY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Ready to Experience 
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Kerala?</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Let us craft a personalized journey that reveals Kerala's hidden gems through the eyes of those who call it home
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href='/package'>
                    <button className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Explore Tours
                        <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                    </button>
                  </a>
                  <a href='/contact'>
                    <button className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                      <span className="flex items-center">
                        Contact Us
                        <Heart className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:scale-110" />
                      </span>
                    </button>
                  </a>
                </div>
                
                <div className="mt-12 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
