import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

export const AdminExpense = () => {
  // State management
  const [formData, setFormData] = useState({
    category: '',
    categoryname: '',
    rupee: '',
    quantity: '1',
    paymentMethod: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Constants
  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Travel', 'Other'];
  
  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: '💵' },
    { value: 'gpay', label: 'Google Pay', icon: '💳' },
    { value: 'keshu', label: 'Keshu', icon: '🧑' },
    { value: 'sreehari', label: 'Sreehari', icon: '👨‍💼' },
    { value: 'upz', label: 'UPZ', icon: '🏦' },
    { value: 'rishi', label: 'Rishi', icon: '🧑‍💻' }
  ];

  // Calculate totals
 const totalExpense = expenseList.reduce((sum, expense) => {
  return sum + (parseFloat(expense.rupee || 0) * parseInt(expense.quantity || 1));
}, 0);
  // Data fetching
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get('/expense/getAll');
      setExpenseList(res.data.expenses || []);
    } catch (err) {
      setMessage({ text: 'Failed to fetch expenses', type: 'error' });
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axiosInstance.post('/expense/create', formData);
      setMessage({ text: res.data.message, type: 'success' });
      setFormData({ 
        category: '', 
        categoryname: '', 
        rupee: '', 
        quantity: '1',
        paymentMethod: '' 
      });
      await fetchExpenses();
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Error occurred', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await axiosInstance.delete(`/expense/delete/${id}`);
      setMessage({ text: 'Expense deleted successfully', type: 'success' });
      await fetchExpenses();
    } catch (err) {
      setMessage({ text: 'Failed to delete expense', type: 'error' });
    }
  };

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPaymentIcon = (method) => {
    return paymentMethods.find(m => m.value === method)?.icon || '';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Expense Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track and manage all expenses in one place
        </p>
      </header>

      {/* Status Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
        }`}>
          {message.text}
        </div>
      )}

      {/* Add Expense Form */}
      <section className="mb-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Expense
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Item Name *
              </label>
              <input
                type="text"
                name="categoryname"
                value={formData.categoryname}
                onChange={handleChange}
                placeholder="e.g. Office supplies, Client lunch"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="rupee"
                value={formData.rupee}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select method</option>
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.icon} {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Processing...
                </>
              ) : (
                'Add Expense'
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Expense Records */}
      <section className="bg-white rounded-lg shadow-md dark:bg-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Expense Records
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {expenseList.length} records
          </span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <span className="inline-block animate-spin text-2xl">↻</span>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading expenses...</p>
          </div>
        ) : expenseList.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No expenses found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {expenseList.map((expense) => (
                    <tr key={expense._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {expense.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {expense.categoryname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatCurrency(expense.rupee)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {expense.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {getPaymentIcon(expense.paymentMethod)} {expense.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600 dark:text-red-400">
                        {formatCurrency(expense.rupee * expense.quantity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="text-red-600 hover:text-red-800 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-gray-600"
                          title="Delete expense"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Expenses:
                </span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpense)}
                </span>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};