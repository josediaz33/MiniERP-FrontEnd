//Protección de rutas
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que protege rutas privadas
function PrivateRoute({ children }) {
  // Obtener datos del contexto
  const { user, loading } = useAuth();

  // Caso 1: Aún está verificando si hay usuario (cargando token)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Caso 2: No hay usuario → Redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Caso 3: Hay usuario → Mostrar el contenido
  return children;
}

export default PrivateRoute;