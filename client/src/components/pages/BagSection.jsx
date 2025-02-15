import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './back.jpg';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from './PaymentForm'; // Create this component for Stripe payment form
import { Paymentsuccess } from './Paymentsuccess';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BagSection = () => {


  const navigate = useNavigate();
  const location = useLocation();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [stripeKey, setStripeKey] = useState('pk_test_51QJs93K8ylA97zS7EdjiN3Y6A7A0lVm2Q35tjf7NBYh7ODeXHSfZA7ezpgjaKHcXIkeETkCZGKkN7MUVf7qWFSYX00ymTle845'); // Add your Stripe public key here
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNavigateToOrder = () => {
    navigate('/OrderPlaced', {
      state: { cart, quantities, contactName }, // Passing cart and quantities data to Order.jsx
    });
  };



  const handlePaymentSuccess = () => {
    setShowPaymentSuccess(true);
  };


  // Extract cart and quantities from location state
  const cart = location.state?.cart || [];
  const quantities = location.state?.quantities || {};
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   mobile: "",
  //   address: "",
  // });

  const handleChange = (e) => {
    // const { fullName, value } = e.target;
    // setFormData({ ...formData, [fullName]: value });
  };
  const handleSubmit = async () => {
  try {
    const requestData = {
      fullName: contactName,
      crops: cart.map((crop) => ({
        fullName: crop.fullName,
        quantity: quantities[crop.id],
        price: crop.price,
      })),
      totalAmount: calculateTotal() + 5,
    };

    const response = await fetch("http://localhost:8080/public/x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      toast.success("Order placed successfully!");
      navigate("/OrderPlaced");
      console.log("Success")
    } else {
      toast.error("Failed to place the order. Please try again.");
      console.log("Failed")
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong.");
  }
};

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, crop) => total + crop.price * (quantities[crop.id] || 1), 0);
    return subtotal + 5; // Adding delivery charge
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 min-h-screen p-8">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Part */}
          <div className="w-full lg:w-3/5 space-y-6">
            <h2 className="text-green-600 text-2xl font-bold mb-6">Edit Delivery Details</h2>

            {/* Contact Person Section */}
            <div className="space-y-4">
              <h3 className="text-green-500 text-xl font-semibold">&#x260E; Contact Person</h3>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Enter your name..." // Placeholder text
                  list="name-suggestions" // Link to the datalist
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
                <datalist id="name-suggestions">
                  <option value="Nilesh" />
                  <option value="Arpit" />
                  <option value="Lakshya" />
                  <option value="Ayush" />
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="example@gmail.com" // Placeholder text
                  list="email-suggestions" // Link to the datalist
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
                <datalist id="email-suggestions">
                  <option value="example@gmail.com" />
                  <option value="user1@yahoo.com" />
                  <option value="test@gmail.com" />
                  <option value="hello@domain.com" />
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                <div className="flex">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg mr-2"
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+81">+81 (Japan)</option>
                    <option value="+61">+61 (Australia)</option>
                    {/* Add more countries and codes as needed */}
                  </select>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="1234567890" // Placeholder text
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-green-500 text-xl font-semibold">&#x1F4CD; Address</h3>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address here..." // Placeholder text
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="text-green-500 text-xl font-semibold">&#x1F4B3; Payment Method</h3>
              <p className="text-gray-600">Select your preferred payment method below:</p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    className="mr-3"
                    checked={paymentMethod === 'cod'}
                    onChange={handlePaymentChange}
                  />
                  <label className="text-sm">Cash on Delivery</label>
                </div>
               
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    className="mr-3"
                    checked={paymentMethod === 'stripe'}
                    onChange={handlePaymentChange}
                  />
                  <label className="text-sm">ATM/Credit/Debit Card</label>
                </div>
              </div>
            </div>

            {paymentMethod === 'stripe' ? (
              <div className="mt-6">
                <h3 className="text-green-500 text-xl font-semibold">Proceed to Payment</h3>
                <Elements stripe={loadStripe(stripeKey)}>
                  <PaymentForm total={calculateTotal()} />
                </Elements>
              </div>
            ) : (
           <button
  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
  onClick={() => {
    handleSubmit();
    handleNavigateToOrder();
  }}
>
  Save & Continue
</button>

            )}
          </div>

          {/* Bag Section (right) */}
          <div className="w-full lg:w-2/5 lg:ml-6 mt-8 lg:mt-0">
            <h2 className="text-green-600 text-2xl font-bold mb-4">Your Bag</h2>
            <ul className="divide-y divide-gray-300">
              {cart.map((crop) => (
                <li key={crop.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{crop.name}</h4>
                      <p className="text-sm text-gray-500">
                        Quantity: {quantities[crop.id] || 1} | Price: {crop.price} each
                      </p>
                    </div>
                    <p className="font-semibold">
                      {crop.price * (quantities[crop.id] || 1)}/-
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Delivery Charge: <span>5/-</span>
              </p>
              <p className="text-xl font-bold mt-2">
                Total Amount: <span>{calculateTotal()}/-</span>
              </p>
            </div>
          </div>
          {showPaymentSuccess && <Paymentsuccess onClose={() => setShowPaymentSuccess(false)} />} {/* Display success overlay */}
        </div>
        
      </div>
      
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
       
          <div>
            <h3 className="font-bold text-lg mb-3">About Farmwise</h3>
            <p className="text-gray-400">
              Empowering farmers with modern tools and technology for better
              agriculture. Our mission is to drive innovation in farming through
              data-driven insights and sustainable practices.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Contact Us</h3>
            <p className="text-gray-400">
              Feel free to reach out for any inquiries or support.
            </p>
            <p className="mt-2">Email: farmwiseconnect@gmail.com</p>
            <p>Phone: +123 456 7890</p>
            <div className="mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white mr-4"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white mr-4"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white mr-4"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-500">
            &copy; 2024 Farmwise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}; 