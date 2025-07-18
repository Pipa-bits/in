import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchInventory = async () => {
  try {
    const response = await API.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const saveInventory = async (inventory) => {
  try {
    // Simulamos una llamada a la API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 500);
    });
  } catch (error) {
    console.error('Error saving inventory:', error);
    throw error;
  }
};