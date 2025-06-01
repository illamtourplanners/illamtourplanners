import React from 'react'

export const Footer = () => {
   const usefulLinks = [
    "All Destination",
    "24/7 Support",
    "Our Team",
    "Four Places",
    "Reviews",
  ];

  const aboutLinks = [
    "About Us",
    "Legal Notice",
    "Terms & Condition",
    "Contact Us",
  ];

  const legalLinks = ["Gallery", "Apple Store"];
  return (
     <footer className="bg-gray-900 text-white pt-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Get Updated The Our Latest Newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 flex-grow"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact & Download */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Call Us</h4>
              <p>+88 (09) 53 33 09</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Mail Us</h4>
              <p>info@Example.Com</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Download on Apple Store
            </button>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">About Travil</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Travil. All rights reserved.
          </div>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-blue-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
