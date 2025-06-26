import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";
import { FiChevronLeft, FiCopy } from "react-icons/fi";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { people, packageDetails, amount, discount, advancePayment } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [invoiceNo] = useState(`INV-${Math.floor(Math.random() * 1000000)}`);
  const [isCopied, setIsCopied] = useState(false);
const [previewImage, setPreviewImage] = useState(null);
console.log(packageDetails);


  const totalAmount = Math.max(0, advancePayment - discount);
  const upiLink = `upi://pay?pa=sajuputhukkudi@oksbi&pn=BRIGHTBYTE&mc=0000&tid=${invoiceNo}&tr=${invoiceNo}&tn=Package Booking Payment&am=${totalAmount}&cu=INR`;

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
      phoneNumber: index === 0 ? p.phone : undefined,
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
    formData.append("advancePayment", advancePayment);

    const res = await axiosInstance.post("/checkout/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success === true) {
      setTimeout(() => {
        navigate("/confirm");
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
                            src={`https://quickchart.io/qr?text=${encodeURIComponent(upiLink)}`}
                            alt="UPI QR Code"
                            className="w-48 h-48 mx-auto"
                          />
                        </div>

                        <p className="text-gray-700 mb-2">Scan this QR code with any UPI app to complete your payment</p>

                        <button
                          onClick={copyToClipboard}
                          type="button"
                          className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
                        >
                          <FiCopy />
                          {isCopied ? "Copied!" : "Copy UPI Link"}
                        </button>

                     <div className="w-full max-w-md">
  <label className="text-sm font-medium text-gray-700 mb-2 block">
    Upload payment screenshot:
  </label>
  <input
    type="file"
    accept="image/*"
    {...register("image", {
      required: "Payment screenshot is required.",
      onChange: (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(URL.createObjectURL(file));
      },
    })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
  />

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
                          <span>Package Price</span>
                          <span>₹{amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advance Payment</span>
                          <span>₹{advancePayment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Discount</span>
                          <span className="text-green-600">-₹{discount}</span>
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
  );
};

export default CheckoutPage;
