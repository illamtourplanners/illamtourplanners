import React from 'react'

export const Footer = () => {
  return (
      <footer className="bg-gray-800 text-white py-6 mt-10 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between ">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline text-sm">Privacy Policy</a>
          <a href="#" className="hover:underline text-sm">Terms of Service</a>
          <a href="#" className="hover:underline text-sm">Contact</a>
        </div>
      </div>
    </footer>
  )
}
