
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../public/images/vaidehilogo.png";
const navigationLinks = [
  { name: 'Home', path: '/', exact: true },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/tours' },
  {
    name: 'Packages',
    path: '/package',
    dropdown: [
      { name: 'All Packages', path: '/package' },
      { name: 'Booking Details', path: '/booking-details' },
    ],
  },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">
                  <img src={logo} alt=""  className='rounded-4xl'/>
                </span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
            </div>
            <NavLink to="/" className="ml-3">
              <div className="flex flex-col">
                <span className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Vaidehi Holidays
                </span>
                <span className={`text-xs tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-emerald-600' : 'text-emerald-300'
                }`}>
                  God's Own Country
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) =>
              link.dropdown ? (
                <div className="relative group" key={link.name}>
                  <button className={`flex items-center gap-1 font-medium transition-all duration-300 relative py-2 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-emerald-600' 
                      : 'text-white hover:text-emerald-300'
                  }`}>
                    {link.name}
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-2">
                      {link.dropdown.map((sublink) => (
                        <NavLink
                          key={sublink.path}
                          to={sublink.path}
                          className="block px-6 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sublink.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `font-medium transition-all duration-300 relative py-2 group ${
                    isScrolled 
                      ? isActive 
                        ? 'text-emerald-600' 
                        : 'text-gray-700 hover:text-emerald-600'
                      : isActive 
                        ? 'text-emerald-300' 
                        : 'text-white hover:text-emerald-300'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                    'group-hover:w-full'
                  } group-[.active]:w-full w-0`}></span>
                </NavLink>
              )
            )}
            
            {/* Premium CTA Button */}
            <NavLink to="/package">
              <button className="relative ml-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20 backdrop-blur-sm group overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
              </button>
            </NavLink>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50' 
                  : 'text-white hover:text-emerald-300 hover:bg-white/10'
              }`}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Sheet */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Side Sheet */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l border-gray-100/20`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100/20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <div className="ml-3">
                <div className="font-bold text-gray-900">Vaidehi Holidays</div>
                <div className="text-xs text-emerald-600">God's Own Country</div>
              </div>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-2">
            {navigationLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="space-y-2">
                  <div className="px-4 py-3 text-gray-900 font-semibold text-sm uppercase tracking-wider">
                    {link.name}
                  </div>
                  <div className="ml-4 space-y-1">
                    {link.dropdown.map((sublink) => (
                      <NavLink
                        key={sublink.path}
                        to={sublink.path}
                        className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sublink.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600 font-medium' 
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              )
            )}
            
            {/* Mobile CTA */}
            <div className="pt-6 mt-6 border-t border-gray-100/20">
              <NavLink to="/package" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  Book Your Journey
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
