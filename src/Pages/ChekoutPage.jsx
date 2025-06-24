import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { axiosInstance } from "../config/axiosInstance";

const PackageBookingForm = () => {
  const [step, setStep] = useState(1);
  const [people, setPeople] = useState([
    { 
      name: "", 
      phone: "", 
      email: "", 
      gender: "", 
      aadhaar: "" ,
      pickupPoint:"",
    }
  ]);

  const addPerson = () => {
    setPeople((prev) => [...prev, { 
      gender: "", 
      name: "", 
      age: "", 
      aadhaar: "" 
    }]);
  };

  const updatePerson = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const [packageDetails, setPackageDetails] = useState({
    packageName: "Premium Swiss Alps Adventure",
    destination: "Switzerland",
    startDate: "2025-07-15",
    endDate: "2025-07-22",
    adults: 2,
    children: 1,
    rooms: 1,
    specialRequests: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const validateStep = (currentStep) => {
    let isValid = true;
    const newErrors = {};
    
    if (currentStep === 1) {
      // Validate primary participant
      const primary = people[0];
      if (!primary.name.trim()) newErrors.primaryName = "Name is required";
      if (!primary.phone.trim()) {
        newErrors.primaryPhone = "Phone is required";
      } else if (!/^\d{10}$/.test(primary.phone)) {
        newErrors.primaryPhone = "Invalid phone number";
      }
      if (!primary.email.trim()) {
        newErrors.primaryEmail = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(primary.email)) {
        newErrors.primaryEmail = "Invalid email format";
      }
      if (!primary.gender) newErrors.primaryGender = "Gender is required";
      if (!primary.aadhaar) newErrors.primaryAadhaar = "Aadhaar is required";
      
      // Validate additional participants
      people.slice(1).forEach((person, index) => {
        const idx = index + 1;
        if (!person.name.trim()) newErrors[`name_${idx}`] = `Person #${idx} name is required`;
        if (!person.gender) newErrors[`gender_${idx}`] = `Person #${idx} gender is required`;
        if (!person.age) newErrors[`age_${idx}`] = `Person #${idx} age is required`;
        if (!person.aadhaar) newErrors[`aadhaar_${idx}`] = `Person #${idx} Aadhaar is required`;
      });
    }
    
    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

const handleSubmit = async () => {
  if (validateStep(2)) {
    setIsSubmitting(true);

    const formattedCustomers = people.map((p, index) => ({
      fullName: p.name,
      age: parseInt(p.age) || 0,
      phoneNumber: index === 0 ? p.phone : undefined,
      gender: p.gender,
      email: index === 0 ? p.email : undefined,
      pickupPoint: p.pickupPoint || "",
      aadhaarNumber: p.aadhaar.trim(),
    }));

    const totalPeople = people.length;
    const amount = 1500 * totalPeople; // example amount per person
    const name = people[0].name;
console.log(name);

    try {
      const res = await axiosInstance.post("/checkout/create", {
        packageName: packageDetails.packageName,
        packageDate: packageDetails.startDate,
        customers: formattedCustomers,
        amount,
        name,
      });

      const redirectUrl = res.data.redirectUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect to PhonePe payment page
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error: " + error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
};











  useEffect(() => {
    if (bookingSuccess) {
      const timer = setTimeout(() => setStep(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">1</span>
              Package Details
            </h2>
            
            <div className="max-w-6xl mx-auto p-4">
              <h2 className="text-xl font-semibold mb-4">Package Participants</h2>

              {people.map((person, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border rounded-lg bg-gray-50"
                >
                  <h3 className="font-semibold mb-3">
                    {index === 0 
                      ? "Primary Person (Contact & Identification)" 
                      : `Additional Person #${index}`}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name field for all persons */}
                    <div className="space-y-1">
                      <label className="block font-medium text-gray-700">
                        {index === 0 ? "Full Name" : "Name"}
                      </label>
                      <input
                        type="text"
                        value={person.name}
                        onChange={(e) => updatePerson(index, "name", e.target.value)}
                        placeholder={index === 0 ? "Enter full name" : "Enter name"}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {index === 0 && errors.primaryName && (
                        <p className="text-red-500 text-sm mt-1">{errors.primaryName}</p>
                      )}
                      {index > 0 && errors[`name_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`name_${index}`]}</p>
                      )}
                    </div>

                    {/* Phone only for primary person */}
                    {index === 0 && (
                      <div className="space-y-1">
                        <label className="block font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          value={person.phone}
                          onChange={(e) => updatePerson(index, "phone", e.target.value)}
                          placeholder="Enter phone number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.primaryPhone && (
                          <p className="text-red-500 text-sm mt-1">{errors.primaryPhone}</p>
                        )}
                      </div>
                    )}

                    {/* Email only for primary person */}
                    {index === 0 && (
                      <div className="space-y-1">
                        <label className="block font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={person.email}
                          onChange={(e) => updatePerson(index, "email", e.target.value)}
                          placeholder="Enter email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.primaryEmail && (
                          <p className="text-red-500 text-sm mt-1">{errors.primaryEmail}</p>
                        )}
                      </div>
                    )}
                   {index === 0 && (
  <div className="space-y-1">
    <label className="block font-medium text-gray-700">Pickup Point</label>
    <select
      value={person.pickupPoint}
      onChange={(e) => updatePerson(index, "pickupPoint", e.target.value)}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select Pickup Point</option>
      <option value="Cochin">Cochin</option>
      <option value="Trivandrum">Trivandrum</option>
      <option value="Kozhikode">Kozhikode</option>
      <option value="Alleppey">Alleppey</option>
      <option value="Munnar">Munnar</option>
      {/* Add more options as needed */}
    </select>
    {errors.primaryPickupPoint && (
      <p className="text-red-500 text-sm mt-1">{errors.primaryPickupPoint}</p>
    )}
  </div>
)}

                    {/* Gender for all persons */}
                    <div className="space-y-1">
                      <label className="block font-medium text-gray-700">Gender</label>
                      <select
                        value={person.gender}
                        onChange={(e) => updatePerson(index, "gender", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {index === 0 && errors.primaryGender && (
                        <p className="text-red-500 text-sm mt-1">{errors.primaryGender}</p>
                      )}
                      {index > 0 && errors[`gender_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`gender_${index}`]}</p>
                      )}
                    </div>

                    {/* Age for additional persons */}
                    {index > 0 && (
                      <div className="space-y-1">
                        <label className="block font-medium text-gray-700">Age</label>
                        <input
                          type="number"
                          min="0"
                          value={person.age}
                          onChange={(e) => updatePerson(index, "age", e.target.value)}
                          placeholder="Enter age"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors[`age_${index}`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`age_${index}`]}</p>
                        )}
                      </div>
                    )}

                    {/* Aadhaar for all persons */}
                    <div className={`space-y-1 ${index === 0 ? 'md:col-span-2' : ''}`}>
                      <label className="block font-medium text-gray-700">Aadhaar Number</label>
                      <input
                        type="text"
                        maxLength={12}
                        value={person.aadhaar}
                        onChange={(e) => updatePerson(index, "aadhaar", e.target.value)}
                        placeholder="Enter Aadhaar number"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {index === 0 && errors.primaryAadhaar && (
                        <p className="text-red-500 text-sm mt-1">{errors.primaryAadhaar}</p>
                      )}
                      {index > 0 && errors[`aadhaar_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`aadhaar_${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPerson}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <AiOutlinePlus size={20} />
                <span>Add Another Person</span>
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                All special requests will be accommodated based on availability. We'll contact you for any additional requirements.
              </p>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">2</span>
              Payment Option
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-medium text-gray-700">Payment Method</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option>UPI</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === "UPI" && (
                  <div className="space-y-1">
                    <label className="block font-medium text-gray-700">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Booking Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package</span>
                    <span className="font-medium">{packageDetails.packageName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="font-medium">{packageDetails.destination}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
                      {new Date(packageDetails.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                      {new Date(packageDetails.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travellers</span>
                    <span className="font-medium">
                      {packageDetails.adults} Adults, {packageDetails.children} Children
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rooms</span>
                    <span className="font-medium">{packageDetails.rooms} {packageDetails.rooms === 1 ? 'Room' : 'Rooms'}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package Price</span>
                      <span className="font-medium">₹98,500.00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">₹12,325.00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">-₹7,500.00</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 mt-3">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹1,03,325.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Your booking includes flights, 4-star accommodation, guided tours, and daily breakfast. 
                Travel insurance is recommended for international trips.
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8 relative">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Illam Tour Planners</h1>
                <p className="mt-1 opacity-90">Book your dream vacation package securely</p>
              </div>
              <motion.div 
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-white opacity-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 13.047 14.01c-.04.27-.22.482-.438.551a.557.557 0 01-.158.04.555.555 0 01-.16-.01l-3.001-.797-.797 3.001a.551.551 0 01-.699.33l-3.498-1.43a1 1 0 01-.574-1.289l1.43-3.5-.798-3.022c-.04-.27.05-.548.27-.697l3.498-2.309a1 1 0 011.113.072l2.995 2.176L11.033 2.26A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="bg-gray-50 p-4 md:p-6">
            <div className="flex justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
                <motion.div 
                  className="h-full bg-blue-600" 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: step === 1 ? "0%" : "100%"
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
              
              {[1, 2].map((s) => (
                <div key={s} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= s 
                        ? "bg-blue-600 text-white" 
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    step >= s ? "text-gray-800" : "text-gray-500"
                  }`}>
                    {s === 1 ? "Details" : "Payment"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6 md:p-8">
            {bookingSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6">
                  Your travel package has been booked successfully. 
                  Your itinerary and vouchers have been sent to {people[0]?.email}
                </p>
                <div className="animate-pulse text-sm text-gray-500">
                  Preparing your travel documents...
                </div>
              </motion.div>
            ) : (
              <>
                {renderStep()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10">
                  {step > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back
                    </motion.button>
                  )}
                  
                  {step < 2 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-75"
                      disabled={isSubmitting}
                    >
                      Continue
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="ml-auto px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-75"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
            © 2025 Illam Tour Planners | Premium Travel Experiences
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackageBookingForm;