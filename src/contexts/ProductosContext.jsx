import React, { createContext, useState, useEffect } from "react";

export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = "https://68f40491b16eb6f46833b3c0.mockapi.io/api/productos";

  //  Leer productos
    const obtenerProductos = async () => {
        setCargando(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Error al obtener productos");
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

  //  Crear producto
    const agregarProducto = async (nuevoProducto) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });
            if (!res.ok) throw new Error("Error al crear producto");
            const data = await res.json();
            setProductos([...productos, data]);
        } catch (err) {
            setError(err.message);
        }
    };

  //  Editar producto
    const editarProducto = async (id, productoActualizado) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoActualizado),
            });
            if (!res.ok) throw new Error("Error al editar producto");
            const data = await res.json();
            setProductos(productos.map(p => (p.id === id ? data : p)));
        } catch (err) {
            setError(err.message);
        }
    };

  //  Eliminar producto
    const eliminarProducto = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error al eliminar producto");
            setProductos(productos.filter(p => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <ProductosContext.Provider
            value={{
                productos,
                cargando,
                error,
                agregarProducto,
                editarProducto,
                eliminarProducto,
                obtenerProductos,
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
}
