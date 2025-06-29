import React, { useState, useEffect } from 'react';
import { Home, Package, BookOpen, Mail, Settings, Plus, Wallet, X, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Always keep closed on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname === `/admin${path}` || 
           location.pathname.startsWith(`/admin${path}/`);
  };

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/PackagesList', icon: Package, label: 'Users' },
    { path: '/package', icon: Plus, label: 'Packages' },
    { path: '/allPackages', icon: BookOpen, label: 'Bookings' },
    { path: '/contact', icon: Mail, label: 'Contact' },
    { path: '/AdminExpense', icon: Wallet, label: 'Expense' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Header Container */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 font-bold text-xl">Admin</div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={`/admin${item.path}`}
                  className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                    isActive(item.path) ? 'bg-gray-700' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={`/admin${item.path}`}
                  className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-700 ${
                    isActive(item.path) ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Add padding to the top of your main content to account for the fixed header */}
      <div className="pt-16"></div>
    </>
  );
};

export default AdminHeader;