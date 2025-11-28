import { useState } from 'react'
import './App.css'
import { Home } from './Pages/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Productos } from './Pages/Productos.jsx';

function App() {
  const [count, setCount] = useState(0)
  const rutas = createBrowserRouter([
    {
      path: '/', element: <Home />,
      children: [
        { path: 'productos', element: <Productos /> }

      ]
    }
  ]);


  return (
    <>
      <RouterProvider router={rutas} />
    </>
  )
}

export default App
