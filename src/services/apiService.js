// src/services/apiService.js
import axios from 'axios';

// Example API base URL
const API_BASE_URL = 'https://api.spacexdata.com/v3/launches';

// Function to get data from an API endpoint
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
