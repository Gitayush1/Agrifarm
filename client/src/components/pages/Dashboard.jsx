import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedState && selectedSeason) {
      // Display the selected state and season for debugging purposes
      console.log('Selected State:', selectedState);
      console.log('Selected Season:', selectedSeason);

      // Navigate to the Crop page with the selected state and season passed via state
      navigate("/Crop", { state: { selectedState, selectedSeason } });
    } else {
      alert('Please select both a state and a season.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="overlay" />
      <div className="corner-decorations">
        <div className="top-left" />
        <div className="bottom-right" />
      </div>

      <div className="form-container">
        <h1 className="text-4xl font-bold text-black mb-6 fade-in-text">
          Discover the Best Crops for Your State & Season 🌾🌞
        </h1>
        <p className="text-md text-black mb-8 fade-in-text">
          "🌿 Let nature guide you 🌱, choose the best crops for the right time of year 🌻"
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="state" className="form-label">Select Your State:</label>
          <select
            id="state"
            className="form-select mb-4"
            value={selectedState}
            onChange={handleStateChange}
            required
          >
            <option value="" disabled>Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <label htmlFor="season" className="form-label">Select the Season:</label>
          <select
            id="season"
            className="form-select mb-6"
            value={selectedSeason}
            onChange={handleSeasonChange}
            required
          >
            <option value="" disabled>Select a season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Monsoon">Monsoon</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>

          <button 
            type="submit"
            className="form-button"
          >
            Submit 🌾
          </button>
        </form>
      </div>
    </div>
  );
};
