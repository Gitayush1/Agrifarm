import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract contactName from location state
  const contactName = location.state?.contactName || 'Guest';

  // Animation for the welcome message
  const messageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Animation for thank you message
  const thankYouVariants = {
    hover: { scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } },
  };

  // Orders and total data
  const orders = location.state?.cart || [];
  const quantities = location.state?.quantities || {};
  const calculateTotal = () =>
    orders.reduce((total, crop) => total + crop.price * (quantities[crop.id] || 1), 0) + 5;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-6">
      {/* Welcome Message */}
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        animate="visible"
        variants={messageVariants}
      >
        <h1 className="text-4xl font-bold text-green-600">
          👋 Hey {contactName}!
        </h1>
        <motion.p
          className="text-lg mt-2 text-gray-700 font-medium"
          variants={thankYouVariants}
          whileHover="hover"
        >
          Thank you for shopping with Farmwise 🌱
        </motion.p>
      </motion.div>

      {/* Orders Section */}
      <motion.div
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-green-500 mb-6">🛒 Your Orders</h2>
        <ul className="divide-y divide-gray-200 mb-6">
          {orders.map((crop) => (
            <li key={crop.id} className="py-4 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold">{crop.name}</h4>
                <p className="text-sm text-gray-500">
                  Quantity: {quantities[crop.id] || 1} | Price: {crop.price} each
                </p>
              </div>
              <p className="font-semibold text-green-700">
                {crop.price * (quantities[crop.id] || 1)}/-
              </p>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 pt-4 text-lg font-bold text-gray-800">
          <p>Delivery Charge: <span>5/-</span></p>
          <p>Total Amount: <span>{calculateTotal()}/-</span></p>
        </div>
      </motion.div>

      {/* Back to Home Button */}
      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 flex items-center justify-center px-6 py-3 text-white font-semibold bg-green-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600"
      >
        ⬅️ Back to Home
      </motion.button>
    </div>
  );
}; 