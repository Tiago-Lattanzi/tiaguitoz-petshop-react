import React, { useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContext";
import FormularioProducto from "../components/FormularioProducto";

function AdminProductos() {
  const { productos, cargando, error } = useContext(ProductosContext);

  return (
    <div style={{ padding: "20px" }}>
      <FormularioProducto />

      <h2>Lista de productos</h2>
      {cargando && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProductos;