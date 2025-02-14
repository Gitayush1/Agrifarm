import React from "react";
import heroImage from './Project image.jpg';
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="hero-container flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold">Welcome to Farmwise</h1>
          <p className="mt-4 text-xl md:text-2xl">
            Empowering farmers with weather insights and crop suggestions
          </p>
          
          <button
  className="mt-8 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500"
  onClick={() => navigate("/Dashboard")} 
>
  Explore Now
</button>

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
