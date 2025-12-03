import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductosContext } from "../contexts/ProductosContext";
import { CarritoContext } from "../contexts/CarritoContext";
import { Link } from "react-router-dom";
import "../styles/estilos-globales.css"

const Productos = () => {
  const { productos, cargando, error } = useContext(ProductosContext);
  const { agregarProducto } = useContext(CarritoContext);

  // Animación
  const [animando, setAnimando] = useState(false);

  //  Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(() => {
    const guardada = localStorage.getItem("paginaActual");
    return guardada ? parseInt(guardada, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem("paginaActual", paginaActual);
  }, [paginaActual]);

  // Para ejecutar la restauración del scroll **una sola vez** al montar,
  // y solo después de que los productos estén disponibles.
  const restoredScrollRef = useRef(false);
  useEffect(() => {
    if (!restoredScrollRef.current && productos.length > 0) {
      const scrollGuardado = sessionStorage.getItem("scrollProductos");
      if (scrollGuardado) {
        // restauramos la posición guardada (esto ocurre normalmente tras un refresh)
        window.scrollTo({ top: parseInt(scrollGuardado, 10), behavior: "instant" });
      }
      restoredScrollRef.current = true;
    }
  }, [productos]);

  // Guardar scroll al cerrar / recargar la pestaña
  useEffect(() => {
    const guardarScroll = () => {
      sessionStorage.setItem("scrollProductos", String(window.scrollY));
    };
    window.addEventListener("beforeunload", guardarScroll);
    return () => window.removeEventListener("beforeunload", guardarScroll);
  }, []);

  // Al cambiar de página, hacer scroll arriba (considerando header sticky)
  useEffect(() => {
    // Dejamos un pequeño timeout para asegurar que el DOM (tarjetas/imágenes) ya esté renderizado.
    // 50ms suele ser suficiente; no abuses de tiempos largos.
    const id = setTimeout(() => {
      const header = document.querySelector("header");
      const headerOffset = header ? header.offsetHeight : 0;
      window.scrollTo({ top: headerOffset, behavior: "smooth" });
    }, 60);
    return () => clearTimeout(id);
  }, [paginaActual]);

  // función para cambiar pagina con animación
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina === paginaActual) return;
    setAnimando(true);
    setTimeout(() => {
      setPaginaActual(nuevaPagina);
      setAnimando(false);
    }, 300);
};

  //  Cantidad de productos por página
const productosPorPagina = 5;

  //  Cálculos de paginación
  const indiceFinal = paginaActual * productosPorPagina;
  const indiceInicial = indiceFinal - productosPorPagina;
  const productosActuales = productos.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos disponibles</h2>

      <div 
        className={`productos-contenedor ${animando ? "oculto" : ""}`}
      >
        {productosActuales.map((producto) => (
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
            <Link to={`/producto/${producto.id}`} style={{ display: "block", marginTop: "8px", color: "#1203f9", textDecoration: "none"}}>
              Ver más
            </Link>
          </div>
        ))}
      </div>

      {/*  Paginación */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => cambiarPagina(index + 1)}
            style={{
              margin: "0 5px",
              padding: "6px 10px",
              border: "1px solid #1203f9",
              background: paginaActual === index + 1 ? "#1203f9" : "#fff",
              color: paginaActual === index + 1 ? "#fff" : "#1203f9",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productos;