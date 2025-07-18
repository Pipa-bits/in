import { useEffect } from 'react';
import axios from 'axios';
import { useInventoryContext } from '../context/InventoryContext';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const useInventory = () => {
  const { state, dispatch } = useInventoryContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem('inventory_app_data');
        if (savedData) {
          dispatch({ type: 'SET_INVENTORY', payload: JSON.parse(savedData) });
          return;
        }

        const response = await axios.get(API_URL);
        const sampleData = [
          { id: 1, name: 'Smartphone X', category: 'electronica', price: 599.99, quantity: 15, location: 'Zona A, Estante 2', barcode: '7222380' },
          { id: 2, name: 'Camiseta deportiva', category: 'ropa', price: 24.99, quantity: 30, location: 'Zona B, Estante 3', barcode: '7212480' },
          { id: 3, name: 'Arroz integral', category: 'alimentos', price: 3.49, quantity: 50, location: 'Zona C, Estante 1', barcode: '7213650' },
          { id: 4, name: 'Sofá de tela', category: 'hogar', price: 299.99, quantity: 5, location: 'Zona D, Estante 1', barcode: '7223460' }
        ];
        dispatch({ type: 'SET_INVENTORY', payload: sampleData });
        localStorage.setItem('inventory_app_data', JSON.stringify(sampleData));
      } catch (error) {
        console.error('Error loading inventory:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Guardar en localStorage cuando cambia el inventario
  useEffect(() => {
    if (state.inventory.length > 0) {
      localStorage.setItem('inventory_app_data', JSON.stringify(state.inventory));
    }
  }, [state.inventory]);

  return { state, dispatch };
};