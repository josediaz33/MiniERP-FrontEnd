//Configuración de Axios
//¿Qué hace? Centraliza todas las peticiones HTTP a tu backend.
// Este archivo configura axios para comunicarse con la API
import axios from 'axios';

const API_URL = 'https://minierp.rbnetto.dev/api';

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: agrega el token automáticamente a cada petición
api.interceptors.request.use( //middleware que modifica las peticiones automáticamente
    (config) => {
        const token = localStorage.getItem('access_token'); //almacenamos el token en nuestro nav
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta: maneja errores globalmente
api.interceptors.response.use(
  (response) => response, // Si todo OK, devuelve la respuesta
  (error) => {
    // Si el token expiró (401), redirigir a login
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default api;