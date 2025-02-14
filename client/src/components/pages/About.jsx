import React from "react";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate =useNavigate();
  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 pt-20">
      <div className="max-w-3xl p-8 bg-green-50 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:z-10">
        {/* About Farmwise Section */}
        <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
          About Farmwise
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Farmwise is a comprehensive platform designed to support farmers at every step of the way. Whether you're managing a small farm or overseeing a large-scale agricultural operation, Farmwise provides essential tools to make your work easier and more effective. From real-time weather data to tailored crop suggestions, our platform gives you everything you need to maximize yields and minimize risks.
        </p>~
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our platform is designed with simplicity in mind, offering user-friendly interfaces and intuitive dashboards. Farmers can access crop recommendations based on weather patterns, buy and sell crops through our marketplace, and receive timely weather alerts to stay ahead of potential challenges.
        </p>

        {/* Mission Section */}
        <h1 className="text-4xl font-extrabold text-green-600 mb-6 text-center">
          Our Mission
        </h1>
        <p className="text-gray-700 text-xl leading-relaxed mb-6">
          At <span className="text-green-500 font-bold">Farmwise</span>, we are committed to revolutionizing farming through technology. Our mission is to empower farmers with the tools, data, and resources they need to enhance productivity, reduce risks, and make informed decisions. By bridging the gap between modern technology and traditional agriculture, we aim to create a sustainable future where farming is smarter, more efficient, and accessible to all.
        </p>

        {/* Why Choose Farmwise Section */}
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Why Choose Farmwise?
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li className="mb-2">🌱 <strong>Crop Recommendations:</strong> Receive personalized suggestions for crops based on real-time weather data and soil conditions.</li>
          <li className="mb-2">🌦️ <strong>Weather Alerts:</strong> Stay informed with up-to-date weather alerts that help you plan and prepare for climate changes.</li>
          <li className="mb-2">🛒 <strong>Marketplace:</strong> Buy and sell crops seamlessly through our integrated marketplace.</li>
          <li className="mb-2">📊 <strong>Smart Dashboard:</strong> Monitor your farm’s performance with a user-friendly dashboard, designed to make data easy to understand.</li>
          <li className="mb-2">💡 <strong>Expert Support:</strong> Gain insights and advice from agricultural experts to help you make the best decisions for your farm.</li>
        </ul>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Join <span className="text-green-500 font-bold">Farmwise</span> today and take the next step towards smarter, more sustainable farming!
          </p>
          <button 
          onClick={() => navigate("/Dashboard")} 
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-400 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );  
};