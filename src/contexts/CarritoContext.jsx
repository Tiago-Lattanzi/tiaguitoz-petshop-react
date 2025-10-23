import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Cargar carrito desde localStorage
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Guardar carrito en localStorage
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

  //  Agregar producto al carrito
    const agregarProducto = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((p) => p.id === producto.id);

            if (productoExistente) {
                // si ya existe, aumenta la cantidad
                const carritoActualizado = prevCarrito.map((p) =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1} : p
                );
                toast.info(`Se agregó otro ${producto.nombre}`);
                return carritoActualizado;
            } else {
                // si no existe, lo agrega con cantidad 1
                toast.success(`${producto.nombre} agregado al carrito`);
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };

    // Aumentar cantidad
    const aumentarCantidad = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((p) =>
                p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    };

    // Disminuir cantidad
    const disminuirCantidad = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito
                .map((p) =>
                    p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
                )
                .filter((p) => p.cantidad > 0)
        );
    };

  //  Eliminar producto
    const eliminarProducto = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((p) => p.id !== id));
        toast.error("Producto eliminado del carrito");
    };

  //  Vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
        toast.warn("Carrito vaciado")
    };

    // Calcular total
    const total = parseFloat(
        carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0).toFixed(2)
    );

    // Calcular cantidad total de productos (para el contador del header)
    const cantidadTotal = carrito.reduce(
        (acc, producto) => acc + producto.cantidad,
        0
    );

    return (
        <CarritoContext.Provider
            value={{ 
                carrito, 
                agregarProducto, 
                eliminarProducto, 
                vaciarCarrito,
                aumentarCantidad,
                disminuirCantidad,
                total,
                cantidadTotal,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}