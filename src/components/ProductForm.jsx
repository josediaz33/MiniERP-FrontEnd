//{"id":"88123","variant":"standard","title":"ProductForm completo para crear producto"}
import React, { useState } from 'react';
import api from '../services/api';

export const ProductForm = ({ open, onClose, actualizarLista }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('1'); // categoría por defecto
    const [price, setPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [minStockLevel, setMinStockLevel] = useState('');
    const [maxStockLevel, setMaxStockLevel] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!open) return null;

    const guardarProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            const payload = {
                name,
                description,
                sku,
                category: parseInt(category),
                price: parseFloat(price),
                cost_price: parseFloat(costPrice),
                stock_quantity: parseInt(stockQuantity),
                min_stock_level: parseInt(minStockLevel),
                max_stock_level: parseInt(maxStockLevel)
            };
            const response = await api.post('/inventory/products/', payload);
            console.log('Producto creado:', response.data);

            // Limpiar formulario
            setName('');
            setDescription('');
            setSku('');
            setCategory('1');
            setPrice('');
            setCostPrice('');
            setStockQuantity('');
            setMinStockLevel('');
            setMaxStockLevel('');

            if (actualizarLista) actualizarLista();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Error al crear el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='z-30 bg-black/75 w-full h-full fixed top-0 left-0 flex items-center justify-center'>
            <div className='z-40 bg-white p-6 rounded-lg shadow-lg w-96 space-y-4'>
                <h2 className="text-xl font-bold text-gray-700">Agregar Producto</h2>

                {error && <p className="text-red-600">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full border px-3 py-2 rounded"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                />

                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="category"
                    placeholder="Categoría (ID)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Precio de venta"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="cost_price"
                    placeholder="Precio costo"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="number"
                    name="stock_quantity"
                    placeholder="Cantidad en stock"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="number"
                    name="min_stock_level"
                    placeholder="Stock mínimo"
                    value={minStockLevel}
                    onChange={(e) => setMinStockLevel(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="number"
                    name="max_stock_level"
                    placeholder="Stock máximo"
                    value={maxStockLevel}
                    onChange={(e) => setMaxStockLevel(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />

                <p className='flex justify-end'>
                    <button onClick={onClose} type="button" className="bg-gray-600 text-white px-4 py-2 mr-6 rounded hover:bg-gray-700">
                        Cancelar
                    </button>

                    <button onClick={() => {
                        guardarProductos();

                    }
                    } type="button" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {loading ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </p>
            </div>
        </div>
    );
};
