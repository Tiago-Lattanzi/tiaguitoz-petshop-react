import React, { useState, useContext, useEffect, useRef } from "react";
import { ProductosContext } from "../contexts/ProductosContext";
import { useNavigate } from "react-router-dom";
import "../styles/buscador.css";

function Buscador() {
    const { productos } = useContext(ProductosContext);
    const [texto, setTexto] = useState("");
    const [sugerencias, setSugerencias] = useState([]);
    const [visible, setVisible] = useState(false);
    const [indiceSeleccionado, setIndiceSeleccionado] = useState(-1);

    const contenedorRef = useRef(null);
    const itemsRef = useRef([]);
    const navigate = useNavigate();

     // 🔵 Función para resaltar coincidencias
    const resaltarCoincidencia = (nombre, busqueda) => {
        if (!busqueda) return nombre;

        const regex = new RegExp(`(${busqueda})`, "gi");
        return nombre.replace(regex, "<mark>$1</mark>");
    };

    // Filtrar sugerencias
    useEffect(() => {
        if (texto.trim().length === 0) {
            setSugerencias([]);
            setIndiceSeleccionado(-1);
            return;
        }

        const filtrados = productos.filter((p) =>
            p.nombre.toLowerCase().includes(texto.toLowerCase())
        );

        setSugerencias(filtrados.slice(0, 5)); // Máximo 5 sugerencias
        setIndiceSeleccionado(-1);
        itemsRef.current = [];
    }, [texto, productos]);

    // Cerrar sugerencias al clickear afuera
    useEffect(() => {
        function handleClickOutside(e) {
            if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
                setVisible(false);
                setIndiceSeleccionado(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll automático al cambiar índice
    useEffect(() => {
        if (indiceSeleccionado >= 0 && itemsRef.current[indiceSeleccionado]) {
            itemsRef.current[indiceSeleccionado].scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [indiceSeleccionado]);

    // Manejo de teclas
    const manejarTeclas = (e) => {
        if (!visible) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (sugerencias.length > 0)
                setIndiceSeleccionado((prev) =>
                    prev < sugerencias.length - 1 ? prev + 1 : 0
                );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (sugerencias.length > 0)
                setIndiceSeleccionado((prev) =>
                    prev > 0 ? prev - 1 : sugerencias.length - 1
                );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            
            if (indiceSeleccionado >= 0 && sugerencias[indiceSeleccionado]) {
                manejarSeleccion(sugerencias[indiceSeleccionado].id);
                return;
            }

            if (sugerencias.length > 0) {
                manejarSeleccion(sugerencias[0].id);
            }
        }

        if (e.key === "Escape") {
            setVisible(false);
            setIndiceSeleccionado(-1);
        }
    };

    const manejarSeleccion = (id) => {
        navigate(`/producto/${id}`);
        setTexto("");
        setVisible(false);
        setIndiceSeleccionado(-1);
    };

    return (
        <div className="buscador-container" ref={contenedorRef}>
            <input
                type="text"
                placeholder="Buscar productos..."
                value={texto}
                onChange={(e) => {
                    setTexto(e.target.value);
                    setVisible(true);
                }}
                onFocus={() => setVisible(true)}
                onKeyDown={manejarTeclas}
                className="buscador-input"
            />

            {/* 📌 Contenedor con animación */}
            <div
                className={`buscador-sugerencias ${
                    visible && texto.length > 0 ? "activo" : ""
                }`}
            >
                {/* 🔵 A2 — Mensaje cuando no hay resultados */}
                {visible && texto.length > 0 && sugerencias.length === 0 && (
                    <div className="buscador-sin-resultados">
                        No se encontraron productos
                    </div>
                )}

                {visible && sugerencias.length > 0 && 
                    sugerencias.map((p, i) => (
                        <div
                            key={p.id}
                            ref={(el) => (itemsRef.current[i] = el)}
                            className={
                                "buscador-item " +
                                (i === indiceSeleccionado ? "seleccionado" : "")
                            }
                            onClick={() => manejarSeleccion(p.id)}
                        >
                            <img src={p.imagen} alt="" />
                            {/* 🔵 A1 — Resaltado de coincidencias */}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: resaltarCoincidencia(p.nombre, texto)
                                }}
                            />
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default Buscador;
