import React, { useState } from 'react';
import { Home, Users, Settings, Package, BookOpen, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/admin${path}`;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-4 text-white bg-gray-800 fixed z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:block w-16 lg:w-16 h-screen bg-gray-800 text-white fixed z-40 transition-all duration-300`}
      >
        <div className="text-center py-6 text-sm font-bold border-b border-gray-700">
          A
        </div>
        <ul className="flex flex-col items-center gap-4 py-6">
          <li>
            <Link
              to="/admin/home"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/home') ? 'bg-gray-700' : ''}`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/users') ? 'bg-gray-700' : ''}`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/package"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/package') ? 'bg-gray-700' : ''}`}
            >
              <Package className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Packages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/allPackages"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/bookings') ? 'bg-gray-700' : ''}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contact"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/contact') ? 'bg-gray-700' : ''}`}
            >
              <Mail className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`group flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-700 ${isActive('/settings') ? 'bg-gray-700' : ''}`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] hidden group-hover:block">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
