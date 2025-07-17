import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { 
  FiPlus, 
  FiTrash2, 
  FiDollarSign, 
  FiCalendar, 
  FiShoppingCart, 
  FiCreditCard,
  FiSearch,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import { FaGooglePay, FaMoneyBillWave } from 'react-icons/fa';
import { GiHealthPotion } from 'react-icons/gi';
import { IoFastFoodOutline, IoSettingsOutline } from 'react-icons/io5';
import { RiBusLine, RiFlightTakeoffLine } from 'react-icons/ri';
import { BsGraphUp, BsFilter } from 'react-icons/bs';

export const AdminExpense = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: '',
    categoryname: '',
    rupee: '',
    quantity: '1',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    packageId: id 
  });

  const [expenseList, setExpenseList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('records');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { value: 'Food', label: 'Food', icon: <IoFastFoodOutline className="text-lg" />, color: 'bg-red-100 text-red-800' },
    { value: 'Transport', label: 'Transport', icon: <RiBusLine className="text-lg" />, color: 'bg-blue-100 text-blue-800' },
    { value: 'Utilities', label: 'Utilities', icon: <IoSettingsOutline className="text-lg" />, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Entertainment', label: 'Entertainment', icon: <BsGraphUp className="text-lg" />, color: 'bg-purple-100 text-purple-800' },
    { value: 'Shopping', label: 'Shopping', icon: <FiShoppingCart className="text-lg" />, color: 'bg-green-100 text-green-800' },
    { value: 'Healthcare', label: 'Healthcare', icon: <GiHealthPotion className="text-lg" />, color: 'bg-pink-100 text-pink-800' },
    { value: 'Travel', label: 'Travel', icon: <RiFlightTakeoffLine className="text-lg" />, color: 'bg-indigo-100 text-indigo-800' },
    { value: 'Other', label: 'Other', icon: <FiDollarSign className="text-lg" />, color: 'bg-gray-100 text-gray-800' }
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: <FaMoneyBillWave className="text-lg" /> },
    { value: 'gpay', label: 'Google Pay', icon: <FaGooglePay className="text-lg" /> },
    { value: 'keshu', label: 'Keshu', icon: <span className="text-lg">🧑</span> },
    { value: 'sreehari', label: 'Sreehari', icon: <span className="text-lg">👨‍💼</span> },
    { value: 'upz', label: 'UPZ', icon: <span className="text-lg">🏦</span> },
    { value: 'rishi', label: 'Rishi', icon: <span className="text-lg">🧑‍💻</span> }
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
      const res = await axiosInstance.get(`/expense/getAll/${id}`);
      setExpenseList(res.data.data || []);
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
        date: new Date().toISOString().split('T')[0],
        packageId:id
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
    return found ? found.icon : <FiDollarSign className="text-lg" />;
  };

  const getCategoryColor = (category) => {
    const found = categories.find(c => c.value === category);
    return found ? found.color : 'bg-gray-100 text-gray-800';
  };

  const getPaymentIcon = (method) => {
    const found = paymentMethods.find(m => m.value === method);
    return found ? found.icon : <FiCreditCard className="text-lg" />;
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
      {/* Header */}
      <div className="bg-white text-black border-b border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Expense Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {activeTab === 'form' 
                  ? 'Add new expense' 
                  : `${expenseCount} transactions • Total: ${formatCurrency(totalExpense)}`
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('form')}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base font-medium"
              >
                <FiPlus className="mr-2" />
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('records')}
                  className={`flex-1 flex items-center justify-center py-5 px-4 text-base font-medium ${
                    activeTab === 'records' 
                      ? 'border-b-3 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <FiCreditCard className="mr-2" />
                  Expense Records
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 flex items-center justify-center py-5 px-4 text-base font-medium ${
                    activeTab === 'form' 
                      ? 'border-b-3 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <FiPlus className="mr-2" />
                  Add Expense
                </button>
              </nav>
            </div>

            {/* Form Section */}
            {activeTab === 'form' && (
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <FiChevronDown className="text-gray-400" />
                        </div>
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount (₹)
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <input
                          type="number"
                          name="rupee"
                          value={formData.rupee}
                          onChange={handleChange}
                          placeholder="0.00"
                          required
                          className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                          className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select payment method</option>
                          {paymentMethods.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <FiChevronDown className="text-gray-400" />
                        </div>
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
                        className="block w-full pl-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto flex justify-center px-6 py-3.5 rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
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
                {/* Filters and Search */}
                <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Mobile filters button */}
                    <div className="md:hidden">
                      <button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="flex items-center px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 text-sm font-medium w-full"
                      >
                        <BsFilter className="mr-2" />
                        Filters
                        <FiChevronDown className={`ml-2 transition-transform ${mobileFiltersOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Desktop filters */}
                    <div className="hidden md:flex space-x-2">
                      {filters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setFilter(f.value)}
                          className={`px-4 py-2.5 text-sm font-medium rounded-xl ${
                            filter === f.value 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                    
                    <div className="w-full md:w-72">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiSearch className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search expenses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile filters dropdown */}
                  {mobileFiltersOpen && (
                    <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
                      {filters.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => {
                            setFilter(f.value);
                            setMobileFiltersOpen(false);
                          }}
                          className={`px-4 py-2.5 text-sm font-medium rounded-xl ${
                            filter === f.value 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-blue-500 text-white mr-4">
                        <FiDollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(totalExpense)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 p-5 rounded-2xl border border-green-100 dark:border-green-900/50 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-green-500 text-white mr-4">
                        <FiCreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transactions</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{expenseCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-sm">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-purple-500 text-white mr-4">
                        <FiShoppingCart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average/Transaction</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
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
                        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                      ))}
                    </div>
                  ) : filteredExpenses.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
                      <div className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600">
                        <FiCreditCard className="w-full h-full" />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No expenses found</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md text-center">
                        {searchQuery 
                          ? 'No expenses match your search criteria' 
                          : 'Get started by adding your first expense'}
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => setActiveTab('form')}
                          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                        >
                          <FiPlus className="mr-2" />
                          Add Expense
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                          <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Details
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Payment
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-black divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredExpenses.map((exp) => (
                            <tr key={exp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${getCategoryColor(exp.category)}`}>
                                    {getCategoryIcon(exp.category)}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{exp.category}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{exp.categoryname}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Qty: {exp.quantity} × {formatCurrency(exp.rupee)}
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(exp.rupee * exp.quantity)}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-gray-500 dark:text-gray-400">
                                    {getPaymentIcon(exp.paymentMethode)}
                                  </div>
                                  <div className="ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                    {exp.paymentMethode}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleDelete(exp._id)}
                                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-900 dark:hover:text-red-500 transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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