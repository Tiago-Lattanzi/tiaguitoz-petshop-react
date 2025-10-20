import React, { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext";

const Productos = () => {
  const { agregarProducto } = useContext(CarritoContext);

  const productos = [
    {
      id: 1,
      nombre: "Alimento para perros",
      precio: 2500,
      imagen: "https://via.placeholder.com/150x100?text=Perro",
    },
    {
      id: 2,
      nombre: "Alimento para gatos",
      precio: 1800,
      imagen: "https://via.placeholder.com/150x100?text=Gato",
    },
    {
      id: 3,
      nombre: "Snacks para mascotas",
      precio: 900,
      imagen: "https://via.placeholder.com/150x100?text=Snacks",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos disponibles</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ width: "150px", height: "100px" }}
            />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button onClick={() => agregarProducto(producto)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
