import React, { useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContext";
import { CarritoContext } from "../contexts/CarritoContext";

const Productos = () => {
  const { productos, cargando, error } = useContext(ProductosContext);
  const { agregarProducto } = useContext(CarritoContext);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos disponibles</h2>

      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              width: "200px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ 
                width: "100%", 
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{producto.nombre}</h3>
            <p style={{ fontWeight: "bold" }}>${Number(producto.precio)}</p>
            <p style={{ fontSize: "0.9em", color: "#666" }}>
              {producto.descripcion?.slice(0, 60)}...
            </p>
            <button 
              onClick={() => agregarProducto(producto)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#1203f9",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
