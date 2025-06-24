import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../config/axiosInstance';

const CreatePackageForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

 const onSubmit = async (data) => {
  setLoading(true);
  const formData = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    if (key === 'image') {
      formData.append('image', val[0]); // ✅ Match Multer field name
    } else {
      formData.append(key, val);
    }
  });
console.log(formData);

  try {
    const res = await axiosInstance.post('/package/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setMessage({ text: res.data.message, type: 'success' });
    reset();
    setPreviewImage(null);
  } catch (err) {
    setMessage({ 
      text: err.response?.data?.message || 'Something went wrong', 
      type: 'error' 
    });
  } finally {
    setLoading(false);
  }
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto my-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-8">
        <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Create Travel Package</h2>
        <p className="text-gray-600 mt-2">Fill in the details to create a new travel experience</p>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg text-center ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </motion.div>
      )}

     <form onSubmit={handleSubmit(onSubmit)}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    {/* Package Name */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Package Name {errors.PackageName && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        {...register('PackageName', { required: true })}
        placeholder="Give your package a name"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.PackageName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.PackageName && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Price Per Person */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Price Per Person (₹) {errors.PricePerPerson && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        {...register('PricePerPerson', { required: true })}
        placeholder="Enter price per person"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.PricePerPerson ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.PricePerPerson && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Start Date */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Start Date {errors.date && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="date"
        {...register('date', { required: true })}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.date ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.date && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Days */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Days {errors.day && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        {...register('day', { required: true })}
        placeholder="Number of days"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.day ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.day && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Nights */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Nights {errors.night && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        {...register('night', { required: true })}
        placeholder="Number of nights"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.night ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.night && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Pickup Point */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Pickup Point {errors.pickupPoint && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        {...register('pickupPoint', { required: true })}
        placeholder="Starting location"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.pickupPoint ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.pickupPoint && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Dropoff Point */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Dropoff Point {errors.dropoff && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        {...register('dropoff', { required: true })}
        placeholder="Ending location"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.dropoff ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.dropoff && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Discount (%) */}
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Discount (%) {errors.discount && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        {...register('discount', { required: true })}
        placeholder="Discount percentage"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.discount ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.discount && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Includes */}
    <div className="space-y-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Includes {errors.includes && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        {...register('includes', { required: true })}
        placeholder="What's included? (e.g., meals, transport)"
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.includes ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.includes && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Description */}
    <div className="space-y-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Description {errors.description && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        rows={4}
        {...register('description', { required: true })}
        placeholder="Describe the package details, experiences, and highlights..."
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
          errors.description ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
        }`}
      />
      {errors.description && <p className="text-sm text-red-600 mt-1">This field is required</p>}
    </div>

    {/* Image Upload */}
    <div className="space-y-4 md:col-span-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Package Image {errors.image && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              errors.image ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
            }`}>
              <input
                type="file"
                accept="image/*"
                {...register('image', {
                  required: true,
                  onChange: handleImageChange
                })}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                </div>
              </label>
            </div>
            {errors.image && <p className="text-sm text-red-600 mt-1">Image is required</p>}
          </div>

          {previewImage && (
            <div className="flex-shrink-0">
              <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl w-40 h-40 overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Package preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-8 flex justify-center">
    <motion.button
      type="submit"
      disabled={loading}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all ${
        loading 
          ? 'bg-blue-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl'
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating Package...
        </div>
      ) : (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Travel Package
        </div>
      )}
    </motion.button>
  </div>
</form>

    </motion.div>
  );
};

export default CreatePackageForm;