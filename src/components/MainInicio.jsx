import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../contexts/ProductosContext";
import { Link } from "react-router-dom";
import "../styles/main-inicio.css";

function MainInicio() {
    const navigate = useNavigate();
    const { productos, cargando } = useContext(ProductosContext);

    const categorias = [
        { id: "perro", nombre: "Perros", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
        { id: "gato", nombre: "Gatos", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
        { id: "alimentos", nombre: "Alimentos", img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
        { id: "snacks", nombre: "Snacks", img: "https://cdn-icons-png.flaticon.com/512/706/706164.png" },
        { id: "accesorios", nombre: "Accesorios", img: "https://cdn-icons-png.flaticon.com/512/2674/2674516.png" }
    ];

    const seleccionarCategoria = (cat) => {
        navigate(`/productos?categoria=${cat}`);
    };

    // === Productos populares ===
    const populares = productos.slice(0, 4);

    return (
        <div className="inicio-contenedor">
            {/* Categorías*/}
            <div className="inicio-categorias">
                <h2>Categorías destacadas</h2>
                <div className="categorias-grid">
                    {categorias.map((c) => (
                        <div 
                            key={c.id} 
                            className="categoria-card"
                            onClick={() => seleccionarCategoria(c.id)}
                        >
                            <img src={c.img} alt={c.nombre} />
                            <p>{c.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Productos populares */}
            <div className="inicio-populares">
                <h2>Productos populares</h2>

                {cargando ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="populares-grid">
                        {populares.map((p) => (
                            <Link 
                                key={p.id}
                                to={`/producto/${p.id}`}
                                className="popular-card"
                            >
                                <img src={p.imagen} alt={p.nombre} />
                                <h3>{p.nombre}</h3>
                                <p>${p.precio}</p>
                            </Link>
                        ))}
                    </div>
                )}

                <button 
                    className="btn-ver-mas"
                    onClick={() => navigate("/productos")}
                >
                    Ver todos los productos
                </button>
            </div>
        </div>
    );
}

export default MainInicio;