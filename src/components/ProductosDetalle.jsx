import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductosContext } from "../contexts/ProductosContext";
import { CarritoContext } from "../contexts/CarritoContext";

const ProductoDetalle = () => {
    const { id } = useParams();
    const { productos } = useContext(ProductosContext);
    const { agregarProducto } = useContext(CarritoContext);

    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const encontrado = productos.find((p) => p.id === id);
        setProducto(encontrado);
    }, [id, productos]);

    if (!producto) return <p style={{ padding: "20px" }}>Cargando producto...</p>;

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: "250px", height: "200px", borderRadius: "10px", objectFit: "cover" }}
            />
            <h2>{producto.nombre}</h2>
            <p style={{ fontSize: "18px", color: "#444" }}>{producto.descripcion}</p>
            <h3>${producto.precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</h3>
            <button onClick={() => agregarProducto(producto)} style={{background: "#1203f9ff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px", padding: "8px 12px" }} >Agregar al carrito</button>
        </div>
    );
};

export default ProductoDetalle;