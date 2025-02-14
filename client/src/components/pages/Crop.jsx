import React, { useState, useEffect } from 'react';
import './Crop.css';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import apis from '../../utils/apis';

export const Crop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [crops, setCrops] = useState([]);

  const addToBag = (crop) => {
    const updatedQuantities = { ...quantities, [crop.id]: (quantities[crop.id] || 0) + 1 };
    setQuantities(updatedQuantities);

    const itemInCart = cart.find(item => item.id === crop.id);
    if (!itemInCart) {
      setCart([...cart, crop]);
    }
  };

  const removeFromBag = (crop) => {
    const updatedQuantities = { ...quantities, [crop.id]: Math.max((quantities[crop.id] || 1) - 1, 0) };
    setQuantities(updatedQuantities);

    if (updatedQuantities[crop.id] === 0) {
      setCart(cart.filter(item => item.id !== crop.id));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, crop) => total + crop.price * (quantities[crop.id] || 1), 0);
  };

  // Fetch crops based on selected state and season
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch(apis().getCropsByStateSeason, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            state: location.state.selectedState,
            season: location.state.selectedSeason,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setCrops(data);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Crops not available');
        }
      } catch (error) {
        toast.error('Failed to fetch crops');
      }
    };

    if (location.state?.selectedState && location.state?.selectedSeason) {
      fetchCrops();
    }
  }, [location.state]);

  return (
    <div className="crop-container">
      <Toaster position="top-right" />
      <div className="crops-list">
        {crops.length > 0 ? (
          crops.map(crop => (
            <div key={crop.id} className="crop-item">
              <span>{crop.name} - {crop.price}/-</span>
              {quantities[crop.id] > 0 ? (
                <div className="quantity-controls">
                  <button onClick={() => removeFromBag(crop)} className="quantity-btn grey">-</button>
                  <span>{quantities[crop.id]}</span>
                  <button onClick={() => addToBag(crop)} className="quantity-btn green">+</button>
                </div>
              ) : (
                <button onClick={() => addToBag(crop)} className="add-to-bag-btn animated-btn">🛒 Add to Bag</button>
              )}
            </div>
          ))
        ) : (
          <p className="no-crops-message">Please select a valid state and season to view crops.</p>
        )}
      </div>

      <div className="cart-section">
        <h2>Your Bag</h2>
        {cart.length === 0 ? (
          <p>Your bag is empty 🛍️</p>
        ) : (
          <div>
            {cart.map(crop => (
              <div key={crop.id} className="cart-item">
                <span>{crop.name}(x{quantities[crop.id]})</span>
                <span>{crop.price * (quantities[crop.id] || 1)}/-</span>
              </div>
            ))}
            <hr />
            <p>Subtotal: {calculateTotal()}/-</p>
            <p>Delivery Charge: 5/-</p>
            <p><strong>Grand Total: {calculateTotal() + 5}/-</strong></p>
          </div>
        )}
        <button
          onClick={() => {
            if (calculateTotal() > 0) {
              navigate("/BagSection", { state: { cart, quantities } });
            } else {
              alert("Your bag is empty. Please add items to proceed.");
            }
          }}
          className="checkout-btn animated-btn">
          ✅ Proceed to Checkout
        </button>
        <button 
          onClick={() => navigate("/Dashboard")} 
          className="back-btn">
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
};
