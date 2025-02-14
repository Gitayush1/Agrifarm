// getCropsByStateSeason.js

const Crop = require('../models/Crop');
const getCropsByStateSeason = async (req, res, next) => {
  const { state, season } = req.body;

  if (!state || !season) {
    return res.status(400).json({ message: 'State and season are required' });
  }

  try {
    let crops;

    // Manually setting crops for Himachal Pradesh in the Monsoon season
    if (state === 'Andhra Pradesh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 },{ id: 2, name: 'Watermelon', price: 60 },{ id: 3, name: 'Papaya', price: 80 }, { id: 4, name: 'Lemon', price: 50 },
        { id: 5, name: 'Guava', price: 90 }, { id: 6, name: 'Cucumber', price: 40 }, { id: 7, name: 'Chili', price: 130 },{ id: 8, name: 'Tomato', price: 70 },
        { id: 9, name: 'Brinjal', price: 55 }, { id: 10, name: 'Okra', price: 65 },
      ];
    }
    else if (state === 'Andhra Pradesh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cauliflower', price: 70 },{ id: 2, name: 'Carrot', price: 60 },{ id: 3, name: 'Spinach', price: 40 }, { id: 4, name: 'Lettuce', price: 80 },
        { id: 5, name: 'Radish', price: 45 }, { id: 6, name: 'Turnip', price: 55 }, { id: 7, name: 'Peas', price: 50 }, { id: 8, name: 'Cabbage', price: 65 },
        { id: 9, name: 'Beetroot', price: 60 }, { id: 10, name: 'Garlic', price: 100 },
      ];
    }
   else if (state === 'Andhra Pradesh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 80 }, { id: 2, name: 'Cotton', price: 100 }, { id: 3, name: 'Sugarcane', price: 120 }, { id: 4, name: 'Groundnut', price: 90 }, { id: 5, name: 'Soybean', price: 75 },
        { id: 6, name: 'Tobacco', price: 110 }, { id: 7, name: 'Turmeric', price: 130 }, { id: 8, name: 'Chili', price: 140 }, { id: 9, name: 'Pulses', price: 65 },
        { id: 10, name: 'Maize', price: 85 },
      ];
    }
  else  if (state === 'Andhra Pradesh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 150 }, { id: 2, name: 'Apple', price: 100 },  { id: 3, name: 'Papaya', price: 80 },
        { id: 4, name: 'Pear', price: 70 }, { id: 5, name: 'Banana', price: 60 }, { id: 6, name: 'Grapes', price: 90 },  { id: 7, name: 'Orange', price: 110 },
        { id: 8, name: 'Tamarind', price: 130 }, { id: 9, name: 'Lemon', price: 50 },
        { id: 10, name: 'Peach', price: 75 },
      ];
    }
  else if (state === 'Andhra Pradesh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 130 }, { id: 2, name: 'Guava', price: 100 }, { id: 3, name: 'Lemon', price: 50 }, { id: 4, name: 'Coconut', price: 90 }, { id: 5, name: 'Chili', price: 120 },
        { id: 6, name: 'Cucumber', price: 40 }, { id: 7, name: 'Carrot', price: 70 }, { id: 8, name: 'Tomato', price: 80 },  { id: 9, name: 'Brinjal', price: 60 },
        { id: 10, name: 'Okra', price: 65 },
      ];
    }
    else if (state === 'Arunachal Pradesh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Kiwi', price: 180 }, { id: 2, name: 'Peach', price: 150 }, { id: 3, name: 'Strawberry', price: 120 },{ id: 4, name: 'Apple', price: 140 },
        { id: 5, name: 'Raspberry', price: 160 },{ id: 6, name: 'Cherry', price: 170 },{ id: 7, name: 'Papaya', price: 130 },
        { id: 8, name: 'Guava', price: 110 }, { id: 9, name: 'Lemon', price: 90 }, { id: 10, name: 'Tomato', price: 75 },
      ];
    }
    else if (state === 'Arunachal Pradesh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 80 },
        { id: 2, name: 'Spinach', price: 65 },
        { id: 3, name: 'Turnip', price: 70 },
        { id: 4, name: 'Mustard', price: 85 },
        { id: 5, name: 'Radish', price: 60 },
        { id: 6, name: 'Cabbage', price: 90 },
        { id: 7, name: 'Cauliflower', price: 110 },
        { id: 8, name: 'Brussels Sprouts', price: 125 },
        { id: 9, name: 'Garlic', price: 130 },
        { id: 10, name: 'Onion', price: 100 },
      ];
    }
    else if (state === 'Arunachal Pradesh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 90 },
        { id: 2, name: 'Sorghum', price: 75 },
        { id: 3, name: 'Groundnut', price: 85 },
        { id: 4, name: 'Cotton', price: 100 },
        { id: 5, name: 'Maize', price: 95 },
        { id: 6, name: 'Soybean', price: 80 },
        { id: 7, name: 'Tobacco', price: 120 },
        { id: 8, name: 'Pulses', price: 110 },
        { id: 9, name: 'Chili', price: 130 },
        { id: 10, name: 'Sugarcane', price: 105 },
      ];
    }
    else if (state === 'Arunachal Pradesh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 150 },
        { id: 2, name: 'Grapes', price: 130 },
        { id: 3, name: 'Orange', price: 100 },
        { id: 4, name: 'Papaya', price: 90 },
        { id: 5, name: 'Banana', price: 75 },
        { id: 6, name: 'Tamarind', price: 110 },
        { id: 7, name: 'Pineapple', price: 120 },
        { id: 8, name: 'Mango', price: 140 },
        { id: 9, name: 'Litchi', price: 160 },
        { id: 10, name: 'Apple', price: 110 },
      ];
    }
    else if (state === 'Arunachal Pradesh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 160 },
        { id: 2, name: 'Guava', price: 120 },
        { id: 3, name: 'Chili', price: 110 },
        { id: 4, name: 'Coconut', price: 90 },
        { id: 5, name: 'Papaya', price: 95 },
        { id: 6, name: 'Tomato', price: 85 },
        { id: 7, name: 'Brinjal', price: 70 },
        { id: 8, name: 'Okra', price: 75 },
        { id: 9, name: 'Carrot', price: 80 },
        { id: 10, name: 'Brussels Sprouts', price: 130 },
      ];
    }
    else if (state === 'Assam' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Jackfruit', price: 140 },
        { id: 2, name: 'Lemon', price: 60 },
        { id: 3, name: 'Pineapple', price: 130 },
        { id: 4, name: 'Guava', price: 90 },
        { id: 5, name: 'Betel Nut', price: 120 },
        { id: 6, name: 'Ginger', price: 110 },
        { id: 7, name: 'Turmeric', price: 150 },
        { id: 8, name: 'Papaya', price: 80 },
        { id: 9, name: 'Banana', price: 70 },
        { id: 10, name: 'Chili', price: 65 },
      ];
    }
    else if (state === 'Assam' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Mustard', price: 90 },
        { id: 2, name: 'Cauliflower', price: 70 },
        { id: 3, name: 'Cabbage', price: 80 },
        { id: 4, name: 'Spinach', price: 60 },
        { id: 5, name: 'Radish', price: 50 },
        { id: 6, name: 'Garlic', price: 100 },
        { id: 7, name: 'Onion', price: 85 },
        { id: 8, name: 'Carrot', price: 75 },
        { id: 9, name: 'Beetroot', price: 95 },
        { id: 10, name: 'Peas', price: 70 },
      ];
    }
    else if (state === 'Assam' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 100 },
        { id: 2, name: 'Jute', price: 120 },
        { id: 3, name: 'Pigeon Pea', price: 85 },
        { id: 4, name: 'Sesame', price: 95 },
        { id: 5, name: 'Green Gram', price: 70 },
        { id: 6, name: 'Black Gram', price: 75 },
        { id: 7, name: 'Bamboo', price: 150 },
        { id: 8, name: 'Chili', price: 90 },
        { id: 9, name: 'Maize', price: 85 },
        { id: 10, name: 'Sugarcane', price: 110 },
      ];
    }
    else if (state === 'Assam' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Orange', price: 110 },
        { id: 2, name: 'Pineapple', price: 95 },
        { id: 3, name: 'Papaya', price: 80 },
        { id: 4, name: 'Banana', price: 60 },
        { id: 5, name: 'Ginger', price: 105 },
        { id: 6, name: 'Areca Nut', price: 120 },
        { id: 7, name: 'Turmeric', price: 90 },
        { id: 8, name: 'Litchi', price: 100 },
        { id: 9, name: 'Lemon', price: 65 },
        { id: 10, name: 'Guava', price: 85 },
      ];
    }
    else if (state === 'Assam' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 150 },
        { id: 2, name: 'Betel Leaf', price: 60 },
        { id: 3, name: 'Pineapple', price: 120 },
        { id: 4, name: 'Banana', price: 70 },
        { id: 5, name: 'Cucumber', price: 90 },
        { id: 6, name: 'Pumpkin', price: 85 },
        { id: 7, name: 'Radish', price: 50 },
        { id: 8, name: 'Chili', price: 100 },
        { id: 9, name: 'Papaya', price: 75 },
        { id: 10, name: 'Brinjal', price: 65 },
      ];
    }
    else if (state === 'Bihar' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Banana', price: 70 },
        { id: 2, name: 'Papaya', price: 60 },
        { id: 3, name: 'Guava', price: 90 },
        { id: 4, name: 'Litchi', price: 150 },
        { id: 5, name: 'Mango', price: 120 },
        { id: 6, name: 'Tomato', price: 50 },
        { id: 7, name: 'Brinjal', price: 55 },
        { id: 8, name: 'Bottle Gourd', price: 45 },
        { id: 9, name: 'Pumpkin', price: 40 },
        { id: 10, name: 'Cucumber', price: 35 },
      ];
    }
    else if (state === 'Bihar' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Wheat', price: 85 },
        { id: 2, name: 'Cauliflower', price: 55 },
        { id: 3, name: 'Cabbage', price: 50 },
        { id: 4, name: 'Radish', price: 45 },
        { id: 5, name: 'Turnip', price: 60 },
        { id: 6, name: 'Peas', price: 65 },
        { id: 7, name: 'Garlic', price: 70 },
        { id: 8, name: 'Onion', price: 40 },
        { id: 9, name: 'Spinach', price: 35 },
        { id: 10, name: 'Carrot', price: 55 },
      ];
    }
    else if (state === 'Bihar' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 },
        { id: 2, name: 'Maize', price: 80 },
        { id: 3, name: 'Jute', price: 90 },
        { id: 4, name: 'Sugarcane', price: 100 },
        { id: 5, name: 'Pigeon Pea', price: 70 },
        { id: 6, name: 'Green Gram', price: 85 },
        { id: 7, name: 'Black Gram', price: 80 },
        { id: 8, name: 'Bajra', price: 65 },
        { id: 9, name: 'Sesame', price: 75 },
        { id: 10, name: 'Castor', price: 60 },
      ];
    }
    else if (state === 'Bihar' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Orange', price: 100 },
        { id: 2, name: 'Pomegranate', price: 120 },
        { id: 3, name: 'Papaya', price: 85 },
        { id: 4, name: 'Banana', price: 55 },
        { id: 5, name: 'Pear', price: 95 },
        { id: 6, name: 'Tamarind', price: 75 },
        { id: 7, name: 'Sweet Lime', price: 105 },
        { id: 8, name: 'Coriander', price: 45 },
        { id: 9, name: 'Cucumber', price: 40 },
        { id: 10, name: 'Carrot', price: 50 },
      ];
    }
    else if (state === 'Bihar' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 130 },
        { id: 2, name: 'Guava', price: 60 },
        { id: 3, name: 'Brinjal', price: 70 },
        { id: 4, name: 'Okra', price: 50 },
        { id: 5, name: 'Tomato', price: 45 },
        { id: 6, name: 'Spinach', price: 40 },
        { id: 7, name: 'Coriander', price: 30 },
        { id: 8, name: 'Mint', price: 25 },
        { id: 9, name: 'Radish', price: 35 },
        { id: 10, name: 'Pumpkin', price: 65 },
      ];
    }
            
    else if (state === 'Chhattisgarh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Lemon', price: 65 },
        { id: 2, name: 'Mango', price: 110 },
        { id: 3, name: 'Papaya', price: 75 },
        { id: 4, name: 'Guava', price: 55 },
        { id: 5, name: 'Tomato', price: 50 },
        { id: 6, name: 'Okra', price: 35 },
        { id: 7, name: 'Pumpkin', price: 45 },
        { id: 8, name: 'Bottle Gourd', price: 40 },
        { id: 9, name: 'Watermelon', price: 70 },
        { id: 10, name: 'Chili', price: 65 },
      ];
    }
    else if (state === 'Chhattisgarh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Peas', price: 60 },
        { id: 2, name: 'Spinach', price: 50 },
        { id: 3, name: 'Carrot', price: 55 },
        { id: 4, name: 'Cabbage', price: 45 },
        { id: 5, name: 'Onion', price: 35 },
        { id: 6, name: 'Mustard', price: 70 },
        { id: 7, name: 'Turnip', price: 40 },
        { id: 8, name: 'Beetroot', price: 65 },
        { id: 9, name: 'Fenugreek', price: 50 },
        { id: 10, name: 'Radish', price: 45 },
      ];
    }
    else if (state === 'Chhattisgarh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 90 },
        { id: 2, name: 'Maize', price: 85 },
        { id: 3, name: 'Soybean', price: 70 },
        { id: 4, name: 'Pigeon Pea', price: 60 },
        { id: 5, name: 'Sugarcane', price: 95 },
        { id: 6, name: 'Sesame', price: 75 },
        { id: 7, name: 'Cotton', price: 100 },
        { id: 8, name: 'Black Gram', price: 80 },
        { id: 9, name: 'Green Gram', price: 70 },
        { id: 10, name: 'Groundnut', price: 65 },
      ];
    }
    else if (state === 'Chhattisgarh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 110 },
        { id: 2, name: 'Grapes', price: 120 },
        { id: 3, name: 'Lemon', price: 65 },
        { id: 4, name: 'Papaya', price: 75 },
        { id: 5, name: 'Banana', price: 55 },
        { id: 6, name: 'Guava', price: 80 },
        { id: 7, name: 'Orange', price: 100 },
        { id: 8, name: 'Litchi', price: 130 },
        { id: 9, name: 'Sweet Lime', price: 70 },
        { id: 10, name: 'Tamarind', price: 85 },
      ];
    }
    else if (state === 'Chhattisgarh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 115 },
        { id: 2, name: 'Jackfruit', price: 85 },
        { id: 3, name: 'Cucumber', price: 45 },
        { id: 4, name: 'Watermelon', price: 80 },
        { id: 5, name: 'Radish', price: 35 },
        { id: 6, name: 'Bottle Gourd', price: 50 },
        { id: 7, name: 'Chili', price: 60 },
        { id: 8, name: 'Pumpkin', price: 40 },
        { id: 9, name: 'Tomato', price: 50 },
        { id: 10, name: 'Coriander', price: 25 },
      ];
    }
    else if (state === 'Goa' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Cashew Nut', price: 200 },
        { id: 2, name: 'Mango', price: 120 },
        { id: 3, name: 'Coconut', price: 75 },
        { id: 4, name: 'Pineapple', price: 60 },
        { id: 5, name: 'Papaya', price: 45 },
        { id: 6, name: 'Banana', price: 50 },
        { id: 7, name: 'Tomato', price: 40 },
        { id: 8, name: 'Cucumber', price: 30 },
        { id: 9, name: 'Brinjal', price: 45 },
        { id: 10, name: 'Chili', price: 55 },
      ];
    }
    else if (state === 'Goa' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Beetroot', price: 60 },
        { id: 2, name: 'Carrot', price: 55 },
        { id: 3, name: 'Cabbage', price: 50 },
        { id: 4, name: 'Spinach', price: 40 },
        { id: 5, name: 'Peas', price: 35 },
        { id: 6, name: 'Onion', price: 30 },
        { id: 7, name: 'Garlic', price: 70 },
        { id: 8, name: 'Fenugreek', price: 25 },
        { id: 9, name: 'Turnip', price: 45 },
        { id: 10, name: 'Radish', price: 35 },
      ];
    }
    else if (state === 'Goa' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 },
        { id: 2, name: 'Maize', price: 80 },
        { id: 3, name: 'Finger Millet', price: 75 },
        { id: 4, name: 'Pigeon Pea', price: 65 },
        { id: 5, name: 'Black Gram', price: 70 },
        { id: 6, name: 'Green Gram', price: 65 },
        { id: 7, name: 'Groundnut', price: 55 },
        { id: 8, name: 'Turmeric', price: 120 },
        { id: 9, name: 'Ginger', price: 110 },
        { id: 10, name: 'Banana', price: 50 },
      ];
    }
    else if (state === 'Goa' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Orange', price: 100 },
        { id: 2, name: 'Sweet Lime', price: 85 },
        { id: 3, name: 'Pomegranate', price: 115 },
        { id: 4, name: 'Tamarind', price: 90 },
        { id: 5, name: 'Litchi', price: 130 },
        { id: 6, name: 'Cashew Apple', price: 80 },
        { id: 7, name: 'Jackfruit', price: 100 },
        { id: 8, name: 'Guava', price: 60 },
        { id: 9, name: 'Banana', price: 55 },
        { id: 10, name: 'Carrot', price: 45 },
      ];
    }
    else if (state === 'Goa' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 110 },
        { id: 2, name: 'Pineapple', price: 85 },
        { id: 3, name: 'Watermelon', price: 70 },
        { id: 4, name: 'Papaya', price: 65 },
        { id: 5, name: 'Pumpkin', price: 50 },
        { id: 6, name: 'Cucumber', price: 30 },
        { id: 7, name: 'Spinach', price: 25 },
        { id: 8, name: 'Okra', price: 40 },
        { id: 9, name: 'Tomato', price: 45 },
        { id: 10, name: 'Mint', price: 20 },
      ];
    }
    
    else if (state === 'Gujarat' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 },
        { id: 2, name: 'Watermelon', price: 60 },
        { id: 3, name: 'Papaya', price: 55 },
        { id: 4, name: 'Chili', price: 75 },
        { id: 5, name: 'Cucumber', price: 40 },
        { id: 6, name: 'Okra', price: 45 },
        { id: 7, name: 'Tomato', price: 50 },
        { id: 8, name: 'Bottle Gourd', price: 35 },
        { id: 9, name: 'Lemon', price: 30 },
        { id: 10, name: 'Brinjal', price: 50 },
      ];
    }
    else if (state === 'Gujarat' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Potato', price: 25 },
        { id: 2, name: 'Onion', price: 30 },
        { id: 3, name: 'Garlic', price: 70 },
        { id: 4, name: 'Cabbage', price: 40 },
        { id: 5, name: 'Cauliflower', price: 50 },
        { id: 6, name: 'Radish', price: 35 },
        { id: 7, name: 'Carrot', price: 45 },
        { id: 8, name: 'Spinach', price: 25 },
        { id: 9, name: 'Fenugreek', price: 30 },
        { id: 10, name: 'Peas', price: 55 },
      ];
    }
    else if (state === 'Gujarat' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 90 },
        { id: 2, name: 'Maize', price: 75 },
        { id: 3, name: 'Cotton', price: 120 },
        { id: 4, name: 'Sugarcane', price: 100 },
        { id: 5, name: 'Green Gram', price: 60 },
        { id: 6, name: 'Black Gram', price: 70 },
        { id: 7, name: 'Groundnut', price: 85 },
        { id: 8, name: 'Turmeric', price: 115 },
        { id: 9, name: 'Ginger', price: 95 },
        { id: 10, name: 'Soybean', price: 110 },
      ];
    }
    else if (state === 'Gujarat' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 120 },
        { id: 2, name: 'Guava', price: 60 },
        { id: 3, name: 'Sapota (Chikoo)', price: 75 },
        { id: 4, name: 'Lemon', price: 40 },
        { id: 5, name: 'Custard Apple', price: 110 },
        { id: 6, name: 'Banana', price: 55 },
        { id: 7, name: 'Pumpkin', price: 50 },
        { id: 8, name: 'Brinjal', price: 45 },
        { id: 9, name: 'Carrot', price: 40 },
        { id: 10, name: 'Beetroot', price: 45 },
      ];
    }
    else if (state === 'Gujarat' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Pear', price: 100 },
        { id: 2, name: 'Sweet Lime', price: 85 },
        { id: 3, name: 'Cucumber', price: 30 },
        { id: 4, name: 'Okra', price: 40 },
        { id: 5, name: 'Tomato', price: 45 },
        { id: 6, name: 'Mint', price: 25 },
        { id: 7, name: 'Lettuce', price: 50 },
        { id: 8, name: 'Spinach', price: 20 },
        { id: 9, name: 'Papaya', price: 65 },
        { id: 10, name: 'Watermelon', price: 75 },
      ];
    }
    
    else if (state === 'Haryana' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Wheat', price: 25 },
        { id: 2, name: 'Rice', price: 30 },
        { id: 3, name: 'Maize', price: 40 },
        { id: 4, name: 'Sugarcane', price: 45 },
        { id: 5, name: 'Cotton', price: 60 },
        { id: 6, name: 'Guava', price: 55 },
        { id: 7, name: 'Mango', price: 120 },
        { id: 8, name: 'Okra', price: 50 },
        { id: 9, name: 'Tomato', price: 35 },
        { id: 10, name: 'Chili', price: 60 },
      ];
    }
    else if (state === 'Haryana' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Mustard', price: 65 },
        { id: 2, name: 'Barley', price: 50 },
        { id: 3, name: 'Peas', price: 40 },
        { id: 4, name: 'Potato', price: 30 },
        { id: 5, name: 'Onion', price: 25 },
        { id: 6, name: 'Garlic', price: 70 },
        { id: 7, name: 'Radish', price: 20 },
        { id: 8, name: 'Carrot', price: 35 },
        { id: 9, name: 'Spinach', price: 25 },
        { id: 10, name: 'Fenugreek', price: 30 },
      ];
    }
    else if (state === 'Haryana' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Basmati Rice', price: 110 },
        { id: 2, name: 'Maize', price: 75 },
        { id: 3, name: 'Bajra', price: 80 },
        { id: 4, name: 'Sorghum (Jowar)', price: 65 },
        { id: 5, name: 'Soybean', price: 85 },
        { id: 6, name: 'Green Gram', price: 70 },
        { id: 7, name: 'Black Gram', price: 60 },
        { id: 8, name: 'Groundnut', price: 75 },
        { id: 9, name: 'Turmeric', price: 120 },
        { id: 10, name: 'Ginger', price: 95 },
      ];
    }
    else if (state === 'Haryana' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Wheat', price: 25 },
        { id: 2, name: 'Sugarcane', price: 50 },
        { id: 3, name: 'Pomegranate', price: 120 },
        { id: 4, name: 'Custard Apple', price: 100 },
        { id: 5, name: 'Guava', price: 60 },
        { id: 6, name: 'Pear', price: 85 },
        { id: 7, name: 'Carrot', price: 40 },
        { id: 8, name: 'Beetroot', price: 45 },
        { id: 9, name: 'Lettuce', price: 35 },
        { id: 10, name: 'Pumpkin', price: 50 },
      ];
    }
    else if (state === 'Haryana' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Barley', price: 45 },
        { id: 2, name: 'Mustard', price: 60 },
        { id: 3, name: 'Potato', price: 30 },
        { id: 4, name: 'Peas', price: 35 },
        { id: 5, name: 'Spinach', price: 25 },
        { id: 6, name: 'Mint', price: 20 },
        { id: 7, name: 'Lettuce', price: 30 },
        { id: 8, name: 'Cucumber', price: 40 },
        { id: 9, name: 'Watermelon', price: 50 },
        { id: 10, name: 'Papaya', price: 60 },
      ];
    }
    else if (state === 'Himachal Pradesh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Wheat', price: 150 },
        { id: 2, name: 'Pear', price: 80 },
        { id: 3, name: 'Peach', price: 100 },
        { id: 4, name: 'Cherry', price: 200 },
        { id: 5, name: 'Plum', price: 90 },
        { id: 6, name: 'Tomato', price: 40 },
        { id: 7, name: 'Cucumber', price: 30 },
        { id: 8, name: 'Capsicum', price: 60 },
        { id: 9, name: 'Brinjal', price: 45 },
        { id: 10, name: 'Green Beans', price: 50 },
      ];
    }
    else if (state === 'Himachal Pradesh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cauliflower', price: 50 },
        { id: 2, name: 'Cabbage', price: 45 },
        { id: 3, name: 'Carrot', price: 35 },
        { id: 4, name: 'Radish', price: 30 },
        { id: 5, name: 'Turnip', price: 40 },
        { id: 6, name: 'Spinach', price: 25 },
        { id: 7, name: 'Peas', price: 40 },
        { id: 8, name: 'Garlic', price: 70 },
        { id: 9, name: 'Onion', price: 30 },
        { id: 10, name: 'Fenugreek', price: 25 },
      ];
    }
    else if (state === 'Himachal Pradesh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 50 },
        { id: 2, name: 'Potato', price: 70 },
        { id: 3, name: 'Soybean', price: 90 },
        { id: 4, name: 'Paddy', price: 40 },
        { id: 5, name: 'French Beans', price: 55 },
        { id: 6, name: 'Brinjal', price: 45 },
        { id: 7, name: 'Capsicum', price: 60 },
        { id: 8, name: 'Green Chilies', price: 50 },
        { id: 9, name: 'Zucchini', price: 65 },
        { id: 10, name: 'Bitter Gourd', price: 35 },
      ];
    }
    else if (state === 'Himachal Pradesh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Apple', price: 150 },
        { id: 2, name: 'Pomegranate', price: 120 },
        { id: 3, name: 'Pear', price: 85 },
        { id: 4, name: 'Plum', price: 100 },
        { id: 5, name: 'Guava', price: 60 },
        { id: 6, name: 'Orange', price: 110 },
        { id: 7, name: 'Sweet Lime', price: 100 },
        { id: 8, name: 'Pumpkin', price: 50 },
        { id: 9, name: 'Cabbage', price: 45 },
        { id: 10, name: 'Radish', price: 30 },
      ];
    }
    else if (state === 'Himachal Pradesh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Strawberry', price: 200 }, { id: 2, name: 'Apple Blossom', price: 180 },
        { id: 3, name: 'Peas', price: 40 }, { id: 4, name: 'Potato', price: 35 }, { id: 5, name: 'Broccoli', price: 60 }, { id: 6, name: 'Cauliflower', price: 50 },
        { id: 7, name: 'Cucumber', price: 30 },{ id: 8, name: 'Spinach', price: 25 }, { id: 9, name: 'Turnip', price: 40 },
        { id: 10, name: 'Mint', price: 20 },
      ];
    }
    else if (state === 'Jharkhand' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 }, { id: 2, name: 'Litchi', price: 150 }, { id: 3, name: 'Banana', price: 50 },
        { id: 4, name: 'Pineapple', price: 80 }, { id: 5, name: 'Jackfruit', price: 100 }, { id: 6, name: 'Tomato', price: 40 },
        { id: 7, name: 'Brinjal', price: 45 }, { id: 8, name: 'Okra', price: 35 }, { id: 9, name: 'Cucumber', price: 30 },
        { id: 10, name: 'Green Chilies', price: 50 }
      ];
    } else if (state === 'Jharkhand' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cauliflower', price: 50 }, { id: 2, name: 'Cabbage', price: 45 }, { id: 3, name: 'Radish', price: 30 },
        { id: 4, name: 'Turnip', price: 40 }, { id: 5, name: 'Carrot', price: 35 }, { id: 6, name: 'Peas', price: 40 },
        { id: 7, name: 'Onion', price: 30 }, { id: 8, name: 'Garlic', price: 70 }, { id: 9, name: 'Spinach', price: 25 },
        { id: 10, name: 'Fenugreek', price: 25 }
      ];
    } else if (state === 'Jharkhand' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Paddy', price: 60 }, { id: 2, name: 'Maize', price: 50 }, { id: 3, name: 'Soybean', price: 90 },
        { id: 4, name: 'Black Gram', price: 70 }, { id: 5, name: 'Green Gram', price: 65 }, { id: 6, name: 'Groundnut', price: 55 },
        { id: 7, name: 'Turmeric', price: 120 }, { id: 8, name: 'Ginger', price: 110 }, { id: 9, name: 'Potato', price: 40 },
        { id: 10, name: 'Bottle Gourd', price: 35 }
      ];
    } else if (state === 'Jharkhand' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Sweet Potato', price: 50 }, { id: 2, name: 'Pumpkin', price: 40 }, { id: 3, name: 'Tomato', price: 35 },
        { id: 4, name: 'Cabbage', price: 45 }, { id: 5, name: 'Cauliflower', price: 50 }, { id: 6, name: 'Guava', price: 60 },
        { id: 7, name: 'Pomegranate', price: 120 }, { id: 8, name: 'Orange', price: 110 }, { id: 9, name: 'Brinjal', price: 45 },
        { id: 10, name: 'Green Beans', price: 50 }
      ];
    } else if (state === 'Jharkhand' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Strawberry', price: 200 }, { id: 2, name: 'Watermelon', price: 70 }, { id: 3, name: 'Muskmelon', price: 65 },
        { id: 4, name: 'Tomato', price: 40 }, { id: 5, name: 'Cucumber', price: 30 }, { id: 6, name: 'Spinach', price: 25 },
        { id: 7, name: 'Radish', price: 30 }, { id: 8, name: 'Fenugreek', price: 25 }, { id: 9, name: 'Mint', price: 20 },
        { id: 10, name: 'Carrot', price: 35 }
      ];
    }
    
    else if (state === 'Karnataka' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 }, { id: 2, name: 'Cashew Nut', price: 200 }, { id: 3, name: 'Banana', price: 50 },
        { id: 4, name: 'Pineapple', price: 80 }, { id: 5, name: 'Coconut', price: 75 }, { id: 6, name: 'Brinjal', price: 45 },
        { id: 7, name: 'Okra', price: 35 }, { id: 8, name: 'Tomato', price: 40 }, { id: 9, name: 'Chili', price: 55 },
        { id: 10, name: 'Cucumber', price: 30 }
      ];
    } else if (state === 'Karnataka' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cauliflower', price: 50 }, { id: 2, name: 'Carrot', price: 35 }, { id: 3, name: 'Cabbage', price: 45 },
        { id: 4, name: 'Radish', price: 30 }, { id: 5, name: 'Turnip', price: 40 }, { id: 6, name: 'Spinach', price: 25 },
        { id: 7, name: 'Peas', price: 40 }, { id: 8, name: 'Onion', price: 30 }, { id: 9, name: 'Garlic', price: 70 },
        { id: 10, name: 'Fenugreek', price: 25 }
      ];
    } else if (state === 'Karnataka' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 60 }, { id: 2, name: 'Maize', price: 50 }, { id: 3, name: 'Ragi', price: 70 },
        { id: 4, name: 'Turmeric', price: 120 }, { id: 5, name: 'Ginger', price: 110 }, { id: 6, name: 'Groundnut', price: 55 },
        { id: 7, name: 'Green Gram', price: 65 }, { id: 8, name: 'Black Gram', price: 70 }, { id: 9, name: 'Soybean', price: 90 },
        { id: 10, name: 'Bottle Gourd', price: 35 }
      ];
    } else if (state === 'Karnataka' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Sweet Potato', price: 50 }, { id: 2, name: 'Pumpkin', price: 40 }, { id: 3, name: 'Brinjal', price: 45 },
        { id: 4, name: 'Cauliflower', price: 50 }, { id: 5, name: 'Tomato', price: 35 }, { id: 6, name: 'Green Beans', price: 50 },
        { id: 7, name: 'Guava', price: 60 }, { id: 8, name: 'Pomegranate', price: 120 }, { id: 9, name: 'Chili', price: 55 },
        { id: 10, name: 'Cabbage', price: 45 }
      ];
    } else if (state === 'Karnataka' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Strawberry', price: 200 }, { id: 2, name: 'Watermelon', price: 70 }, { id: 3, name: 'Muskmelon', price: 65 },
        { id: 4, name: 'Tomato', price: 40 }, { id: 5, name: 'Cucumber', price: 30 }, { id: 6, name: 'Spinach', price: 25 },
        { id: 7, name: 'Radish', price: 30 }, { id: 8, name: 'Fenugreek', price: 25 }, { id: 9, name: 'Mint', price: 20 },
        { id: 10, name: 'Carrot', price: 35 }
      ];
    }
    else if (state === 'Kerala' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 }, { id: 2, name: 'Banana', price: 50 }, { id: 3, name: 'Pineapple', price: 80 },
        { id: 4, name: 'Coconut', price: 75 }, { id: 5, name: 'Cashew Nut', price: 200 }, { id: 6, name: 'Papaya', price: 60 },
        { id: 7, name: 'Tapioca', price: 40 }, { id: 8, name: 'Jackfruit', price: 70 }, { id: 9, name: 'Brinjal', price: 50 },
        { id: 10, name: 'Chili', price: 55 }
      ];
    } else if (state === 'Kerala' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cardamom', price: 400 }, { id: 2, name: 'Pepper', price: 350 }, { id: 3, name: 'Clove', price: 300 },
        { id: 4, name: 'Nutmeg', price: 250 }, { id: 5, name: 'Spinach', price: 25 }, { id: 6, name: 'Tomato', price: 40 },
        { id: 7, name: 'Radish', price: 30 }, { id: 8, name: 'Carrot', price: 35 }, { id: 9, name: 'Onion', price: 30 },
        { id: 10, name: 'Garlic', price: 70 }
      ];
    } else if (state === 'Kerala' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 60 }, { id: 2, name: 'Banana', price: 50 }, { id: 3, name: 'Green Gram', price: 65 },
        { id: 4, name: 'Black Gram', price: 70 }, { id: 5, name: 'Ginger', price: 110 }, { id: 6, name: 'Turmeric', price: 120 },
        { id: 7, name: 'Yam', price: 50 }, { id: 8, name: 'Tapioca', price: 40 }, { id: 9, name: 'Cucumber', price: 30 },
        { id: 10, name: 'Pumpkin', price: 50 }
      ];
    } else if (state === 'Kerala' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Guava', price: 60 }, { id: 2, name: 'Pomegranate', price: 120 }, { id: 3, name: 'Jackfruit', price: 70 },
        { id: 4, name: 'Tomato', price: 40 }, { id: 5, name: 'Brinjal', price: 50 }, { id: 6, name: 'Okra', price: 35 },
        { id: 7, name: 'Chili', price: 55 }, { id: 8, name: 'Cabbage', price: 45 }, { id: 9, name: 'Spinach', price: 25 },
        { id: 10, name: 'Radish', price: 30 }
      ];
    } else if (state === 'Kerala' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Strawberry', price: 200 }, { id: 2, name: 'Watermelon', price: 70 }, { id: 3, name: 'Muskmelon', price: 65 },
        { id: 4, name: 'Cucumber', price: 30 }, { id: 5, name: 'Pumpkin', price: 50 }, { id: 6, name: 'Spinach', price: 25 },
        { id: 7, name: 'Fenugreek', price: 25 }, { id: 8, name: 'Tomato', price: 40 }, { id: 9, name: 'Mint', price: 20 },
        { id: 10, name: 'Carrot', price: 35 }
      ];
    }
    else if (state === 'Madhya Pradesh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Wheat', price: 45 }, { id: 2, name: 'Soybean', price: 80 }, { id: 3, name: 'Cotton', price: 100 },
        { id: 4, name: 'Tomato', price: 40 }, { id: 5, name: 'Brinjal', price: 50 }, { id: 6, name: 'Okra', price: 35 },
        { id: 7, name: 'Chili', price: 55 }, { id: 8, name: 'Pumpkin', price: 50 }, { id: 9, name: 'Cucumber', price: 30 },
        { id: 10, name: 'Fenugreek', price: 25 }
      ];
    } else if (state === 'Madhya Pradesh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Wheat', price: 50 }, { id: 2, name: 'Barley', price: 45 }, { id: 3, name: 'Mustard', price: 75 },
        { id: 4, name: 'Peas', price: 35 }, { id: 5, name: 'Carrot', price: 40 }, { id: 6, name: 'Cabbage', price: 30 },
        { id: 7, name: 'Radish', price: 25 }, { id: 8, name: 'Spinach', price: 20 }, { id: 9, name: 'Garlic', price: 60 },
        { id: 10, name: 'Onion', price: 40 }
      ];
    } else if (state === 'Madhya Pradesh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 60 }, { id: 2, name: 'Maize', price: 50 }, { id: 3, name: 'Pigeon Pea', price: 70 },
        { id: 4, name: 'Turmeric', price: 100 }, { id: 5, name: 'Ginger', price: 90 }, { id: 6, name: 'Green Gram', price: 65 },
        { id: 7, name: 'Black Gram', price: 75 }, { id: 8, name: 'Groundnut', price: 80 }, { id: 9, name: 'Soybean', price: 85 },
        { id: 10, name: 'Sesame', price: 95 }
      ];
    } else if (state === 'Madhya Pradesh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Guava', price: 60 }, { id: 2, name: 'Pomegranate', price: 120 }, { id: 3, name: 'Orange', price: 100 },
        { id: 4, name: 'Sweet Lime', price: 85 }, { id: 5, name: 'Tamarind', price: 90 }, { id: 6, name: 'Chili', price: 55 },
        { id: 7, name: 'Tomato', price: 40 }, { id: 8, name: 'Cabbage', price: 35 }, { id: 9, name: 'Carrot', price: 30 },
        { id: 10, name: 'Radish', price: 25 }
      ];
    } else if (state === 'Madhya Pradesh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 70 }, { id: 2, name: 'Muskmelon', price: 65 }, { id: 3, name: 'Strawberry', price: 200 },
        { id: 4, name: 'Pumpkin', price: 50 }, { id: 5, name: 'Cucumber', price: 30 }, { id: 6, name: 'Okra', price: 35 },
        { id: 7, name: 'Tomato', price: 40 }, { id: 8, name: 'Spinach', price: 25 }, { id: 9, name: 'Mint', price: 20 },
        { id: 10, name: 'Fenugreek', price: 25 }
      ];
    }
    else if (state === 'Maharashtra' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 150 }, { id: 2, name: 'Pineapple', price: 80 }, { id: 3, name: 'Coconut', price: 100 },
        { id: 4, name: 'Tomato', price: 45 }, { id: 5, name: 'Brinjal', price: 55 }, { id: 6, name: 'Okra', price: 40 },
        { id: 7, name: 'Cucumber', price: 30 }, { id: 8, name: 'Chili', price: 50 }, { id: 9, name: 'Pumpkin', price: 60 },
        { id: 10, name: 'Ginger', price: 120 }
      ];
    } else if (state === 'Maharashtra' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Cauliflower', price: 50 }, { id: 2, name: 'Cabbage', price: 40 }, { id: 3, name: 'Carrot', price: 45 },
        { id: 4, name: 'Peas', price: 50 }, { id: 5, name: 'Garlic', price: 70 }, { id: 6, name: 'Spinach', price: 30 },
        { id: 7, name: 'Onion', price: 60 }, { id: 8, name: 'Radish', price: 25 }, { id: 9, name: 'Beetroot', price: 55 },
        { id: 10, name: 'Mustard', price: 70 }
      ];
    } else if (state === 'Maharashtra' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 65 }, { id: 2, name: 'Maize', price: 60 }, { id: 3, name: 'Soybean', price: 75 },
        { id: 4, name: 'Groundnut', price: 80 }, { id: 5, name: 'Pigeon Pea', price: 70 }, { id: 6, name: 'Turmeric', price: 100 },
        { id: 7, name: 'Ginger', price: 90 }, { id: 8, name: 'Black Gram', price: 85 }, { id: 9, name: 'Green Gram', price: 80 },
        { id: 10, name: 'Sesame', price: 95 }
      ];
    } else if (state === 'Maharashtra' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Guava', price: 80 }, { id: 2, name: 'Pomegranate', price: 120 }, { id: 3, name: 'Orange', price: 100 },
        { id: 4, name: 'Sweet Lime', price: 90 }, { id: 5, name: 'Chili', price: 50 }, { id: 6, name: 'Tamarind', price: 70 },
        { id: 7, name: 'Carrot', price: 40 }, { id: 8, name: 'Tomato', price: 45 }, { id: 9, name: 'Cabbage', price: 35 },
        { id: 10, name: 'Banana', price: 60 }
      ];
    } else if (state === 'Maharashtra' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 80 }, { id: 2, name: 'Muskmelon', price: 75 }, { id: 3, name: 'Strawberry', price: 150 },
        { id: 4, name: 'Pumpkin', price: 50 }, { id: 5, name: 'Cucumber', price: 40 }, { id: 6, name: 'Okra', price: 45 },
        { id: 7, name: 'Tomato', price: 50 }, { id: 8, name: 'Spinach', price: 30 }, { id: 9, name: 'Fenugreek', price: 25 },
        { id: 10, name: 'Mint', price: 20 }
      ];
    }
    else if (state === 'Nagaland' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Rice', price: 75 }, { id: 2, name: 'Mango', price: 140 }, { id: 3, name: 'Chili', price: 50 },
        { id: 4, name: 'Tomato', price: 60 }, { id: 5, name: 'Brinjal', price: 55 }, { id: 6, name: 'Cucumber', price: 40 },
        { id: 7, name: 'Pumpkin', price: 60 }, { id: 8, name: 'Papaya', price: 80 }, { id: 9, name: 'Okra', price: 45 },
        { id: 10, name: 'Watermelon', price: 95 }
      ];
    } else if (state === 'Nagaland' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 65 }, { id: 2, name: 'Cabbage', price: 55 }, { id: 3, name: 'Cauliflower', price: 60 },
        { id: 4, name: 'Radish', price: 40 }, { id: 5, name: 'Peas', price: 45 }, { id: 6, name: 'Garlic', price: 70 },
        { id: 7, name: 'Onion', price: 50 }, { id: 8, name: 'Spinach', price: 35 }, { id: 9, name: 'Mustard', price: 80 },
        { id: 10, name: 'Beetroot', price: 50 }
      ];
    } else if (state === 'Nagaland' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Maize', price: 85 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Groundnut', price: 80 },
        { id: 4, name: 'Pigeon Pea', price: 75 }, { id: 5, name: 'Soybean', price: 70 }, { id: 6, name: 'Black Gram', price: 95 },
        { id: 7, name: 'Green Gram', price: 80 }, { id: 8, name: 'Turmeric', price: 100 }, { id: 9, name: 'Ginger', price: 110 },
        { id: 10, name: 'Sesame', price: 90 }
      ];
    } else if (state === 'Nagaland' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 120 }, { id: 2, name: 'Guava', price: 95 }, { id: 3, name: 'Sweet Lime', price: 85 },
        { id: 4, name: 'Orange', price: 100 }, { id: 5, name: 'Tamarind', price: 70 }, { id: 6, name: 'Chili', price: 60 },
        { id: 7, name: 'Papaya', price: 80 }, { id: 8, name: 'Carrot', price: 55 }, { id: 9, name: 'Banana', price: 65 },
        { id: 10, name: 'Tomato', price: 50 }
      ];
    } else if (state === 'Nagaland' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 100 }, { id: 2, name: 'Muskmelon', price: 85 }, { id: 3, name: 'Strawberry', price: 150 },
        { id: 4, name: 'Okra', price: 55 }, { id: 5, name: 'Pumpkin', price: 70 }, { id: 6, name: 'Cucumber', price: 40 },
        { id: 7, name: 'Tomato', price: 50 }, { id: 8, name: 'Spinach', price: 30 }, { id: 9, name: 'Fenugreek', price: 35 },
        { id: 10, name: 'Mint', price: 25 }
      ];
    }
    else if (state === 'Manipur' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 }, { id: 2, name: 'Rice', price: 80 }, { id: 3, name: 'Chili', price: 50 },
        { id: 4, name: 'Papaya', price: 70 }, { id: 5, name: 'Cucumber', price: 45 }, { id: 6, name: 'Tomato', price: 60 },
        { id: 7, name: 'Pumpkin', price: 55 }, { id: 8, name: 'Brinjal', price: 50 }, { id: 9, name: 'Okra', price: 40 },
        { id: 10, name: 'Watermelon', price: 90 }
      ];
    } else if (state === 'Manipur' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 70 }, { id: 2, name: 'Cauliflower', price: 60 }, { id: 3, name: 'Cabbage', price: 50 },
        { id: 4, name: 'Garlic', price: 80 }, { id: 5, name: 'Onion', price: 65 }, { id: 6, name: 'Spinach', price: 40 },
        { id: 7, name: 'Peas', price: 55 }, { id: 8, name: 'Mustard', price: 75 }, { id: 9, name: 'Beetroot', price: 60 },
        { id: 10, name: 'Radish', price: 50 }
      ];
    } else if (state === 'Manipur' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 80 }, { id: 2, name: 'Maize', price: 70 }, { id: 3, name: 'Soybean', price: 90 },
        { id: 4, name: 'Groundnut', price: 85 }, { id: 5, name: 'Black Gram', price: 75 }, { id: 6, name: 'Green Gram', price: 80 },
        { id: 7, name: 'Turmeric', price: 100 }, { id: 8, name: 'Pigeon Pea', price: 85 }, { id: 9, name: 'Ginger', price: 110 },
        { id: 10, name: 'Sesame', price: 90 }
      ];
    } else if (state === 'Manipur' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 120 }, { id: 2, name: 'Guava', price: 100 }, { id: 3, name: 'Orange', price: 90 },
        { id: 4, name: 'Sweet Lime', price: 80 }, { id: 5, name: 'Chili', price: 60 }, { id: 6, name: 'Tamarind', price: 75 },
        { id: 7, name: 'Papaya', price: 65 }, { id: 8, name: 'Banana', price: 60 }, { id: 9, name: 'Carrot', price: 55 },
        { id: 10, name: 'Tomato', price: 45 }
      ];
    } else if (state === 'Manipur' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 100 }, { id: 2, name: 'Muskmelon', price: 85 }, { id: 3, name: 'Strawberry', price: 150 },
        { id: 4, name: 'Pumpkin', price: 70 }, { id: 5, name: 'Cucumber', price: 45 }, { id: 6, name: 'Okra', price: 50 },
        { id: 7, name: 'Tomato', price: 55 }, { id: 8, name: 'Spinach', price: 35 }, { id: 9, name: 'Fenugreek', price: 30 },
        { id: 10, name: 'Mint', price: 25 }
      ];
    }
    else if (state === 'Meghalaya' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 120 }, { id: 2, name: 'Rice', price: 80 }, { id: 3, name: 'Chili', price: 60 },
        { id: 4, name: 'Tomato', price: 55 }, { id: 5, name: 'Brinjal', price: 50 }, { id: 6, name: 'Pumpkin', price: 70 },
        { id: 7, name: 'Cucumber', price: 45 }, { id: 8, name: 'Papaya', price: 75 }, { id: 9, name: 'Okra', price: 40 },
        { id: 10, name: 'Watermelon', price: 95 }
      ];
    } else if (state === 'Meghalaya' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 75 }, { id: 2, name: 'Cabbage', price: 60 }, { id: 3, name: 'Cauliflower', price: 65 },
        { id: 4, name: 'Garlic', price: 80 }, { id: 5, name: 'Onion', price: 70 }, { id: 6, name: 'Spinach', price: 45 },
        { id: 7, name: 'Peas', price: 55 }, { id: 8, name: 'Mustard', price: 85 }, { id: 9, name: 'Beetroot', price: 60 },
        { id: 10, name: 'Radish', price: 50 }
      ];
    } else if (state === 'Meghalaya' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 90 }, { id: 2, name: 'Maize', price: 75 }, { id: 3, name: 'Soybean', price: 95 },
        { id: 4, name: 'Groundnut', price: 85 }, { id: 5, name: 'Black Gram', price: 80 }, { id: 6, name: 'Green Gram', price: 85 },
        { id: 7, name: 'Turmeric', price: 105 }, { id: 8, name: 'Pigeon Pea', price: 80 }, { id: 9, name: 'Ginger', price: 115 },
        { id: 10, name: 'Sesame', price: 95 }
      ];
    } else if (state === 'Meghalaya' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 130 }, { id: 2, name: 'Guava', price: 100 }, { id: 3, name: 'Orange', price: 95 },
        { id: 4, name: 'Sweet Lime', price: 85 }, { id: 5, name: 'Chili', price: 70 }, { id: 6, name: 'Tamarind', price: 80 },
        { id: 7, name: 'Papaya', price: 75 }, { id: 8, name: 'Banana', price: 65 }, { id: 9, name: 'Carrot', price: 60 },
        { id: 10, name: 'Tomato', price: 50 }
      ];
    } else if (state === 'Meghalaya' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 110 }, { id: 2, name: 'Muskmelon', price: 90 }, { id: 3, name: 'Strawberry', price: 160 },
        { id: 4, name: 'Pumpkin', price: 75 }, { id: 5, name: 'Cucumber', price: 50 }, { id: 6, name: 'Okra', price: 60 },
        { id: 7, name: 'Tomato', price: 55 }, { id: 8, name: 'Spinach', price: 40 }, { id: 9, name: 'Fenugreek', price: 35 },
        { id: 10, name: 'Mint', price: 30 }
      ];
    }
    else if (state === 'Mizoram' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 130 }, { id: 2, name: 'Rice', price: 85 }, { id: 3, name: 'Chili', price: 55 },
        { id: 4, name: 'Tomato', price: 60 }, { id: 5, name: 'Brinjal', price: 55 }, { id: 6, name: 'Pumpkin', price: 65 },
        { id: 7, name: 'Cucumber', price: 50 }, { id: 8, name: 'Papaya', price: 75 }, { id: 9, name: 'Okra', price: 45 },
        { id: 10, name: 'Watermelon', price: 100 }
      ];
    } else if (state === 'Mizoram' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 80 }, { id: 2, name: 'Cauliflower', price: 70 }, { id: 3, name: 'Cabbage', price: 65 },
        { id: 4, name: 'Garlic', price: 85 }, { id: 5, name: 'Onion', price: 75 }, { id: 6, name: 'Spinach', price: 50 },
        { id: 7, name: 'Peas', price: 60 }, { id: 8, name: 'Mustard', price: 90 }, { id: 9, name: 'Beetroot', price: 65 },
        { id: 10, name: 'Radish', price: 55 }
      ];
    } else if (state === 'Mizoram' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 80 }, { id: 3, name: 'Soybean', price: 100 },
        { id: 4, name: 'Groundnut', price: 90 }, { id: 5, name: 'Black Gram', price: 85 }, { id: 6, name: 'Green Gram', price: 90 },
        { id: 7, name: 'Turmeric', price: 110 }, { id: 8, name: 'Pigeon Pea', price: 85 }, { id: 9, name: 'Ginger', price: 120 },
        { id: 10, name: 'Sesame', price: 100 }
      ];
    } else if (state === 'Mizoram' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 140 }, { id: 2, name: 'Guava', price: 110 }, { id: 3, name: 'Orange', price: 100 },
        { id: 4, name: 'Sweet Lime', price: 90 }, { id: 5, name: 'Chili', price: 75 }, { id: 6, name: 'Tamarind', price: 85 },
        { id: 7, name: 'Papaya', price: 80 }, { id: 8, name: 'Banana', price: 70 }, { id: 9, name: 'Carrot', price: 65 },
        { id: 10, name: 'Tomato', price: 55 }
      ];
    } else if (state === 'Mizoram' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 120 }, { id: 2, name: 'Muskmelon', price: 100 }, { id: 3, name: 'Strawberry', price: 170 },
        { id: 4, name: 'Pumpkin', price: 80 }, { id: 5, name: 'Cucumber', price: 55 }, { id: 6, name: 'Okra', price: 65 },
        { id: 7, name: 'Tomato', price: 60 }, { id: 8, name: 'Spinach', price: 45 }, { id: 9, name: 'Fenugreek', price: 40 },
        { id: 10, name: 'Mint', price: 35 }
      ];
    }
  
    else if (state === 'Odisha' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 130 }, { id: 2, name: 'Rice', price: 85 }, { id: 3, name: 'Chili', price: 55 },
        { id: 4, name: 'Tomato', price: 60 }, { id: 5, name: 'Brinjal', price: 50 }, { id: 6, name: 'Pumpkin', price: 70 },
        { id: 7, name: 'Cucumber', price: 45 }, { id: 8, name: 'Papaya', price: 75 }, { id: 9, name: 'Okra', price: 40 },
        { id: 10, name: 'Watermelon', price: 100 }
      ];
    } else if (state === 'Odisha' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 80 }, { id: 2, name: 'Cauliflower', price: 70 }, { id: 3, name: 'Cabbage', price: 65 },
        { id: 4, name: 'Garlic', price: 85 }, { id: 5, name: 'Onion', price: 75 }, { id: 6, name: 'Spinach', price: 50 },
        { id: 7, name: 'Peas', price: 60 }, { id: 8, name: 'Mustard', price: 90 }, { id: 9, name: 'Beetroot', price: 65 },
        { id: 10, name: 'Radish', price: 55 }
      ];
    } else if (state === 'Odisha' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 80 }, { id: 3, name: 'Soybean', price: 100 },
        { id: 4, name: 'Groundnut', price: 90 }, { id: 5, name: 'Black Gram', price: 85 }, { id: 6, name: 'Green Gram', price: 90 },
        { id: 7, name: 'Turmeric', price: 110 }, { id: 8, name: 'Pigeon Pea', price: 85 }, { id: 9, name: 'Ginger', price: 120 },
        { id: 10, name: 'Sesame', price: 100 }
      ];
    } else if (state === 'Odisha' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 140 }, { id: 2, name: 'Guava', price: 110 }, { id: 3, name: 'Orange', price: 100 },
        { id: 4, name: 'Sweet Lime', price: 90 }, { id: 5, name: 'Chili', price: 75 }, { id: 6, name: 'Tamarind', price: 85 },
        { id: 7, name: 'Papaya', price: 80 }, { id: 8, name: 'Banana', price: 70 }, { id: 9, name: 'Carrot', price: 65 },
        { id: 10, name: 'Tomato', price: 55 }
      ];
    } else if (state === 'Odisha' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 120 }, { id: 2, name: 'Muskmelon', price: 100 }, { id: 3, name: 'Strawberry', price: 170 },
        { id: 4, name: 'Pumpkin', price: 80 }, { id: 5, name: 'Cucumber', price: 55 }, { id: 6, name: 'Okra', price: 65 },
        { id: 7, name: 'Tomato', price: 60 }, { id: 8, name: 'Spinach', price: 45 }, { id: 9, name: 'Fenugreek', price: 40 },
        { id: 10, name: 'Mint', price: 35 }
      ];
    }
    else if (state === 'Punjab' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 140 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Chili', price: 60 },
        { id: 4, name: 'Tomato', price: 65 }, { id: 5, name: 'Brinjal', price: 55 }, { id: 6, name: 'Pumpkin', price: 75 },
        { id: 7, name: 'Cucumber', price: 50 }, { id: 8, name: 'Papaya', price: 80 }, { id: 9, name: 'Okra', price: 45 },
        { id: 10, name: 'Watermelon', price: 110 }
      ];
    } else if (state === 'Punjab' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 85 }, { id: 2, name: 'Cauliflower', price: 75 }, { id: 3, name: 'Cabbage', price: 70 },
        { id: 4, name: 'Garlic', price: 90 }, { id: 5, name: 'Onion', price: 80 }, { id: 6, name: 'Spinach', price: 55 },
        { id: 7, name: 'Peas', price: 65 }, { id: 8, name: 'Mustard', price: 95 }, { id: 9, name: 'Beetroot', price: 70 },
        { id: 10, name: 'Radish', price: 60 }
      ];
    } else if (state === 'Punjab' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 100 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 110 },
        { id: 4, name: 'Groundnut', price: 95 }, { id: 5, name: 'Black Gram', price: 90 }, { id: 6, name: 'Green Gram', price: 95 },
        { id: 7, name: 'Turmeric', price: 115 }, { id: 8, name: 'Pigeon Pea', price: 90 }, { id: 9, name: 'Ginger', price: 125 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    } else if (state === 'Punjab' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 150 }, { id: 2, name: 'Guava', price: 120 }, { id: 3, name: 'Orange', price: 110 },
        { id: 4, name: 'Sweet Lime', price: 100 }, { id: 5, name: 'Chili', price: 80 }, { id: 6, name: 'Tamarind', price: 90 },
        { id: 7, name: 'Papaya', price: 85 }, { id: 8, name: 'Banana', price: 75 }, { id: 9, name: 'Carrot', price: 70 },
        { id: 10, name: 'Tomato', price: 60 }
      ];
    } else if (state === 'Punjab' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 130 }, { id: 2, name: 'Muskmelon', price: 110 }, { id: 3, name: 'Strawberry', price: 180 },
        { id: 4, name: 'Pumpkin', price: 85 }, { id: 5, name: 'Cucumber', price: 60 }, { id: 6, name: 'Okra', price: 70 },
        { id: 7, name: 'Tomato', price: 65 }, { id: 8, name: 'Spinach', price: 50 }, { id: 9, name: 'Fenugreek', price: 45 },
        { id: 10, name: 'Mint', price: 40 }
      ];
    }
    else if (state === 'Rajasthan' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 150 }, { id: 2, name: 'Rice', price: 95 }, { id: 3, name: 'Chili', price: 65 },
        { id: 4, name: 'Tomato', price: 70 }, { id: 5, name: 'Brinjal', price: 60 }, { id: 6, name: 'Pumpkin', price: 80 },
        { id: 7, name: 'Cucumber', price: 55 }, { id: 8, name: 'Papaya', price: 85 }, { id: 9, name: 'Okra', price: 50 },
        { id: 10, name: 'Watermelon', price: 115 }
      ];
    } else if (state === 'Rajasthan' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 90 }, { id: 2, name: 'Cauliflower', price: 80 }, { id: 3, name: 'Cabbage', price: 75 },
        { id: 4, name: 'Garlic', price: 95 }, { id: 5, name: 'Onion', price: 85 }, { id: 6, name: 'Spinach', price: 60 },
        { id: 7, name: 'Peas', price: 70 }, { id: 8, name: 'Mustard', price: 100 }, { id: 9, name: 'Beetroot', price: 75 },
        { id: 10, name: 'Radish', price: 65 }
      ];
    } else if (state === 'Rajasthan' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 105 }, { id: 2, name: 'Maize', price: 90 }, { id: 3, name: 'Soybean', price: 115 },
        { id: 4, name: 'Groundnut', price: 100 }, { id: 5, name: 'Black Gram', price: 95 }, { id: 6, name: 'Green Gram', price: 100 },
        { id: 7, name: 'Turmeric', price: 120 }, { id: 8, name: 'Pigeon Pea', price: 95 }, { id: 9, name: 'Ginger', price: 130 },
        { id: 10, name: 'Sesame', price: 110 }
      ];
    } else if (state === 'Rajasthan' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 160 }, { id: 2, name: 'Guava', price: 130 }, { id: 3, name: 'Orange', price: 120 },
        { id: 4, name: 'Sweet Lime', price: 110 }, { id: 5, name: 'Chili', price: 85 }, { id: 6, name: 'Tamarind', price: 95 },
        { id: 7, name: 'Papaya', price: 90 }, { id: 8, name: 'Banana', price: 80 }, { id: 9, name: 'Carrot', price: 75 },
        { id: 10, name: 'Tomato', price: 65 }
      ];
    } else if (state === 'Rajasthan' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 140 }, { id: 2, name: 'Muskmelon', price: 120 }, { id: 3, name: 'Strawberry', price: 190 },
        { id: 4, name: 'Pumpkin', price: 90 }, { id: 5, name: 'Cucumber', price: 65 }, { id: 6, name: 'Okra', price: 75 },
        { id: 7, name: 'Tomato', price: 70 }, { id: 8, name: 'Spinach', price: 55 }, { id: 9, name: 'Fenugreek', price: 50 },
        { id: 10, name: 'Mint', price: 45 }
      ];
    }
    else if (state === 'Sikkim' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 160 }, { id: 2, name: 'Rice', price: 95 }, { id: 3, name: 'Chili', price: 70 },
        { id: 4, name: 'Tomato', price: 75 }, { id: 5, name: 'Brinjal', price: 65 }, { id: 6, name: 'Pumpkin', price: 85 },
        { id: 7, name: 'Cucumber', price: 60 }, { id: 8, name: 'Papaya', price: 90 }, { id: 9, name: 'Okra', price: 55 },
        { id: 10, name: 'Watermelon', price: 120 }
      ];
    } else if (state === 'Sikkim' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 95 }, { id: 2, name: 'Cauliflower', price: 85 }, { id: 3, name: 'Cabbage', price: 80 },
        { id: 4, name: 'Garlic', price: 100 }, { id: 5, name: 'Onion', price: 90 }, { id: 6, name: 'Spinach', price: 65 },
        { id: 7, name: 'Peas', price: 75 }, { id: 8, name: 'Mustard', price: 105 }, { id: 9, name: 'Beetroot', price: 80 },
        { id: 10, name: 'Radish', price: 70 }
      ];
    } else if (state === 'Sikkim' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 110 }, { id: 2, name: 'Maize', price: 95 }, { id: 3, name: 'Soybean', price: 120 },
        { id: 4, name: 'Groundnut', price: 105 }, { id: 5, name: 'Black Gram', price: 100 }, { id: 6, name: 'Green Gram', price: 105 },
        { id: 7, name: 'Turmeric', price: 125 }, { id: 8, name: 'Pigeon Pea', price: 100 }, { id: 9, name: 'Ginger', price: 130 },
        { id: 10, name: 'Sesame', price: 115 }
      ];
    } else if (state === 'Sikkim' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 170 }, { id: 2, name: 'Guava', price: 140 }, { id: 3, name: 'Orange', price: 130 },
        { id: 4, name: 'Sweet Lime', price: 120 }, { id: 5, name: 'Chili', price: 90 }, { id: 6, name: 'Tamarind', price: 100 },
        { id: 7, name: 'Papaya', price: 95 }, { id: 8, name: 'Banana', price: 85 }, { id: 9, name: 'Carrot', price: 80 },
        { id: 10, name: 'Tomato', price: 70 }
      ];
    } else if (state === 'Sikkim' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 150 }, { id: 2, name: 'Muskmelon', price: 130 }, { id: 3, name: 'Strawberry', price: 200 },
        { id: 4, name: 'Pumpkin', price: 95 }, { id: 5, name: 'Cucumber', price: 70 }, { id: 6, name: 'Okra', price: 80 },
        { id: 7, name: 'Tomato', price: 75 }, { id: 8, name: 'Spinach', price: 60 }, { id: 9, name: 'Fenugreek', price: 55 },
        { id: 10, name: 'Mint', price: 50 }
      ];
    }
    else if (state === 'Tamil Nadu' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 170 }, { id: 2, name: 'Rice', price: 100 }, { id: 3, name: 'Chili', price: 75 },
        { id: 4, name: 'Tomato', price: 80 }, { id: 5, name: 'Brinjal', price: 70 }, { id: 6, name: 'Pumpkin', price: 90 },
        { id: 7, name: 'Cucumber', price: 65 }, { id: 8, name: 'Papaya', price: 95 }, { id: 9, name: 'Okra', price: 60 },
        { id: 10, name: 'Watermelon', price: 130 }
      ];
    } else if (state === 'Tamil Nadu' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 100 }, { id: 2, name: 'Cauliflower', price: 90 }, { id: 3, name: 'Cabbage', price: 85 },
        { id: 4, name: 'Garlic', price: 110 }, { id: 5, name: 'Onion', price: 95 }, { id: 6, name: 'Spinach', price: 70 },
        { id: 7, name: 'Peas', price: 80 }, { id: 8, name: 'Mustard', price: 115 }, { id: 9, name: 'Beetroot', price: 90 },
        { id: 10, name: 'Radish', price: 80 }
      ];
    } else if (state === 'Tamil Nadu' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 115 }, { id: 2, name: 'Maize', price: 100 }, { id: 3, name: 'Soybean', price: 125 },
        { id: 4, name: 'Groundnut', price: 110 }, { id: 5, name: 'Black Gram', price: 105 }, { id: 6, name: 'Green Gram', price: 110 },
        { id: 7, name: 'Turmeric', price: 130 }, { id: 8, name: 'Pigeon Pea', price: 105 }, { id: 9, name: 'Ginger', price: 135 },
        { id: 10, name: 'Sesame', price: 120 }
      ];
    } else if (state === 'Tamil Nadu' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 180 }, { id: 2, name: 'Guava', price: 150 }, { id: 3, name: 'Orange', price: 140 },
        { id: 4, name: 'Sweet Lime', price: 130 }, { id: 5, name: 'Chili', price: 100 }, { id: 6, name: 'Tamarind', price: 110 },
        { id: 7, name: 'Papaya', price: 105 }, { id: 8, name: 'Banana', price: 95 }, { id: 9, name: 'Carrot', price: 90 },
        { id: 10, name: 'Tomato', price: 80 }
      ];
    } else if (state === 'Tamil Nadu' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 160 }, { id: 2, name: 'Muskmelon', price: 140 }, { id: 3, name: 'Strawberry', price: 210 },
        { id: 4, name: 'Pumpkin', price: 100 }, { id: 5, name: 'Cucumber', price: 75 }, { id: 6, name: 'Okra', price: 85 },
        { id: 7, name: 'Tomato', price: 80 }, { id: 8, name: 'Spinach', price: 65 }, { id: 9, name: 'Fenugreek', price: 60 },
        { id: 10, name: 'Mint', price: 55 }
      ];
    }
    else if (state === 'Telangana' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 180 }, { id: 2, name: 'Rice', price: 105 }, { id: 3, name: 'Chili', price: 80 },
        { id: 4, name: 'Tomato', price: 85 }, { id: 5, name: 'Brinjal', price: 75 }, { id: 6, name: 'Pumpkin', price: 95 },
        { id: 7, name: 'Cucumber', price: 70 }, { id: 8, name: 'Papaya', price: 100 }, { id: 9, name: 'Okra', price: 65 },
        { id: 10, name: 'Watermelon', price: 140 }
      ];
    } else if (state === 'Telangana' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 105 }, { id: 2, name: 'Cauliflower', price: 95 }, { id: 3, name: 'Cabbage', price: 90 },
        { id: 4, name: 'Garlic', price: 115 }, { id: 5, name: 'Onion', price: 100 }, { id: 6, name: 'Spinach', price: 75 },
        { id: 7, name: 'Peas', price: 85 }, { id: 8, name: 'Mustard', price: 120 }, { id: 9, name: 'Beetroot', price: 95 },
        { id: 10, name: 'Radish', price: 85 }
      ];
    } else if (state === 'Telangana' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 120 }, { id: 2, name: 'Maize', price: 105 }, { id: 3, name: 'Soybean', price: 130 },
        { id: 4, name: 'Groundnut', price: 115 }, { id: 5, name: 'Black Gram', price: 110 }, { id: 6, name: 'Green Gram', price: 115 },
        { id: 7, name: 'Turmeric', price: 135 }, { id: 8, name: 'Pigeon Pea', price: 110 }, { id: 9, name: 'Ginger', price: 140 },
        { id: 10, name: 'Sesame', price: 125 }
      ];
    } else if (state === 'Telangana' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Pomegranate', price: 190 }, { id: 2, name: 'Guava', price: 160 }, { id: 3, name: 'Orange', price: 150 },
        { id: 4, name: 'Sweet Lime', price: 140 }, { id: 5, name: 'Chili', price: 110 }, { id: 6, name: 'Tamarind', price: 120 },
        { id: 7, name: 'Papaya', price: 110 }, { id: 8, name: 'Banana', price: 100 }, { id: 9, name: 'Carrot', price: 95 },
        { id: 10, name: 'Tomato', price: 85 }
      ];
    } else if (state === 'Telangana' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Watermelon', price: 170 }, { id: 2, name: 'Muskmelon', price: 150 }, { id: 3, name: 'Strawberry', price: 220 },
        { id: 4, name: 'Pumpkin', price: 105 }, { id: 5, name: 'Cucumber', price: 80 }, { id: 6, name: 'Okra', price: 90 },
        { id: 7, name: 'Tomato', price: 85 }, { id: 8, name: 'Spinach', price: 70 }, { id: 9, name: 'Fenugreek', price: 65 },
        { id: 10, name: 'Mint', price: 60 }
      ];
    }
  
    else if (state === 'Tripura' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 150 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Tomato', price: 70 },
        { id: 4, name: 'Brinjal', price: 60 }, { id: 5, name: 'Pumpkin', price: 80 }, { id: 6, name: 'Cucumber', price: 55 },
        { id: 7, name: 'Okra', price: 65 }, { id: 8, name: 'Papaya', price: 85 }, { id: 9, name: 'Chili', price: 75 },
        { id: 10, name: 'Watermelon', price: 110 }
      ];
    } else if (state === 'Tripura' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 80 }, { id: 2, name: 'Cauliflower', price: 75 }, { id: 3, name: 'Cabbage', price: 70 },
        { id: 4, name: 'Spinach', price: 55 }, { id: 5, name: 'Onion', price: 85 }, { id: 6, name: 'Radish', price: 60 },
        { id: 7, name: 'Beetroot', price: 65 }, { id: 8, name: 'Garlic', price: 90 }, { id: 9, name: 'Peas', price: 75 },
        { id: 10, name: 'Mustard', price: 95 }
      ];
    } else if (state === 'Tripura' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Turmeric', price: 120 }, { id: 5, name: 'Pigeon Pea', price: 95 }, { id: 6, name: 'Ginger', price: 110 },
        { id: 7, name: 'Black Gram', price: 90 }, { id: 8, name: 'Groundnut', price: 95 }, { id: 9, name: 'Green Gram', price: 95 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    }
    else if (state === 'Uttar Pradesh' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Wheat', price: 100 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Tomato', price: 70 },
        { id: 4, name: 'Brinjal', price: 60 }, { id: 5, name: 'Pumpkin', price: 80 }, { id: 6, name: 'Cucumber', price: 55 },
        { id: 7, name: 'Okra', price: 65 }, { id: 8, name: 'Papaya', price: 85 }, { id: 9, name: 'Chili', price: 75 },
        { id: 10, name: 'Watermelon', price: 110 }
      ];
    } else if (state === 'Uttar Pradesh' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Potato', price: 70 }, { id: 2, name: 'Cauliflower', price: 75 }, { id: 3, name: 'Cabbage', price: 70 },
        { id: 4, name: 'Spinach', price: 55 }, { id: 5, name: 'Onion', price: 85 }, { id: 6, name: 'Radish', price: 60 },
        { id: 7, name: 'Beetroot', price: 65 }, { id: 8, name: 'Garlic', price: 90 }, { id: 9, name: 'Peas', price: 75 },
        { id: 10, name: 'Mustard', price: 95 }
      ];
    } else if (state === 'Uttar Pradesh' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Turmeric', price: 120 }, { id: 5, name: 'Pigeon Pea', price: 95 }, { id: 6, name: 'Ginger', price: 110 },
        { id: 7, name: 'Black Gram', price: 90 }, { id: 8, name: 'Groundnut', price: 95 }, { id: 9, name: 'Green Gram', price: 95 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    }
    else if (state === 'Uttarakhand' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Apple', price: 120 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Tomato', price: 70 },
        { id: 4, name: 'Brinjal', price: 60 }, { id: 5, name: 'Pumpkin', price: 80 }, { id: 6, name: 'Cucumber', price: 55 },
        { id: 7, name: 'Okra', price: 65 }, { id: 8, name: 'Papaya', price: 85 }, { id: 9, name: 'Chili', price: 75 },
        { id: 10, name: 'Watermelon', price: 110 }
      ];
    } else if (state === 'Uttarakhand' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Carrot', price: 70 }, { id: 2, name: 'Cauliflower', price: 75 }, { id: 3, name: 'Cabbage', price: 70 },
        { id: 4, name: 'Spinach', price: 55 }, { id: 5, name: 'Onion', price: 85 }, { id: 6, name: 'Radish', price: 60 },
        { id: 7, name: 'Beetroot', price: 65 }, { id: 8, name: 'Garlic', price: 90 }, { id: 9, name: 'Peas', price: 75 },
        { id: 10, name: 'Mustard', price: 95 }
      ];
    } else if (state === 'Uttarakhand' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Turmeric', price: 120 }, { id: 5, name: 'Pigeon Pea', price: 95 }, { id: 6, name: 'Ginger', price: 110 },
        { id: 7, name: 'Black Gram', price: 90 }, { id: 8, name: 'Groundnut', price: 95 }, { id: 9, name: 'Green Gram', price: 95 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    }
    else if (state === 'West Bengal' && season === 'Summer') {
      crops = [
        { id: 1, name: 'Mango', price: 150 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Tomato', price: 70 },
        { id: 4, name: 'Brinjal', price: 60 }, { id: 5, name: 'Pumpkin', price: 80 }, { id: 6, name: 'Cucumber', price: 55 },
        { id: 7, name: 'Okra', price: 65 }, { id: 8, name: 'Papaya', price: 85 }, { id: 9, name: 'Chili', price: 75 },
        { id: 10, name: 'Watermelon', price: 110 }
      ];
    } else if (state === 'West Bengal' && season === 'Winter') {
      crops = [
        { id: 1, name: 'Potato', price: 80 }, { id: 2, name: 'Cauliflower', price: 75 }, { id: 3, name: 'Cabbage', price: 70 },
        { id: 4, name: 'Spinach', price: 55 }, { id: 5, name: 'Onion', price: 85 }, { id: 6, name: 'Radish', price: 60 },
        { id: 7, name: 'Beetroot', price: 65 }, { id: 8, name: 'Garlic', price: 90 }, { id: 9, name: 'Peas', price: 75 },
        { id: 10, name: 'Mustard', price: 95 }
      ];
    } else if (state === 'West Bengal' && season === 'Monsoon') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Turmeric', price: 120 }, { id: 5, name: 'Pigeon Pea', price: 95 }, { id: 6, name: 'Ginger', price: 110 },
        { id: 7, name: 'Black Gram', price: 90 }, { id: 8, name: 'Groundnut', price: 95 }, { id: 9, name: 'Green Gram', price: 95 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    }
    else if (state === 'Tripura' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Turmeric', price: 120 }, { id: 3, name: 'Sweet Potato', price: 70 },
        { id: 4, name: 'Black Gram', price: 90 }, { id: 5, name: 'Groundnut', price: 95 }, { id: 6, name: 'Green Gram', price: 95 },
        { id: 7, name: 'Mustard', price: 95 }, { id: 8, name: 'Sesame', price: 105 }, { id: 9, name: 'Amaranth', price: 85 },
        { id: 10, name: 'Carrot', price: 75 }
      ];
    } else if (state === 'Tripura' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Pineapple', price: 130 }, { id: 2, name: 'Guava', price: 90 }, { id: 3, name: 'Papaya', price: 85 },
        { id: 4, name: 'Cucumber', price: 55 }, { id: 5, name: 'Tomato', price: 70 }, { id: 6, name: 'Chili', price: 75 },
        { id: 7, name: 'Bitter Gourd', price: 65 }, { id: 8, name: 'Spinach', price: 55 }, { id: 9, name: 'Cabbage', price: 70 },
        { id: 10, name: 'Brinjal', price: 60 }
      ];
    }
    else if (state === 'Uttar Pradesh' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Wheat', price: 100 }, { id: 2, name: 'Rice', price: 90 }, { id: 3, name: 'Maize', price: 85 },
        { id: 4, name: 'Mustard', price: 95 }, { id: 5, name: 'Sugarcane', price: 110 }, { id: 6, name: 'Barley', price: 75 },
        { id: 7, name: 'Soybean', price: 105 }, { id: 8, name: 'Black Gram', price: 90 }, { id: 9, name: 'Green Gram', price: 95 },
        { id: 10, name: 'Sesame', price: 105 }
      ];
    } else if (state === 'Uttar Pradesh' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Potato', price: 70 }, { id: 2, name: 'Tomato', price: 70 }, { id: 3, name: 'Cauliflower', price: 75 },
        { id: 4, name: 'Radish', price: 60 }, { id: 5, name: 'Peas', price: 75 }, { id: 6, name: 'Brinjal', price: 60 },
        { id: 7, name: 'Carrot', price: 75 }, { id: 8, name: 'Cucumber', price: 55 }, { id: 9, name: 'Spinach', price: 55 },
        { id: 10, name: 'Onion', price: 85 }
      ];
    }
    else if (state === 'Uttarakhand' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Maize', price: 85 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Black Gram', price: 90 }, { id: 5, name: 'Groundnut', price: 95 }, { id: 6, name: 'Green Gram', price: 95 },
        { id: 7, name: 'Mustard', price: 95 }, { id: 8, name: 'Sesame', price: 105 }, { id: 9, name: 'Turmeric', price: 120 },
        { id: 10, name: 'Ginger', price: 110 }
      ];
    } else if (state === 'Uttarakhand' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Apple', price: 120 }, { id: 2, name: 'Peas', price: 75 }, { id: 3, name: 'Potato', price: 70 },
        { id: 4, name: 'Radish', price: 60 }, { id: 5, name: 'Tomato', price: 70 }, { id: 6, name: 'Cauliflower', price: 75 },
        { id: 7, name: 'Cabbage', price: 70 }, { id: 8, name: 'Brinjal', price: 60 }, { id: 9, name: 'Spinach', price: 55 },
        { id: 10, name: 'Carrot', price: 75 }
      ];
    }
    else if (state === 'West Bengal' && season === 'Autumn') {
      crops = [
        { id: 1, name: 'Rice', price: 95 }, { id: 2, name: 'Sugarcane', price: 110 }, { id: 3, name: 'Soybean', price: 105 },
        { id: 4, name: 'Black Gram', price: 90 }, { id: 5, name: 'Green Gram', price: 95 }, { id: 6, name: 'Groundnut', price: 95 },
        { id: 7, name: 'Turmeric', price: 120 }, { id: 8, name: 'Sesame', price: 105 }, { id: 9, name: 'Mustard', price: 95 },
        { id: 10, name: 'Amaranth', price: 85 }
      ];
    } else if (state === 'West Bengal' && season === 'Spring') {
      crops = [
        { id: 1, name: 'Mango', price: 150 }, { id: 2, name: 'Jackfruit', price: 130 }, { id: 3, name: 'Tomato', price: 70 },
        { id: 4, name: 'Brinjal', price: 60 }, { id: 5, name: 'Cucumber', price: 55 }, { id: 6, name: 'Pumpkin', price: 80 },
        { id: 7, name: 'Papaya', price: 85 }, { id: 8, name: 'Radish', price: 60 }, { id: 9, name: 'Carrot', price: 75 },
        { id: 10, name: 'Onion', price: 85 }
      ];
    }
                                
                
    
    
    
    else {
      return res.status(404).json({ message: 'No crops found for this state and season' });
    }

    return res.status(200).json(crops);
  } catch (error) {
    return next(error);
  }
};

module.exports = getCropsByStateSeason;
