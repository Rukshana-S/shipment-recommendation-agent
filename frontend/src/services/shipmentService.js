import axios from 'axios';

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'https://shipment-recommendation-agent.onrender.com';
  // If Vite's config didn't inject anything and it's local development, fallback to localhost
  if (!import.meta.env.VITE_API_URL && window.location.hostname === 'localhost') {
    url = 'http://localhost:8000';
  }
  
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();
const API_URL = `${API_BASE_URL}/api/shipments`;

export const fetchSources = async () => {
  const response = await axios.get(`${API_URL}/sources`);
  return response.data;
};

export const fetchDestinations = async () => {
  const response = await axios.get(`${API_URL}/destinations`);
  return response.data;
};

export const fetchShipments = async (source, destination) => {
  const response = await axios.post(`${API_URL}/recommend`, {
    source,
    destination
  });
  return response.data;
};

export const acceptShipment = async (shipmentId, recommendationData = {}) => {
  const response = await axios.put(`${API_URL}/${shipmentId}/accept`, recommendationData);
  return response.data;
};
