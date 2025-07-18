import { createContext, useContext, useReducer } from 'react';

const InventoryContext = createContext();

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return { ...state, inventory: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, inventory: [...state.inventory, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        inventory: state.inventory.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        inventory: state.inventory.filter(p => p.id !== action.payload)
      };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    inventory: [],
    darkMode: false,
    currentView: 'cards'
  });

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => useContext(InventoryContext);