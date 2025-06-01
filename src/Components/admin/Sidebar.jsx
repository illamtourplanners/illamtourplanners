import React, { useState } from 'react';
import { Home, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button
        className="lg:hidden p-4 text-white bg-gray-800 fixed z-50"
        onClick={() => setIsOpen(!isOpen)}
      ></button>
   
    <div className="w-20 h-screen bg-gray-800 text-white fixed">
      <div className="text- font-bold p-6 border-b border-gray-700">Admin Panel</div>
      <ul className="flex flex-col gap-2 p-4">
        <li>
          <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
            <Home className="w-5 h-5" />
            {/* Dashboard */}
          </Link>
        </li>
        <li>
          <Link to="/users" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
            <Users className="w-5 h-5" />
            {/* Users */}
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
            <Settings className="w-5 h-5" />
            {/* Settings */}
          </Link>
        </li>
      </ul>
    </div>
     </>
  );
};

export default Sidebar;
