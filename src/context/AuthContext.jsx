import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// 1. Crear el contexto (almacén global de datos)
const AuthContext = createContext();

// 2. Provider: componente que provee los datos a toda la app
export function AuthProvider({ children }) {
  // Estado del usuario (null = no logueado)
  const [user, setUser] = useState(null);
  
  // Estado de carga (para mostrar loading mientras verificamos el token)
  const [loading, setLoading] = useState(true);

  // 3. Al montar el componente, verificar si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      // Si hay token, obtener datos del usuario
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Función para obtener perfil del usuario
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/users/profile/');
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      localStorage.removeItem('access_token');
    } finally {
      setLoading(false);
    }
  };

  // 4. Función de login
  const login = async (email, password) => {
    try {
      // Hacer POST a /login/
      const response = await api.post('/users/users/login/', {
        email,
        password,
      });

      // Extraer token de la respuesta
      const { access_token, user } = response.data;

      // Guardar token en localStorage
      localStorage.setItem('access_token', access_token);

      // Actualizar estado del usuario
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error('Error en login:', error);
      
      // Manejar errores
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      return { success: false, message };
    }
  };

  // 5. Función de logout
  const logout = () => {
    // Limpiar token
    localStorage.removeItem('access_token');
    
    // Limpiar usuario
    setUser(null);
  };

  // 6. Proveer datos y funciones a toda la app
  return (
    <AuthContext.Provider 
      value={{ 
        user,        // Usuario actual
        login,       // Función para loguearse
        logout,      // Función para desloguearse
        loading,     // Estado de carga
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 7. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
};