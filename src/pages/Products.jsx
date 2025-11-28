//Lista de productos

/*Tareas que debes hacer:

Obtener lista de productos con api.get('/inventory/products/')
Mostrar en tabla o cards
Botones para: Crear, Editar, Eliminar
Formulario modal para crear/editar
*/

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Products() {
    // Obtener usuario del contexto (opcional, solo para mostrar info)
    const { user } = useAuth();

    // Estados locales de esta página
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar productos cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, []); // [] = solo ejecutar una vez al montar

    // Función para obtener productos de la API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/inventory/products/');
            setProducts(response.data.results || response.data);
        } catch (err) {
            setError('Error al cargar productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Mientras carga, mostrar mensaje
    if (loading) {
        return (
            <div className="flex-1 p-8">
                <p className="text-gray-600">Cargando productos...</p>
            </div>
        );
    }

    // Si hay error, mostrar mensaje
    if (error) {
        return (
            <div className="flex-1 p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    // Renderizar lista de productos
    return (
        <div className="flex-1 p-8 bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-sky-600 text-[30px]'>Productos</h1>
                    <button onClick={() => { setOpenModal(true) }} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition">Nuevo Producto</button>
                </div>

              

                {/* Tabla de productos */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SKU
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No hay productos disponibles
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.sku}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.stock_quantity}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Products;