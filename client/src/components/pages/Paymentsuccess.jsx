import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import successSound from './voice.mp3';
import { useNavigate } from 'react-router-dom';

export const Paymentsuccess = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleDoneClick = () => {
    if (onClose) {
      onClose(); // Call the onClose function first
    }
    navigate('/'); // Navigate to the home page
  };

  useEffect(() => {
    const audio = new Audio(successSound);
    audio.play();

    // Trigger the animation after the component mounts
    setShow(true);

    // Animate the checkmark
    const checkmark = document.querySelector('#checkmark');
    checkmark.classList.add('animate-pop');

    // Clean up the animation and sound when unmounted
    return () => {
      checkmark.classList.remove('animate-pop');
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 transition-all duration-300 ease-in-out transform ${
        show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 text-center w-96 max-w-md">
        <div
          id="checkmark"
          className="flex justify-center items-center mb-6 animate__animated animate__fadeIn animate__delay-1s"
        >
          <CheckCircleIcon className="w-24 h-24 text-green-500 animate__animated animate__bounceIn animate__delay-0.5s" />
        </div>
        <h2 className="text-3xl font-semibold text-green-600 mt-4 animate__animated animate__fadeIn animate__delay-1s">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-700 mt-2 animate__animated animate__fadeIn animate__delay-1.5s">
          Your payment has been processed successfully.
        </p>
        <button
          onClick={handleDoneClick}
          className="mt-8 px-6 py-3 text-lg text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-200 transform hover:scale-105"
        >
          Done
        </button>
      </div>
    </div>
  );
}; 