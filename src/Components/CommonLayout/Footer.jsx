
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Star, Users, Trophy, Headphones, Info, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const usefulLinks = [
    { name: "All Destinations", icon: MapPin },
    { name: "24/7 Support", icon: Headphones },
    { name: "Our Team", icon: Users },
    { name: "Top Places", icon: Trophy },
    { name: "Reviews", icon: Star },
  ];

  const aboutLinks = [
    { name: "About Us", icon: Info, href: "/About" },
    { name: "Contact Us", icon: MessageCircle, href: "/contact" },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">V</span>
                </div>
                <div>
                  <a href="/" className="block">
                    <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                      Vaidehi Holidays
                    </h3>
                  </a>
                  <p className="text-sm text-slate-400">Premium Travel Experience</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                Discover the hidden gems of Ilam with our expert guides and curated premium experiences. Your journey to extraordinary begins here.
              </p>
              
              {/* Trust Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-400">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a 
                      href="#" 
                      className="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                      <span className="text-sm">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="group flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                      <span className="text-sm">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
            <div className="space-y-4">
              
              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Call Us</p>
                  </div>
                </div>
                <div className="ml-11 space-y-1">
                  <p className="text-sm text-slate-300">+91 9400440686</p>
                  <p className="text-sm text-slate-300">+91 8547854685</p>
                  <p className="text-sm text-slate-300">+91 8943806318</p>
                  <p className="text-sm text-slate-300">+91 9633628540</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email Us</p>
                  </div>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-slate-300 break-all">
                    Vaidehiholidayskanhangad@gmail.com
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h5 className="text-sm font-medium text-white mb-3">Follow Us</h5>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/vaidehi_holidays?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            <div className="text-center lg:text-left">
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} 
                <span className="font-semibold text-white mx-1">Vaidehi Holidays</span>
                All rights reserved.
              </p>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-sm text-slate-400">
                <span className="font-medium text-blue-400">Powered By</span>
                <span className="ml-1 font-semibold text-white">TECHISTA SOLUTIONS</span>
              </p>
            </div>
            
            <div className="flex gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
