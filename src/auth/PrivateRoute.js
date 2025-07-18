import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};