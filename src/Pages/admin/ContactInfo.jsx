import React, { useState } from 'react';
import { FaSearch, FaEnvelope, FaPhone, FaUser, FaCalendarAlt, FaEye, FaTrash, FaReply, FaFilter, FaRegStar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactInfoAdmin = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Package Inquiry',
      message: 'I would like more information about your premium Bali package. Could you send me the detailed itinerary?',
      date: '2023-10-15',
      time: '14:30',
      status: 'new',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.j@workmail.com',
      phone: '+1 (444) 987-6543',
      subject: 'Booking Modification',
      message: 'I need to change the dates for my Maldives trip booked on Oct 10. How can I proceed?',
      date: '2023-10-14',
      time: '09:15',
      status: 'in-progress',
      priority: 'medium',
      read: true
    },
    {
      id: 3,
      name: 'Robert Chen',
      email: 'robert.chen@business.com',
      phone: '+1 (333) 456-7890',
      subject: 'Group Booking',
      message: 'Our company is planning a retreat for 25 people. Do you offer corporate discounts?',
      date: '2023-10-13',
      time: '16:45',
      status: 'completed',
      priority: 'high',
      read: true
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.org',
      phone: '+1 (222) 111-2222',
      subject: 'Cancellation Request',
      message: 'Unfortunately I need to cancel my Santorini trip due to unforeseen circumstances.',
      date: '2023-10-12',
      time: '11:20',
      status: 'new',
      priority: 'medium',
      read: false
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.b@traveler.com',
      phone: '+1 (777) 888-9999',
      subject: 'Special Requirements',
      message: 'I have dietary restrictions and mobility concerns. Can your Thailand tour accommodate these?',
      date: '2023-10-10',
      time: '15:10',
      status: 'in-progress',
      priority: 'high',
      read: true
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  
  // Filter contacts based on search and status
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle contact deletion
  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
      setViewMode('list');
    }
  };
  
  // Mark as read/unread
  const toggleReadStatus = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, read: !contact.read } : contact
    ));
    
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({...selectedContact, read: !selectedContact.read});
    }
  };
  
  // Update contact status
  const updateStatus = (id, newStatus) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
    
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({...selectedContact, status: newStatus});
    }
  };
  
  // Send reply
  const handleSendReply = () => {
    if (replyContent.trim() && selectedContact) {
      alert(`Reply sent to ${selectedContact.email}:\n\n${replyContent}`);
      setReplyContent('');
      updateStatus(selectedContact.id, 'completed');
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      'new': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800'
    };
    
    const statusText = {
      'new': 'New',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    );
  };
  
  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    return priority === 'high' ? (
      <FaStar className="text-yellow-500" />
    ) : (
      <FaRegStar className="text-gray-300" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Inquiries</h1>
          <p className="text-gray-600">Manage customer inquiries and support requests</p>
        </div>
        
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500">
                {filteredContacts.length} {filteredContacts.length === 1 ? 'inquiry' : 'inquiries'}
              </div>
            </div>
          </div>
        </div>
        
        {viewMode === 'list' ? (
          /* Contact List View */
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <motion.tr 
                    key={contact.id}
                    className={`hover:bg-gray-50 ${!contact.read ? 'bg-blue-50' : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className={`font-medium ${!contact.read ? 'font-bold' : ''}`}>
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`${!contact.read ? 'font-bold' : ''}`}>{contact.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{contact.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.date}</div>
                      <div className="text-sm text-gray-500">{contact.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={contact.priority} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setViewMode('detail');
                          if (!contact.read) toggleReadStatus(contact.id);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEye className="inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline mr-1" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaEnvelope className="text-gray-500 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No inquiries found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Contact Detail View */
          selectedContact && (
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedContact.subject}</h2>
                    <div className="flex items-center mt-2">
                      <StatusBadge status={selectedContact.status} />
                      <div className="ml-3">
                        <PriorityBadge priority={selectedContact.priority} />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewMode('list')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Back to list
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <FaUser className="text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-800">Contact Information</h3>
                    </div>
                    <div className="ml-9">
                      <p className="font-medium">{selectedContact.name}</p>
                      <p className="text-gray-600">{selectedContact.email}</p>
                      <p className="text-gray-600 mt-1">{selectedContact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-green-600" />
                      </div>
                      <h3 className="font-medium text-gray-800">Inquiry Date</h3>
                    </div>
                    <div className="ml-9">
                      <p className="font-medium">{selectedContact.date}</p>
                      <p className="text-gray-600">{selectedContact.time}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FaEnvelope className="text-purple-600" />
                      </div>
                      <h3 className="font-medium text-gray-800">Status</h3>
                    </div>
                    <div className="ml-9 flex flex-wrap gap-2">
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={selectedContact.status}
                        onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => toggleReadStatus(selectedContact.id)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          selectedContact.read 
                            ? 'bg-gray-200 text-gray-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {selectedContact.read ? 'Mark as unread' : 'Mark as read'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium text-gray-800 mb-2">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">{selectedContact.message}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Reply to Inquiry</h3>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="Type your response here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></textarea>
                  
                  <div className="flex justify-end mt-4 gap-3">
                    <button
                      onClick={() => setReplyContent('')}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleSendReply}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <FaReply className="mr-2" /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default ContactInfoAdmin;