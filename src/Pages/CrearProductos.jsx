import React, { useState } from 'react'

export const CrearProductos = ({open, onClose}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');

    if (!open) return null
    return (
        <div className='z-30 bg-black/75 w-full h-full fixed top-0 left-0 flex items-center justify-center'>
            <div className='z-40 bg-white p-6 rounded-lg shadow-lg w-96 space-y-4'>
                <h2 className="text-xl font-bold text-gray-700">Agregar Producto</h2>

                <input type="text" name="nombre" placeholder="Nombre"

                    className="w-full border px-3 py-2 rounded"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                />

                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />


                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />


                <p className='flex justify-end'>
                    <button onClick={onClose} type="submit" className="bg-gray-600 text-white px-4 py-2 mr-6 rounded hover:bg-gray-700">
                        Cancelar
                    </button>

                    <button onClick={() => {
                        guardarProductos()
                    }} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Guardar Producto
                    </button>
                </p>

            </div>
        </div >
    )
}
