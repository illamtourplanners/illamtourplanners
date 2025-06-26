import React from 'react';

export const Footer = () => {
  const usefulLinks = [
    { name: "All Destinations", icon: "📍" },
    { name: "24/7 Support", icon: "🛎️" },
    { name: "Our Team", icon: "👥" },
    { name: "Top Places", icon: "🏆" },
    { name: "Reviews", icon: "⭐" },
  ];

const aboutLinks = [
  { name: "About Us", icon: "ℹ️", href: "/About" },
  // { name: "Legal Notice", icon: "⚖️", href: "/legal" },
  // { name: "Terms & Conditions", icon: "📝", href: "/terms" },
  { name: "Contact Us", icon: "✉️", href: "/contact" },
];
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="../../../public/images/vaidehilogo.png"
                alt="Logo"
                className="h-10 w-10 rounded-full"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                Vaidehi Holidays
              </h3>
            </div>
            <p className="text-gray-300">
              Discover the hidden gems of Ilam with our expert guides and curated experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
              <span className="text-teal-400">⚡</span> Quick Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 hover:text-teal-300 transition-colors group"
                  >
                    <span className="group-hover:scale-125 transition-transform">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
              <span className="text-blue-400">🏢</span> Company
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 hover:text-blue-300 transition-colors group"
                  >
                    <span className="group-hover:rotate-12 transition-transform">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
              <span className="text-amber-400">📞</span> Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <p className="font-medium">+91 9400440686 ,<br/>+91 8547854685 ,<br/>+91 8943806318 ,<br/>+91 9633628540 ,</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-teal-500/20 p-2 rounded-full">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <p className="font-medium">Vaidehiholidayskanhangad@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h5 className="text-lg font-medium mb-3">Follow Us</h5>
              <div className="flex gap-1">
                <a 
                  href="https://www.instagram.com/vaidehi_holidays?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  className="text-pink-500 hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0 text-gray-400">
            © {new Date().getFullYear()} <span className="text-teal-300">Vaidehi Holidays</span>. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};