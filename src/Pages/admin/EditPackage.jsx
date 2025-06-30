import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const EditPackage = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue, formState: { errors }, getValues, watch } = useForm();
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [pickupPoints, setPickupPoints] = useState(['']);
  const [includesItems, setIncludesItems] = useState(['']);

  // Fetch package data
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axiosInstance.get(`/package/getallbyid/${id}`);
        const pkg = res.data.data;
        
        setPickupPoints(pkg.pickupPoints || ['']);
        setIncludesItems(pkg.includes || ['']);
        setPreviewImage(pkg.image);

        reset({
          PackageName: pkg.PackageName,
          PricePerPerson: pkg.PricePerPerson,
          date: pkg.date?.slice(0, 10),
          day: pkg.day,
          night: pkg.night,
          dropoff: pkg.dropoff,
          discount: pkg.discount,
          advancePrice: pkg.advancePrice,
          description: pkg.description
        });
      } catch (err) {
        setMessage({ text: 'Failed to load package data', type: 'error' });
      } finally {
        setInitialLoading(false);
      }
    };
    fetchPackage();
  }, [id, reset]);

  // Handle dynamic fields
  const handleAddField = (field, setter) => {
    if (field.length < 20) setter([...field, '']);
  };

  const handleFieldChange = (index, value, field, setter) => {
    const updated = [...field];
    updated[index] = value;
    setter(updated);
  };

  const handleRemoveField = (index, field, setter) => {
    const updated = field.filter((_, i) => i !== index);
    setter(updated);
  };

  // Image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    // Validate advance price
    if (parseFloat(data.advancePrice) > parseFloat(data.PricePerPerson)) {
      setMessage({ text: 'Advance price must be less than total price', type: 'error' });
      return;
    }
    
    // Filter empty fields
    const nonEmptyPickups = pickupPoints.filter(point => point.trim() !== '');
    const nonEmptyIncludes = includesItems.filter(item => item.trim() !== '');
    
    // Validate required arrays
    if (nonEmptyPickups.length === 0 || nonEmptyIncludes.length === 0) {
      setMessage({ 
        text: 'Please provide at least one pickup point and include item', 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();

    // Append form fields
    Object.entries(data).forEach(([key, val]) => {
      if (key === 'image' && val[0]) {
        formData.append('image', val[0]);
      } else if (val !== undefined && val !== null) {
        formData.append(key, val);
      }
    });

    // Append dynamic fields
    nonEmptyPickups.forEach(point => formData.append('pickupPoints', point));
    nonEmptyIncludes.forEach(item => formData.append('includes', item));

    try {
    const response=  await axiosInstance.put(`/package/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      
      setMessage({ text: 'Package updated successfully!', type: 'success' });
    } catch (err) {
        console.log(err);
        
      setMessage({
        text: err.response?.data?.message || 'Update failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Watch price fields for real-time validation
  const watchPrices = watch(['PricePerPerson', 'advancePrice']);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Edit Travel Package</h2>

      {message.text && (
        <div className={`mb-4 p-4 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Name */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Package Name *
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.PackageName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('PackageName', { 
              required: 'Package name is required',
              minLength: {
                value: 5,
                message: 'Minimum 5 characters required'
              }
            })}
          />
          {errors.PackageName && (
            <p className="text-red-500 text-sm mt-1">{errors.PackageName.message}</p>
          )}
        </div>

        {/* Pricing Section */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Price Per Person (₹) *
          </label>
          <input
            type="number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.PricePerPerson ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('PricePerPerson', { 
              required: 'Price is required',
              min: {
                value: 1,
                message: 'Price must be at least ₹1'
              }
            })}
          />
          {errors.PricePerPerson && (
            <p className="text-red-500 text-sm mt-1">{errors.PricePerPerson.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Advance Price (₹) *
          </label>
          <input
            type="number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.advancePrice || 
              parseFloat(watchPrices[1]) > parseFloat(watchPrices[0]) 
                ? 'border-red-500' 
                : 'border-gray-300'
            }`}
            {...register('advancePrice', { 
              required: 'Advance price is required',
              min: {
                value: 0,
                message: 'Price cannot be negative'
              }
            })}
          />
          {(errors.advancePrice || parseFloat(watchPrices[1]) > parseFloat(watchPrices[0])) && (
            <p className="text-red-500 text-sm mt-1">
              {errors.advancePrice?.message || 'Must be less than total price'}
            </p>
          )}
        </div>

        {/* Duration Section */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Days *
          </label>
          <input
            type="number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.day ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('day', { 
              required: 'Days count is required',
              min: {
                value: 1,
                message: 'Minimum 1 day required'
              }
            })}
          />
          {errors.day && (
            <p className="text-red-500 text-sm mt-1">{errors.day.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Nights *
          </label>
          <input
            type="number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.night ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('night', { 
              required: 'Nights count is required',
              min: {
                value: 1,
                message: 'Minimum 1 night required'
              }
            })}
          />
          {errors.night && (
            <p className="text-red-500 text-sm mt-1">{errors.night.message}</p>
          )}
        </div>

        {/* Date & Discount */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Departure Date *
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('date', { required: 'Departure date is required' })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.discount ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('discount', { 
              min: {
                value: 0,
                message: 'Discount cannot be negative'
              },
              max: {
                value: 100,
                message: 'Discount cannot exceed 100%'
              }
            })}
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
          )}
        </div>

        {/* Dropoff Location */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Dropoff Location *
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.dropoff ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('dropoff', { 
              required: 'Dropoff location is required',
              minLength: {
                value: 5,
                message: 'Minimum 5 characters required'
              }
            })}
          />
          {errors.dropoff && (
            <p className="text-red-500 text-sm mt-1">{errors.dropoff.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Package Description *
          </label>
          <textarea
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 20,
                message: 'Minimum 20 characters required'
              }
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Pickup Points */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Pickup Points *
          </label>
          {pickupPoints.map((point, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleFieldChange(index, e.target.value, pickupPoints, setPickupPoints)}
                placeholder={`Pickup Point ${index + 1}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {pickupPoints.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveField(index, pickupPoints, setPickupPoints)}
                  className="text-red-600 font-bold px-3"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {pickupPoints.length < 20 && (
            <button 
              type="button" 
              onClick={() => handleAddField(pickupPoints, setPickupPoints)}
              className="text-blue-600 text-sm mt-2 font-medium"
            >
              + Add Pickup Point
            </button>
          )}
          {pickupPoints.filter(p => p.trim() !== '').length === 0 && (
            <p className="text-red-500 text-sm mt-1">At least one pickup point required</p>
          )}
        </div>

        {/* Includes */}
        <div className="md:col-span-2 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Inclusions *
          </label>
          {includesItems.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleFieldChange(index, e.target.value, includesItems, setIncludesItems)}
                placeholder={`Included Item ${index + 1}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              {includesItems.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => handleRemoveField(index, includesItems, setIncludesItems)}
                  className="text-red-600 font-bold px-3"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {includesItems.length < 20 && (
            <button 
              type="button" 
              onClick={() => handleAddField(includesItems, setIncludesItems)}
              className="text-blue-600 text-sm mt-2 font-medium"
            >
              + Add Inclusion
            </button>
          )}
          {includesItems.filter(i => i.trim() !== '').length === 0 && (
            <p className="text-red-500 text-sm mt-1">At least one inclusion required</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Package Image
          </label>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="border-2 border-dashed rounded-xl p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <p className="text-sm text-blue-600 font-medium">Click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Max 5MB)</p>
                </label>
              </div>
            </div>
            {previewImage && (
              <div className="flex-shrink-0 w-40 h-40 border border-gray-300 rounded-xl overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Recommended size: 1200x800 pixels
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-6 md:col-span-2 flex justify-center">
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
            {loading ? 'Updating Package...' : 'Update Travel Package'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditPackage;