import React, { useState } from 'react';

import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";
import { FiChevronLeft, FiCopy } from "react-icons/fi";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useForm } from "react-hook-form";
import { GiJourney } from 'react-icons/gi';
const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { people, packageDetails, amount, discount, advancePayment } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [invoiceNo] = useState(`INV-${Math.floor(Math.random() * 1000000)}`);
  const [isCopied, setIsCopied] = useState(false);
const [previewImage, setPreviewImage] = useState(null);



  const totalAmount = advancePayment
 const upiLink = `upi://pay?pa=keshavanpatteri2000-1@oksbi&pn=Vaidehi Holidays&am=${totalAmount}&cu=INR&tn=Advance Booking Payment
`;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!people || !packageDetails) return <div>Loading...</div>;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };



// Inside your component


const onFormSubmit = async (data) => {
  setIsSubmitting(true);

  try {
    const formattedCustomers = people.map((p, index) => ({
      fullName: p.name,
      phoneNumber: p?.phone ?? undefined,
      gender: p.gender,
      email: index === 0 ? p.email : undefined,
      pickupPoint: p.pickupPoint || "",
      aadhaarNumber: p.aadhaar.trim(),
    }));

    const formattedDetails = {
      packageNumber:packageDetails.packageNumber,
      packageName: packageDetails.packageName,
      packageDate: packageDetails.date,
      packageDay: packageDetails.day,
      packageDestination: packageDetails.destination,
      packageDescription: packageDetails.description,
      packagePerson: packageDetails.person,
    };

    const name = people[0].name;

    // Prepare FormData
    const formData = new FormData();
    formData.append("image", data.image[0]); // data.image is an array
    formData.append("packageName", packageDetails.packageName);
    formData.append("packageDate", packageDetails.date);
    formData.append("packageDetails", JSON.stringify(formattedDetails));
    formData.append("customers", JSON.stringify(formattedCustomers));
    formData.append("amount", totalAmount);
    formData.append("name", name);
    formData.append("totalPerPerson", amount);
    formData.append("advancePayment", advancePayment);

    const res = await axiosInstance.post("/checkout/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
console.log(res);

    if (res.data.success === true) {
      setTimeout(() => {
        navigate(`/confirm/${res.data.transactionId}`);
      }, 3000);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Error: " + (error.response?.data?.message || error.message));
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div>
   <section className="relative bg-[url('https://www.baltana.com/files/wallpapers-23/Beach-Resort-Wallpaper-1600x1000-56185.jpg')] bg-cover bg-center py-32 text-center overflow-hidden"> <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-teal-800/70"></div>
  <div className="relative z-10 px-4">
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
    >
      Secure Your Kerala Getaway
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-teal-100"
    >
      Complete your booking in just a few steps and prepare for an unforgettable journey
    </motion.p>
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: 'spring' }}
      className="mt-12"
    >
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-all hover:scale-105">
        Complete Your Booking Now
      </button>
    </motion.div>
  </div>
</section>







    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 mt-10">
   
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
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

          <div className="p-6 md:p-8">
            {bookingSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <BsCheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your travel package has been booked successfully. Your itinerary and vouchers have been sent to {people[0]?.email}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-800 text-lg mb-4">Pay via UPI</h3>
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6 p-4 bg-white rounded-lg border-2 border-dashed border-blue-200">
                          <img
                          id="qrImage"
                            src={`https://quickchart.io/qr?text=${encodeURIComponent(upiLink)}`}
                            alt="UPI QR Code"
                            className="w-48 h-48 mx-auto"
                          />
                        </div>

                        <p className="text-gray-700 mb-2">Scan this QR code with any UPI app to complete your payment</p>

                        {/* <button
                          onClick={copyToClipboard}
                          type="button"
                          className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
                        >
                          <FiCopy />
                          {isCopied ? "Copied!" : "Copy UPI Link"}
                        </button> */}
                        <button
  onClick={() => {
    const image = document.getElementById("qrImage");
    const link = document.createElement("a");
    link.href = image.src;
    link.download = "upi-qr-code.png";
    link.click();
  }}
  className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded hover:bg-blue-200 text-sm"
>
  ⬇️ Download QR Code
</button>


                    <div className="w-full max-w-md">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload payment screenshot:
  </label>
  
  {/* Custom file upload area */}
  <div 
    className={`
      relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
      hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200
      ${previewImage ? 'border-blue-500' : 'border-gray-300'}
      transition-colors duration-200
    `}
  >
    <input
      type="file"
      accept="image/*"
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      {...register("image", {
        required: "Payment screenshot is required.",
        onChange: (e) => {
          const file = e.target.files[0];
          if (file) setPreviewImage(URL.createObjectURL(file));
        }
      })}
    />
    
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      
      <div className="text-sm text-gray-600">
        <p className="font-medium">
          <span className="text-blue-600 hover:text-blue-500 underline">Click to upload</span> 
          {' '}or drag and drop
        </p>
        <p className="text-xs mt-1">PNG, JPG, or JPEG (Max 5MB)</p>
      </div>
    </div>
  </div>
  {previewImage && (
    <img
      src={previewImage}
      alt="Preview"
      className="mt-4 rounded-lg w-48 mx-auto border"
    />
  )}

  {errors.image && (
    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
  )}
</div>


                        <div className="mt-6 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-800 w-full max-w-2xl mx-auto">
                          <h4 className="text-base font-semibold mb-4 text-blue-700">📝 Important Payment Instructions:</h4>
                          <ul className="space-y-2 list-decimal list-inside text-left">
                            <li>
                              First, complete your payment by scanning the above <strong>UPI QR Code</strong>.
                            </li>
                            <li>
                              Then <strong>upload the screenshot</strong> of payment confirmation.<br />
                              <span className="text-red-600 font-medium">
                                Must show: Date, Time, Amount, Account Name, and Transaction ID.
                              </span>
                            </li>
                            <li>
                              Contact support if needed: 📞 <strong>9400440686</strong> or 📞 <strong>8885214635</strong>
                            </li>
                            <li>
                              You will be notified within 12 hours via <strong>SMS or Email</strong>.
                            </li>
                            <li>
                              Save this page or take a screenshot.
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 w-full max-w-md">
                          <div className="flex items-start gap-3">
                            <span className="text-yellow-500">⚠️</span>
                            <p className="text-yellow-700 text-sm">
                              Please complete payment within 15 minutes to confirm your booking.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
                      <h3 className="font-bold text-gray-800 text-lg mb-6 pb-3 border-b border-gray-100">
                        Booking Summary
                      </h3>

                      <div className="space-y-4 text-sm">
                        <div className="font-semibold text-gray-800">{packageDetails.packageName}</div>

                        <div className="flex justify-between">
                          <span>Destination</span>
                          <span>{packageDetails.destination}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Travelers</span>
                          <span>{packageDetails.person}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Days</span>
                          <span>{packageDetails.day}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between">
                          <span>Package Price Per Person</span>
                          <span>₹{amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advance Payment for {packageDetails.person} peoples</span>
                          <span>₹{advancePayment}</span>
                        </div>
                        

                        <div className="flex justify-between font-bold text-blue-700 text-lg pt-3">
                          <span>Pay Now</span>
                          <span>₹{totalAmount}</span>
                        </div>

                        <hr />

                        <div className="text-sm">
                          <span className="text-gray-600">Invoice No:</span> {invoiceNo}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full mt-4 py-3 rounded-xl font-bold text-white ${
                            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                          } transition`}
                        >
                          {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}

            <div className="flex justify-start mt-10">
              <button
                onClick={() => navigate("/checkout/page1")}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 flex items-center gap-2"
                disabled={isSubmitting}
              >
                <FiChevronLeft size={18} />
                Back
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
            © 2025 Illam Tour Planners | Premium Travel Experiences
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
