import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../Componets/SideBar'

export const Home = () => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex justify-center m-8 p-10 w-full'><Outlet /></div>
        </div>
    )
}
