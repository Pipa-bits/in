import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('inventory_app_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('inventory_app_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userData } = foundUser;
      setUser(userData);
      localStorage.setItem('inventory_app_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem('inventory_app_users') || '[]');
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'El usuario ya existe' };
    }
    
    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('inventory_app_users', JSON.stringify([...users, newUser]));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inventory_app_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};