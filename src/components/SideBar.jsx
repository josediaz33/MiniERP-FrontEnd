import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const SideBar = () => {
    // Obtener datos del contexto
    const { user, logout } = useAuth()
    // Hook para navegar programáticamente
    const navigate = useNavigate()

    // Handler: función que maneja el evento de logout
    const handleLogout = () => {
        logout();           // 1. Limpia el token y el usuario
        navigate('/login'); // 2. Redirige a la página de login
    };

    return (

        <div className="w-64 h-screen bg-sky-600 text-white flex flex-col">
            {/* Header con título y usuario */}
            <div className='flex flex-col items-center'>
                <h1 className='text-[100px] text-center p-4'>

                </h1>
                {user && (
                    <p className='text-sm pb-4'>
                        Bienvenido: {user.nombre || user.email}
                    </p>
                )}
            </div>
            {/* Menú de navegación */}
            <div>
                {/* Link: navega sin recargar la página */}
                <Link to="productos">
                    <button className='bg-sky-600 w-64 p-4 flex flex-row items-center justify-center text-[20px] hover:bg-sky-500'>
                        Productos
                    </button>
                </Link>
            </div>
            {/* Botón de logout */}
            <div className='border-t border-sky-500 p-4'>
                <button
                    onClick={handleLogout}
                    className='bg-red-600 w-full p-3 rounded text-white hover:bg-red-700 transition'
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )

}