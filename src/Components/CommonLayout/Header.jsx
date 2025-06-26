import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navigationLinks = [
  { name: 'Home', path: '/', exact: true },
  // { name: 'Tours', path: '/tours' },
  { name: 'Packages', path: '/package' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-1 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="../../../public/images/vaidehilogo.png"
              alt="Vaidehi Holidays Logo"
              className="h-10 w-10 mr-3 rounded-full"
              width="40"
              height="40"
              loading="lazy"
            />
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              Vaidehi Holidays
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                exact={link.exact}
                className="text-white hover:text-blue-200 font-medium transition-colors duration-300 relative group"
                activeClassName="text-blue-300"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
              </NavLink>
            ))}
<a href='/package'>
            <button className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20">
              Book Now
            </button></a>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-blue-200 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="pt-2 pb-4 space-y-2">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  exact={link.exact}
                  className="block px-4 py-3 text-gray-800 hover:bg-white/20 transition-colors"
                  activeClassName="bg-white/30 text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <button className="w-full mx-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-2">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};