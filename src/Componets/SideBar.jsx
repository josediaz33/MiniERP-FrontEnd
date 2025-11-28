import React from 'react'

import { Link } from 'react-router-dom'

export const SideBar = () => {
    return (

        <div className="w-64 h-screen bg-sky-600 text-white flex flex-col">
            <div className='flex flex-col items-center'>
                <h1 className='text-[100px] text-center p-4'>

                </h1>
            </div>
            <div>

               
                <Link to="productos">
                    <button className='bg-sky-600 w-64 p-4 flex flex-row items-center justify-center text-[20px] hover:bg-sky-500'>
                        Productos
                    </button>
                </Link>
                <Link to="ventas">
                    <button className='bg-sky-600 w-64 p-4 flex flex-row items-center justify-center text-[20px] hover:bg-sky-500'>
                        Ventas
                    </button>
                </Link>
            </div>
        </div>
    )

}
