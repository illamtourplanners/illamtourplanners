import React, { useEffect, useState } from 'react';

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
const [paymentMethod] = useState('razorpay'); 


  const totalAmount = advancePayment
 const upiLink = `upi://pay?pa=sreeharivarikkad-2@oksbi&pn=Vaidehi Holidays&am=${totalAmount}&cu=INR&tn=Advance Booking Payment
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
 const formData = {
    name: name,
    phone: '9876543210',
    email: 'test@example.com'
  };

  // const totalDue = totalPrice;
  // const cartId = "67f119b215000dc3d4d0a141";

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

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
      packageNumber: packageDetails.packageNumber,
      packageName: packageDetails.packageName,
      packageDate: packageDetails.date,
      packageDay: packageDetails.day,
      packageDestination: packageDetails.destination,
      packageDescription: packageDetails.description,
      packagePerson: packageDetails.person,
    };

    const name = people[0].name;
    const email = people[0].email;

    // Create order on backend
    const orderRes = await axiosInstance.post("/checkout/create", {
      amount: totalAmount,
      currency: "INR",
      receipt: invoiceNo,
    });

    const { order } = orderRes.data;

    // Open Razorpay checkout
    const options = {
      key: "rzp_live_S4sfG2kF8m7k4t", // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Vaidehi Holidays",
      description: `Booking for ${packageDetails.packageName}`,
      image: "https://illamlogo.png", // Optional
      order_id: order.id,
      handler: async function (response) {
        const formData = new FormData();

        formData.append("packageName", packageDetails.packageName);
        formData.append("packageDate", packageDetails.date);
        formData.append("packageDetails", JSON.stringify(formattedDetails));
        formData.append("customers", JSON.stringify(formattedCustomers));
        formData.append("amount", totalAmount);
        formData.append("name", name);
        formData.append("totalPerPerson", amount);
        formData.append("advancePayment", advancePayment);
        formData.append("razorpay_payment_id", response.razorpay_payment_id);
        formData.append("razorpay_order_id", response.razorpay_order_id);
        formData.append("razorpay_signature", response.razorpay_signature);

     
        const res = await axiosInstance.post("/checkout/confirm", formData);

        if (res.data.success === true) {
          navigate(`/confirm/${res.data.transactionId}`);
        } else {
          alert("Booking failed");
        }
      },
      prefill: {
        name,
        email,
        contact: people[0]?.phone,
      },
      theme: {
        color: "#0f766e",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Razorpay Checkout Error:", error);
    alert("Something went wrong. Try again.");
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
             <div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-6">Payment Method</h3>
                        
                        {/* Payment Method Selection - Only Razorpay */}
                        <div className="flex flex-col gap-4 mb-8">
                          <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="razorpay"
                              checked={paymentMethod === 'razorpay'}
                              readOnly
                              className="h-5 w-5 text-blue-600"
                            />
                            <div className="flex-1">
                              <span className="font-medium text-gray-700">Secure Online Payment</span>
                              <p className="text-sm text-gray-500 mt-1">
                                Credit/Debit Card, Net Banking, UPI, Wallet
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Razorpay Payment Section */}
                       

                      

                       
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
                            onClick={onFormSubmit}
                            disabled={isSubmitting}
                            className={`w-full mt-4 py-3 rounded-xl font-bold text-white ${
                              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                            } transition`}
                          >
                            {isSubmitting ? "Processing..." : "Proceed to Payment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
