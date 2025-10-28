import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext'
import Header from './components/header'
import Login from './components/Login'
import Carrito from './components/Carrito';
import Productos from './components/Productos';
import ProductoDetalle from './components/ProductosDetalle';
import RutaProtegida from './routes/RutaProtegida';
import { CarritoContext } from './contexts/CarritoContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProductos from './components/AdminProductos';


function App() {
  const { usuario, estaAutenticado } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* Mostrar Header siempre, con el nombre actual */}
      <Header nombreUsuario={usuario?.nombre || "Anónimo"} />
      
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida */}
        <Route path="/carrito" element={<Carrito />} />

        {/* Rutas publicas */}
        <Route
          path="/"
          element={<h2 style={{ textAlign: "center" }}>Página de Inicio 🏠</h2>}
        />

        <Route path="/productos" element={<Productos />} />

        <Route path="/producto/:id" element={<ProductoDetalle />} />

        {/* <Route path='/adminproductos' element={<AdminProductos />} /> */}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
