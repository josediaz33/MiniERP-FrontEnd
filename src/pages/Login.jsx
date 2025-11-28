//Pantalla de login


/*
Crear formulario con email y password
Al hacer submit, llamar a login() del contexto
Si es exitoso, redirigir a /products
Mostrar errores si falla

Elementos HTML necesarios:

<form> con onSubmit
<input type="email">
<input type="password">
<button type="submit">*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    // Hook de navegación para redirigir después del login
    const navigate = useNavigate();

    // Obtener función login del contexto
    const { login } = useAuth();

    // Estados del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Manejar submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga de página

        setError(''); // Limpiar errores previos
        setLoading(true); // Mostrar loading

        // Llamar a función login del contexto
        const result = await login(email, password);

        if (result.success) {
            // Si login exitoso, redirigir a productos
            navigate('/products');
        } else {
            // Si falló, mostrar error
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                {/* Logo/Título */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Mini ERP
                    </h1>
                    <p className="text-gray-600">
                        Ingresa tus credenciales para continuar
                    </p>
                </div>

                {/* Mostrar error si existe */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="admin@minierp.com"
                        />
                    </div>

                    {/* Campo Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Botón Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* Credenciales de prueba */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center mb-2">
                        <strong>Credenciales de prueba:</strong>
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                        Email: admin@minierp.com<br />
                        Password: test123456
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;