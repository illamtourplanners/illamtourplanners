// src/PassengerPickupList.jsx
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
const PassengerPickupList = ({ package: pkg, onBack }) => {
  // Sample passenger data - in real app this would come from an API
  
  const [passengers, setPassengers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'boarded', 'pending'
  const [searchTerm, setSearchTerm] = useState('');
  const [pickupFilter, setPickupFilter] = useState('all');
  const [showNotes, setShowNotes] = useState({});
const {id}=useParams()
  useEffect(() => {
  const fetchpassengers=async()=>{
    const response=await axiosInstance.get(`/passenger/pickup-list/${id}`)
    console.log(response.data.passengers);
    setPassengers(response.data.passengers);
    
  }
  fetchpassengers()
  }, []);




  // Get unique pickup points
  const pickupPoints = [...new Set(passengers.map(p => p.pickupPoint))];
  
const handleBoardingToggle = async (id) => {
  const passenger = passengers.find(p => p.id === id);
  if (!passenger) return;

  // const confirmUpdate = window.confirm("Are you sure you want to update the status?");
  // if (!confirmUpdate) return;

  try {
    const updatedStatus = passenger.isBoarded ? "Pending" : "Boarded";

    await axiosInstance.post("/passenger/update-status", {
      bookingId: passenger.bookingId,
      customerIndex: passenger.customerIndex,
      status: updatedStatus,
    });

    setPassengers(passengers.map(p =>
      p.id === id ? { ...p, isBoarded: !p.isBoarded } : p
    ));

    toast.success(`Status updated to ${updatedStatus}`);
  } catch (err) {
    console.error("Failed to update status:", err);
    toast.error("Failed to update passenger status");
  }
};


  const handleNoteChange = (id, note) => {
    setPassengers(passengers.map(passenger => 
      passenger.id === id 
        ? { ...passenger, notes: note } 
        : passenger
    ));
  };

  const toggleNotes = (id) => {
    setShowNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredPassengers = passengers.filter(passenger => {
    // Apply boarding status filter
    if (filter === 'boarded' && !passenger.isBoarded) return false;
    if (filter === 'pending' && passenger.isBoarded) return false;
    
    // Apply pickup point filter
    if (pickupFilter !== 'all' && passenger.pickupPoint !== pickupFilter) return false;
    
    // Apply search term filter
    if (searchTerm && !passenger.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Calculate statistics
  const totalPassengers = passengers.length;
  const boardedPassengers = passengers.filter(p => p.isBoarded).length;
  const pendingPassengers = totalPassengers - boardedPassengers;



// Add these functions inside your component
const handleMarkAllAsBoarded = async () => {
  if (!window.confirm("Are you sure you want to mark all passengers as boarded?")) return;
  
  try {
    // Filter passengers that need updating
    const passengersToUpdate = passengers.filter(p => !p.isBoarded);
    
    // Create update promises
    const updatePromises = passengersToUpdate.map(passenger => 
      axiosInstance.post("/passenger/update-status", {
        bookingId: passenger.bookingId,
        customerIndex: passenger.customerIndex,
        status: "Boarded"
      })
    );

    await Promise.all(updatePromises);
    
    // Update UI state
    setPassengers(passengers.map(p => ({ ...p, isBoarded: true })));
    
    toast.success("All passengers marked as boarded");
  } catch (err) {
    toast.error("Failed to mark all passengers as boarded");
    console.error(err);
  }
};

const handleExportCSV = () => {
  // Add "Index" as the first header
  const headers = ['Index', 'Name', 'Pickup Point', 'People', 'Status', 'Booking ID'];

  // Include index starting from 1
  const rows = passengers.map((passenger, index) => [
    index + 1, // Index starting at 1
    passenger.name,
    passenger.pickupPoint,
    passenger.people,
    passenger.isBoarded ? 'Boarded' : 'Pending',
    passenger.bookingId,
  
  ]);

  // Create CSV content with proper escaping
  const csvContent = [
    headers.join(','), // Header row
    ...rows.map(row =>
      row.map(field => `"${field.toString().replace(/"/g, '""')}"`).join(',') // Escape double quotes
    )
  ].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `passengers-${pkg?.name?.replace(/\s+/g, '-') || 'list'}-${new Date().toISOString().slice(0, 10)}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const handlePrint = () => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    toast.error("Please allow pop-ups for printing");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${pkg?.name || 'Passenger'} List</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 1cm; }
          h1 { color: #333; text-align: center; }
          .subtitle { text-align: center; margin-bottom: 20px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .boarded { color: green; }
          .pending { color: orange; }
          .summary { margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
          .footer { margin-top: 30px; text-align: right; font-size: 0.8em; color: #666; }
        </style>
      </head>
      <body>
        <h1>${pkg?.name || 'Passenger'} List</h1>
        ${pkg?.date ? `<div class="subtitle">${pkg.date} | ${pkg.time}</div>` : ''}
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Pickup Point</th>
              <th>People</th>
              <th>Status</th>
              <th>Booking ID</th>
            </tr>
          </thead>
          <tbody>
            ${passengers.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${p.pickupPoint}</td>
                <td>${p.people}</td>
                <td class="${p.isBoarded ? 'boarded' : 'pending'}">
                  ${p.isBoarded ? 'Boarded' : 'Pending'}
                </td>
                <td>${p.bookingId}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="summary">
          <h3>Summary</h3>
          <p>Total Passengers: ${passengers.length}</p>
          <p>Boarded: ${passengers.filter(p => p.isBoarded).length}</p>
          <p>Pending: ${passengers.filter(p => !p.isBoarded).length}</p>
        </div>
        
        <div class="footer">
          Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 500);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};








  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Packages
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{pkg?.name} - Passenger List</h1>
          <p className="text-gray-600 mt-1">{pkg?.description}</p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {pkg?.date} | {pkg?.time}
          </div>
        </div>
        
        <div className="text-right">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              onClick={() => setFilter('all')}
              type="button" 
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')}
              type="button" 
              className={`px-4 py-2 text-sm font-medium ${
                filter === 'pending' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('boarded')}
              type="button" 
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                filter === 'boarded' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Boarded
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-indigo-700">Total Passengers</p>
              <p className="text-2xl font-bold text-indigo-900">{totalPassengers}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-700">Passengers Boarded</p>
              <p className="text-2xl font-bold text-green-900">{boardedPassengers}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-amber-700">Pending Boarding</p>
              <p className="text-2xl font-bold text-amber-900">{pendingPassengers}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search passengers..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div>
            <select 
              value={pickupFilter}
              onChange={(e) => setPickupFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            >
              <option value="all">All Pickup Points</option>
              {pickupPoints.map((point, index) => (
                <option key={index} value={point}>{point}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="mr-3 text-sm text-gray-700">Boarding Progress:</span>
          <div className="w-48 bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${(boardedPassengers / totalPassengers) * 100}%` }}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {Math.round((boardedPassengers / totalPassengers) * 100)}%
          </span>
        </div>
      </div>

      {/* Passenger List */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left w-12">Status</th>
              <th className="py-3 px-4 text-left">Passenger Name</th>
              <th className="py-3 px-4 text-left">Pickup Point</th>
              {/* <th className="py-3 px-4 text-left">People</th> */}
              <th className="py-3 px-4 text-left">Notes</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPassengers.map((passenger) => (
              <tr 
                key={passenger.id} 
                className={passenger.isBoarded ? 'bg-green-50' : 'hover:bg-gray-50'}
              >
                <td className="py-3 px-4">
                  <div className={`w-3 h-3 rounded-full ${passenger.isBoarded ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                </td>
                <td className="py-4 px-4 font-medium text-gray-900">
                  {passenger.name}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {passenger.pickupPoint}
                  </span>
                </td>
                {/* <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800">
                    {passenger.people}
                  </span>
                </td> */}
                <td className="py-4 px-4">
                  {showNotes[passenger.id] ? (
                    <div>
                      <textarea
                        value={passenger.notes}
                        onChange={(e) => handleNoteChange(passenger.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Add notes..."
                        rows="2"
                      />
                      <button 
                        onClick={() => toggleNotes(passenger.id)}
                        className="mt-1 text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Save & Close
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {passenger.notes || "No notes"}
                      </p>
                      <button 
                        onClick={() => toggleNotes(passenger.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        {passenger.notes ? "Edit Notes" : "Add Notes"}
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={passenger.isBoarded}
                        onChange={() => handleBoardingToggle(passenger.id)}
                        className="sr-only"
                      />
                      <div className={`block w-14 h-7 rounded-full ${passenger.isBoarded ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${passenger.isBoarded ? 'transform translate-x-7' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {passenger.isBoarded ? 'Boarded' : 'Mark as Boarded'}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPassengers.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-gray-500 text-lg mb-2">No passengers found</div>
            <p className="text-gray-400">Try changing your filters or search term</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pickup Locations</h3>
          <ul className="space-y-3">
            {pickupPoints.map((point, i) => {
              const count = passengers.filter(p => p.pickupPoint === point).length;
              return (
                <li key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
                      {count}
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{Math.round((count / totalPassengers) * 100)}%</span>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Boarding Actions</h3>
          <div className="space-y-4">
  <button 
    onClick={handleMarkAllAsBoarded}
    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition flex items-center justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    Mark All as Boarded
  </button>
  <button 
    onClick={handleExportCSV}
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition flex items-center justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    Export to CSV
  </button>
  <button 
    onClick={handlePrint}
    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition flex items-center justify-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
    Print List
  </button>
</div>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Boarding Summary</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Boarded Passengers</span>
                <span className="font-medium">{boardedPassengers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(boardedPassengers / totalPassengers) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Pending Boarding</span>
                <span className="font-medium">{pendingPassengers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-amber-500 h-2.5 rounded-full" 
                  style={{ width: `${(pendingPassengers / totalPassengers) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Total Pickup Points</span>
                <span className="font-medium">{pickupPoints.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-500 h-2.5 rounded-full" 
                  style={{ width: `${(pickupPoints.length / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerPickupList;