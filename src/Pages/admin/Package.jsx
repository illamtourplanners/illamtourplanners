import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { axiosInstance } from '../../config/axiosInstance';

const CreatePackageForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [pickupPoints, setPickupPoints] = useState(['']);

  const handleAddPickupPoint = () => {
    if (pickupPoints.length < 6) setPickupPoints([...pickupPoints, '']);
  };

  const handlePickupChange = (index, value) => {
    const updated = [...pickupPoints];
    updated[index] = value;
    setPickupPoints(updated);
  };

  const handleRemovePickupPoint = (index) => {
    const updated = pickupPoints.filter((_, i) => i !== index);
    setPickupPoints(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    // Append standard fields
    Object.entries(data).forEach(([key, val]) => {
      if (key === 'image') {
        formData.append('image', val[0]);
      } else {
        formData.append(key, val);
      }
    });

    // Append dynamic pickup points
    pickupPoints.forEach((point, index) => {
      formData.append(`pickupPoints[${index}]`, point);
    });

    try {
      const res = await axiosInstance.post('/package/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ text: res.data.message, type: 'success' });
      reset();
      setPreviewImage(null);
      setPickupPoints(['']);
    } catch (err) {
      console.log(err);
      
      setMessage({
        text: err.response?.data?.message || 'Something went wrong',
        type: 'error',
      });
    } finally {
      setLoading(false);
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
            <label className="block text-sm font-medium text-gray-700">Package Name *</label>
            <input
              type="text"
              {...register('PackageName', { required: true })}
              placeholder="Give your package a name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Price Per Person */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Price Per Person (₹) *</label>
            <input
              type="number"
              {...register('PricePerPerson', { required: true })}
              placeholder="Enter price per person"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Start Date *</label>
            <input
              type="date"
              {...register('date', { required: true })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Days */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Days *</label>
            <input
              type="number"
              {...register('day', { required: true })}
              placeholder="Number of days"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Nights */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nights *</label>
            <input
              type="number"
              {...register('night', { required: true })}
              placeholder="Number of nights"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Dropoff */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Dropoff Point *</label>
            <input
              type="text"
              {...register('dropoff', { required: true })}
              placeholder="Ending location"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Discount */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Discount (%) *</label>
            <input
              type="number"
              {...register('discount', { required: true })}
              placeholder="Discount percentage"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Advance Price */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Advance Price (₹) *</label>
            <input
              type="number"
              {...register('advancePrice', { required: true })}
              placeholder="Enter advance price"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Pickup Points */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Pickup Points *</label>
            {pickupPoints.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePickupChange(index, e.target.value)}
                  placeholder={`Pickup Point ${index + 1}`}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {pickupPoints.length > 1 && (
                  <button type="button" onClick={() => handleRemovePickupPoint(index)} className="text-red-600 font-bold">×</button>
                )}
              </div>
            ))}
            {pickupPoints.length < 6 && (
              <button type="button" onClick={handleAddPickupPoint} className="text-blue-600 text-sm mt-2 font-medium">+ Add Pickup Point</button>
            )}
          </div>

          {/* Includes */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Includes *</label>
            <input
              type="text"
              {...register('includes', { required: true })}
              placeholder="What's included? (e.g., meals, transport)"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              rows={4}
              {...register('description', { required: true })}
              placeholder="Describe the package details, experiences, and highlights..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Package Image *</label>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="border-2 border-dashed rounded-xl p-4 text-center">
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
                    <p className="text-sm text-blue-600 font-medium">Click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                  </label>
                </div>
              </div>
              {previewImage && (
                <div className="flex-shrink-0 w-40 h-40 border border-gray-300 rounded-xl overflow-hidden">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
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
            {loading ? 'Creating Package...' : 'Create Travel Package'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePackageForm;
