import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { GiJourney } from 'react-icons/gi';

const AddressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packages, setPackages] = useState(null);
  const [pickup,setPickup]=useState([])
  const [people, setPeople] = useState([
    {
      name: "",
      phone: "",
      email: "",
      gender: "",
      aadhaar: "",
      pickupPoint: "",
      age: ""
    }
  ]);
  const [errors, setErrors] = useState({});
  const [bookingId] = useState(() => `#SWISS-${Math.floor(Math.random() * 10000)}`);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get(`/package/getallbyid/${id}`);
        setPackages(response.data.data);
        console.log(response.data.data);
        setPickup(response.data.data.pickupPoints)
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [id]);

  const addPerson = () => {
    setPeople(prev => [
      ...prev,
      {
        name: "",
        phone: "",
        email: "",
        gender: "",
        aadhaar: "",
        pickupPoint: "",
        age: ""
      }
    ]);
  };

  const updatePerson = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = {};

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
    if (!primary.pickupPoint) newErrors.primaryPickupPoint = "Pickup point is required";

    people.slice(1).forEach((person, index) => {
      const idx = index + 1;
      if (!person.name.trim()) newErrors[`name_${idx}`] = `Person #${idx} name is required`;
      if (!person.gender) newErrors[`gender_${idx}`] = `Person #${idx} gender is required`;
      if (!person.aadhaar) newErrors[`aadhaar_${idx}`] = `Person #${idx} Aadhaar is required`;
    });

    setErrors(newErrors);
    isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const packageDetails = packages
    ? {
      packageNumber:packages.pkgNumber,
        packageName: packages.PackageName,
        destination: packages.dropoff,
        day:packages.day,
        person: people.length,
        rooms: 1,
        date:packages.date
      }
    : null;

  const handleContinue = () => {
    if (!validateStep() || !packageDetails) return;

    navigate("/checkout/page2", {
      state: {
        people,
        packageDetails,
        amount: packages.PricePerPerson,
        discount:packages.discount,
        advancePayment:packages?.advancePrice
      }
    });
  };

  return (
    <div>
      <section className="relative bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center py-32 text-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-teal-800/70"></div>
  <div className="relative z-10 px-4">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
    >
      Your South Indian Adventure Awaits
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-teal-100"
    >
      Experience authentic Kerala with our handcrafted tours and personalized service
    </motion.p>
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: 'spring' }}
      className="mt-12"
    >
      <GiJourney className="inline-block text-5xl text-emerald-300 animate-float" />
    </motion.div>
  </div>
</section>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 mt-10">
      
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-8 relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Illam Tour Planners</h1>
                <p className="mt-1 opacity-90">Secure your dream vacation package</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl py-2 px-4 w-fit">
                <p className="font-medium">Booking ID: <span className="font-normal">#SWISS-{Math.floor(Math.random() * 10000)}</span></p>
              </div>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-2 bg-gray-200 -z-10 rounded-full">
                <motion.div 
                  className="h-full bg-blue-600 rounded-full" 
                  initial={{ width: "0%" }}
                  animate={{ width: "0%" }}
                ></motion.div>
              </div>
              
              {[1, 2].map((s) => (
                <div key={s} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      s === 1 
                        ? "bg-blue-600 text-white ring-4 ring-blue-200" 
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    s === 1 ? "text-gray-800" : "text-gray-500"
                  }`}>
                    {s === 1 ? "Details" : "Payment"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Participant Details</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter information for all travelers
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {people.map((person, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                        <AiOutlineUser size={18} />
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {index === 0 
                          ? "Primary Traveler" 
                          : `Traveler #${index + 1}`}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={person.name}
                          onChange={(e) => updatePerson(index, "name", e.target.value)}
                          placeholder="Enter full name"
                          className={`w-full px-4 py-3 border ${
                            (index === 0 && errors.primaryName) || 
                            (index > 0 && errors[`name_${index}`])
                              ? "border-red-500" 
                              : "border-gray-200"
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {index === 0 && errors.primaryName && (
                          <p className="text-red-500 text-xs mt-1">{errors.primaryName}</p>
                        )}
                        {index > 0 && errors[`name_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`name_${index}`]}</p>
                        )}
                      </div>

                      {/* Phone (only primary) */}
                  
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-gray-500 text-xs">(If it's a WhatsApp number, enter it here)</span>
                          </label>
                          <input
                            type="tel"
                            value={person.phone}
                            onChange={(e) => updatePerson(index, "phone", e.target.value)}
                            placeholder="Enter phone number"
                            className={`w-full px-4 py-3 border ${
                              errors.primaryPhone ? "border-red-500" : "border-gray-200"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          />
                          {errors.primaryPhone && (
                            <p className="text-red-500 text-xs mt-1">{errors.primaryPhone}</p>
                          )}
                        </div>
                    

                      {/* Email (only primary) */}
                      {index === 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={person.email}
                            onChange={(e) => updatePerson(index, "email", e.target.value)}
                            placeholder="Enter email"
                            className={`w-full px-4 py-3 border ${
                              errors.primaryEmail ? "border-red-500" : "border-gray-200"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          />
                          {errors.primaryEmail && (
                            <p className="text-red-500 text-xs mt-1">{errors.primaryEmail}</p>
                          )}
                        </div>
                      )}

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Male", "Female", "Other"].map((gender) => (
                            <button
                              key={gender}
                              type="button"
                              onClick={() => updatePerson(index, "gender", gender)}
                              className={`py-2.5 px-3 rounded-lg text-center text-sm font-medium ${
                                person.gender === gender
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {gender}
                            </button>
                          ))}
                        </div>
                        {index === 0 && errors.primaryGender && (
                          <p className="text-red-500 text-xs mt-1">{errors.primaryGender}</p>
                        )}
                        {index > 0 && errors[`gender_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`gender_${index}`]}</p>
                        )}
                      </div>
                      <div>
                        {/* Age */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Age
  </label>
  
  <input
    type="number"
    min="0"
    value={person.age}
    onChange={(e) => updatePerson(index, "age", e.target.value)}
    placeholder="Enter age"
    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>

                      </div>

                    

                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pickup Location
                          </label>
                          <select
                            value={person.pickupPoint}
                            onChange={(e) => updatePerson(index, "pickupPoint", e.target.value)}
                            className={`w-full px-4 py-3 border ${
                              errors.primaryPickupPoint ? "border-red-500" : "border-gray-200"
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          >
                            <option value="">Select pickup location</option>
                             {pickup.map((pick, idx) => (
      <option key={idx} value={pick}>
        {pick}
      </option>
    ))}
                            {/* <option value="Cochin">Cochin</option>
                            <option value="Trivandrum">Trivandrum</option>
                            <option value="Kozhikode">Kozhikode</option>
                            <option value="Alleppey">Alleppey</option>
                            <option value="Munnar">Munnar</option> */}
                          </select>
                          {errors.primaryPickupPoint && (
                            <p className="text-red-500 text-xs mt-1">{errors.primaryPickupPoint}</p>
                          )}
                        </div>

                      {/* Aadhaar */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aadhaar Number
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          value={person.aadhaar}
                          onChange={(e) => updatePerson(index, "aadhaar", e.target.value)}
                          placeholder="Enter Aadhaar number"
                          className={`w-full px-4 py-3 border ${
                            (index === 0 && errors.primaryAadhaar) || 
                            (index > 0 && errors[`aadhaar_${index}`])
                              ? "border-red-500" 
                              : "border-gray-200"
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {index === 0 && errors.primaryAadhaar && (
                          <p className="text-red-500 text-xs mt-1">{errors.primaryAadhaar}</p>
                        )}
                        {index > 0 && errors[`aadhaar_${index}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`aadhaar_${index}`]}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={addPerson}
                  className="w-full py-3.5 bg-white border-2 border-dashed border-blue-400 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <AiOutlinePlus size={20} />
                  <span>Add Another Traveler</span>
                </motion.button>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-700">
                    All special requests will be accommodated based on availability. We'll contact you for any additional requirements.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-end mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                Continue
                <FiChevronRight size={18} />
              </motion.button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
            © 2025 Illam Tour Planners | Premium Travel Experiences
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default AddressPage;