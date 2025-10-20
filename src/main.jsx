import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CarritoProvider } from './contexts/CarritoContext.jsx'
import { ProductosProvider } from './contexts/ProductosContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <CarritoProvider>
            <ProductosProvider>
                <App />
            </ProductosProvider>
        </CarritoProvider>
    </AuthProvider>
)
