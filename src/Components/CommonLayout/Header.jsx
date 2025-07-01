import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navigationLinks = [
  { name: 'Home', path: '/', exact: true },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/tours' },
  { name: 'Packages', path: '/package' },
  { name: 'Contact', path: '/contact' },
];

import logo from "../../../public/images/vaidehilogo.png"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-1 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={logo}
              alt="Vaidehi Holidays Logo"
              className="h-10 w-10 mr-3 rounded-full"
              width="40"
              height="40"
              loading="lazy"
            />
            <a href='/'>
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                Vaidehi Holidays
              </span>
            </a>
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
              </button>
            </a>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-white hover:text-blue-200 focus:outline-none"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Sheet with Backdrop */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />

        {/* Side Sheet */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="pt-16 pb-4 space-y-2">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                exact={link.exact}
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                activeClassName="bg-gray-100 text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <a href='/package' className="block">
              <button className="w-56 mx-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-2">
                Book Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};