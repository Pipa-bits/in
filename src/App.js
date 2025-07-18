import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import InventoryApp from './InventoryApp';
import { useState } from 'react';
import './App.css';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            showRegister ? (
              <RegisterForm 
                onSwitchToLogin={() => setShowRegister(false)} 
                onRegisterSuccess={() => setShowRegister(false)}
              />
            ) : (
              <LoginForm 
                onSwitchToRegister={() => setShowRegister(true)} 
              />
            )
          } />
          <Route path="/" element={
            <PrivateRoute>
              <InventoryApp />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;