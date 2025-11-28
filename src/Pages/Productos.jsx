import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { CrearProductos } from './CrearProductos';
export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MzQ3NDE1LCJpYXQiOjE3NjQzNDM4MTUsImp0aSI6IjYyZjBkMGNlMWEzZDRhMWM4NzE5ODU3OTI0YWZiMjg0IiwidXNlcl9pZCI6MX0.B-qC6vIt1oV7i8pBHdPEHYCjc1IcC-Q2WNG7kQlJMF4'


    /*  useEffect(() => {
          axios.get('https://minierp.rbnetto.dev/api/inventory/products/', {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${TOKEN}`
              }
          })
              .then(response => {
                  console.log(response.data.results);
                  setProductos(response.data.results);
              }).catch(error => {
                  console.error('Error fetching products:', error);
              });
      }, []);
  */
    const columns = [
        {
            name: 'Id', selector: row => row.id, sortable: true,
        },
        {
            name: 'Nombre', selector: row => row.name, sortable: true,
        },
        {
            name: 'Descripcion', selector: row => row.description, sortable: true,
        },
        {
            name: 'Precio', selector: row => row.price, sortable: true,
        },
        {
            name: 'Cantidad', selector: row => row.stock_quantity, sortable: true,
        },
    ];
    const data = [
        { name: "Perfume A", description: "Fragancia", price: 25000, stock_quantity: 10 },
        { name: "Perfume B", description: "Fragancia", price: 35000, stock_quantity: 5 },
        { name: "Loción C", description: "Cuidado personal", price: 18000, stock_quantity: 20 },
    ];


    return (
        <div className='w-full'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-sky-600 text-[30px]'>Productos</h1>
                <button onClick={() => { setOpenModal(true) }} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition">Nuevo Producto</button>

            </div>

            <div className='p-[10px] shadow-xl/20 '>
                <DataTable columns={columns} data={data} highlightOnHover />
            </div>
            {openModal && <CrearProductos open={openModal} onClose={() => setOpenModal(false) } />}
        </div>                                            
    )
}
