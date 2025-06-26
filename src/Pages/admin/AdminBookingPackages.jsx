import React from 'react';

const AdminBookingPackages = () => {
  // Mock package data
  const packages = [
    {
      id: 1,
      name: 'React Router',
      description: 'Declarative routing for React',
      version: '6.18.0',
      downloads: '25M/month',
      author: 'React Team'
    },
    {
      id: 2,
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework',
      version: '3.3.0',
      downloads: '15M/month',
      author: 'Adam Wathan'
    },
    {
      id: 3,
      name: 'Axios',
      description: 'Promise based HTTP client',
      version: '1.4.0',
      downloads: '35M/month',
      author: 'Matt Zabriskie'
    },
    {
      id: 4,
      name: 'Redux',
      description: 'Predictable state container',
      version: '4.2.1',
      downloads: '20M/month',
      author: 'Dan Abramov'
    },
    {
      id: 5,
      name: 'Vite',
      description: 'Next generation frontend tooling',
      version: '4.4.0',
      downloads: '18M/month',
      author: 'Evan You'
    },
    {
      id: 6,
      name: 'Zustand',
      description: 'Bear necessities for state management',
      version: '4.4.0',
      downloads: '5M/month',
      author: 'Jotai'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Packages
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Browse through our curated collection of packages
          </p>
          
          {/* Search and Filter */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search packages..."
                className="flex-1 min-w-0 block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded-l-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <button className="px-6 py-2 bg-blue-600 text-white font-medium text-base leading-tight rounded-r-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out">
                Search
              </button>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full cursor-pointer">
                Popular
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-pointer">
                Newest
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full cursor-pointer">
                Trending
              </span>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <div className="text-white font-bold text-lg">
                      {pkg.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">v{pkg.version}</p>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600">{pkg.description}</p>
                
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pkg.downloads}</p>
                    <p className="text-sm text-gray-500">Downloads</p>
                  </div>
                  <div>
                    <p className="text-sm text-right font-medium text-gray-900">{pkg.author}</p>
                    <p className="text-sm text-right text-gray-500">Author</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Install Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">
              Previous
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              1
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
              2
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingPackages;