import React, { useState } from "react";
import { Button } from "../ui/Button";
import './auth.css';
import { LoadingButton } from "../ui/LoadingButton";

export const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      setErrorMessage("Please fill in all the fields.");
      setSuccessMessage("");
    } else {
      setSuccessMessage("Submitted successfully!");
      setErrorMessage(""); 
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please fill this form in a decent manner
        </p>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              placeholder="example@example.com"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              placeholder="Your message here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title='Submit' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
