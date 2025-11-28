import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  return (
    // AuthProvider envuelve toda la app para compartir el contexto
    <AuthProvider>
      {/* BrowserRouter habilita la navegación */}
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas privadas: con Layout (Sidebar) */}
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <Layout>
                  <Products />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Redirección: cualquier otra ruta va a /productos */}
          <Route path="*" element={<Navigate to="/productos" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;