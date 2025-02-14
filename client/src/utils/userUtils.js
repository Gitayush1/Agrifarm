// utils/userUtils.js

import axios from 'axios'; // Ensure you have axios installed, or you can use fetch

// Function to get user profile image from MongoDB (or fallback to default image)
export const getUserProfile = async (email) => {
  try {
    // Assuming you have an endpoint like '/api/users/profile-image' to fetch the image
    const response = await axios.get(`/api/users/profile-image?email=${email}`);

    // If the response contains the profile image, return it
    if (response.data && response.data.profileImage) {
      return response.data.profileImage;
    }

    // If no profile image, return null or a default image
    return null; // Or a default image URL
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null; // Return null in case of error
  }
};
