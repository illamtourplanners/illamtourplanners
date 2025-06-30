import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { 
  FiPlus, 
  FiTrash2, 
  FiDollarSign, 
  FiCalendar, 
  FiShoppingCart, 
  FiCreditCard,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';
import { FaGooglePay, FaMoneyBillWave } from 'react-icons/fa';
import { GiHealthPotion } from 'react-icons/gi';
import { IoFastFoodOutline, IoSettingsOutline } from 'react-icons/io5';
import { RiBusLine, RiFlightTakeoffLine } from 'react-icons/ri';
import { BsGraphUp, BsFilter } from 'react-icons/bs';

export const AdminExpense = () => {
  const [formData, setFormData] = useState({
    category: '',
    categoryname: '',
    rupee: '',
    quantity: '1',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [expenseList, setExpenseList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('records');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { value: 'Food', label: 'Food', icon: <IoFastFoodOutline className="mr-2" />, color: 'bg-red-100 text-red-800' },
    { value: 'Transport', label: 'Transport', icon: <RiBusLine className="mr-2" />, color: 'bg-blue-100 text-blue-800' },
    { value: 'Utilities', label: 'Utilities', icon: <IoSettingsOutline className="mr-2" />, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Entertainment', label: 'Entertainment', icon: <BsGraphUp className="mr-2" />, color: 'bg-purple-100 text-purple-800' },
    { value: 'Shopping', label: 'Shopping', icon: <FiShoppingCart className="mr-2" />, color: 'bg-green-100 text-green-800' },
    { value: 'Healthcare', label: 'Healthcare', icon: <GiHealthPotion className="mr-2" />, color: 'bg-pink-100 text-pink-800' },
    { value: 'Travel', label: 'Travel', icon: <RiFlightTakeoffLine className="mr-2" />, color: 'bg-indigo-100 text-indigo-800' },
    { value: 'Other', label: 'Other', icon: <FiDollarSign className="mr-2" />, color: 'bg-gray-100 text-gray-800' }
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: <FaMoneyBillWave className="mr-2" /> },
    { value: 'gpay', label: 'Google Pay', icon: <FaGooglePay className="mr-2" /> },
    { value: 'keshu', label: 'Keshu', icon: <span className="mr-2">🧑</span> },
    { value: 'sreehari', label: 'Sreehari', icon: <span className="mr-2">👨‍💼</span> },
    { value: 'upz', label: 'UPZ', icon: <span className="mr-2">🏦</span> },
    { value: 'rishi', label: 'Rishi', icon: <span className="mr-2">🧑‍💻</span> }
  ];

  const filters = [
    { value: 'all', label: 'All Expenses' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get('/expense/getAll');
      setExpenseList(res.data.expenses || []);
    } catch {
      toast.error('Failed to fetch expenses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        paymentMethode: formData.paymentMethod
      };
      delete payload.paymentMethod;

      const res = await axiosInstance.post('/expense/create', payload);
      toast.success(res.data.message || 'Expense added successfully!');

      setFormData({
        category: '',
        categoryname: '',
        rupee: '',
        quantity: '1',
        paymentMethod: '',
        date: new Date().toISOString().split('T')[0]
      });

      fetchExpenses();
      setActiveTab('records');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Expense?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/expense/delete/${id}`);
          toast.success('Expense deleted successfully!');
          fetchExpenses();
        } catch {
          toast.error('Failed to delete expense');
        }
      }
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const getCategoryIcon = (category) => {
    const found = categories.find(c => c.value === category);
    return found ? found.icon : <FiDollarSign className="mr-2" />;
  };

  const getCategoryColor = (category) => {
    const found = categories.find(c => c.value === category);
    return found ? found.color : 'bg-gray-100 text-gray-800';
  };

  const getPaymentIcon = (method) => {
    const found = paymentMethods.find(m => m.value === method);
    return found ? found.icon : <FiCreditCard className="mr-2" />;
  };

  const filteredExpenses = expenseList.filter(exp => {
    // Filter by time period
    const now = new Date();
    const expenseDate = new Date(exp.date);
    
    if (filter === 'today') {
      return expenseDate.toDateString() === now.toDateString();
    }
    if (filter === 'week') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expenseDate >= oneWeekAgo;
    }
    if (filter === 'month') {
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    }
    
    // Filter by search query
    if (searchQuery) {
      return (
        exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.categoryname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.paymentMethode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  const totalExpense = filteredExpenses.reduce((sum, exp) => sum + exp.rupee * exp.quantity, 0);
  const expenseCount = filteredExpenses.length;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Main Content - takes up remaining space below header */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Expense Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {activeTab === 'form' ? 'Add new expense' : `${expenseCount} transactions`}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="hidden md:block bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FiDollarSign className="text-blue-500 mr-2" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Total: {formatCurrency(totalExpense)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setActiveTab('form')}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm text-sm md:text-base"
              >
                <FiPlus className="mr-2" />
                Add Expense
              </button>
            </div>
          </div>

          {/* Main Card */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('records')}
                  className={`flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'records' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                >
                  <FiCreditCard className="mr-2" />
                  Expense Records
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`flex items-center py-4 px-6 text-sm font-medium ${activeTab === 'form' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                >
                  <FiPlus className="mr-2" />
                  Add Expense
                </button>
              </nav>
            </div>

            {/* Form Section */}
            {activeTab === 'form' && (
              <div className="flex-1 overflow-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Item Name
                      </label>
                      <input
                        type="text"
                        name="categoryname"
                        value={formData.categoryname}
                        onChange={handleChange}
                        placeholder="e.g. Groceries, Uber ride"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount (₹)
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="rupee"
                          value={formData.rupee}
                          onChange={handleChange}
                          placeholder="0.00"
                          required
                          className="block w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payment Method
                      </label>
                      <div className="relative">
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          required
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700"
                        >
                          <option value="">Select payment method</option>
                          {paymentMethods.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto flex justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                          Add Expense
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Records Section */}
            {activeTab === 'records' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Filters and Search - Mobile */}
                <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                      className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm"
                    >
                      <BsFilter className="mr-2" />
                      Filters
                      <FiChevronDown className={`ml-2 transition-transform ${mobileFiltersOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  {mobileFiltersOpen && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {filters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => {
                            setFilter(f.value);
                            setMobileFiltersOpen(false);
                          }}
                          className={`px-3 py-2 text-sm rounded-md ${filter === f.value ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filters and Search - Desktop */}
                <div className="hidden md:flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    {filters.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${filter === f.value ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="w-64">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300 mr-4">
                        <FiDollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalExpense)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300 mr-4">
                        <FiCreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{expenseCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-300 mr-4">
                        <FiShoppingCart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average/Transaction</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {expenseCount > 0 ? formatCurrency(totalExpense / expenseCount) : formatCurrency(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expense Table */}
                <div className="flex-1 overflow-auto">
                  {isLoading ? (
                    <div className="p-6 animate-pulse space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                      ))}
                    </div>
                  ) : filteredExpenses.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                      <div className="mx-auto h-24 w-24 text-gray-400">
                        <FiCreditCard className="w-full h-full" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No expenses found</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {searchQuery ? 'Try a different search term' : 'Get started by adding a new expense'}
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setActiveTab('form')}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                          Add Expense
                        </button>
                      </div>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Details
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Payment
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredExpenses.map((exp) => (
                          <tr key={exp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getCategoryColor(exp.category)}`}>
                                  {getCategoryIcon(exp.category)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">{exp.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">{exp.categoryname}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Qty: {exp.quantity} × {formatCurrency(exp.rupee)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600 dark:text-red-400">
                              {formatCurrency(exp.rupee * exp.quantity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-gray-500 dark:text-gray-400">
                                  {getPaymentIcon(exp.paymentMethode)}
                                </div>
                                <div className="ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                  {exp.paymentMethode}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDelete(exp._id)}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-500 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};