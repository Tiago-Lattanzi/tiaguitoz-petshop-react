import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../contexts/ProductosContext";
import { Link } from "react-router-dom";
import "../styles/main-inicio.css";

function MainInicio() {
    const navigate = useNavigate();
    const { productos, cargando } = useContext(ProductosContext);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalContenido, setModalContenido] = useState({ titulo: "", texto: "" });

    const abrirModal = (titulo, texto) => {
        setModalContenido({ titulo, texto });
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

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

            {/* === INFORMACIÓN ÚTIL === */}
            <div className="inicio-info">
                <h2>Información útil</h2>

                <div className="info-grid">

                    <div className="info-card">
                        <h3>Política de devolución</h3>
                        <p>Podés devolver productos dentro de los 30 días si están en buen estado...</p>
                        <button 
                            onClick={() => abrirModal(
                                "Política de devolución",
                                `• Tenés 30 días desde la compra.
                                • Debe estar sin uso y con su empaque.
                                • Presentar ticket o comprobante.
                                • Reembolsos dentro de las 48 hs.`
                            )}
                        >
                            Leer más
                        </button>
                    </div>

                    <div className="info-card">
                        <h3>Preguntas frecuentes</h3>
                        <p>Respondemos las dudas más comunes sobre envíos, pagos y entregas...</p>
                        <button 
                            onClick={() => abrirModal(
                                "Preguntas frecuentes",
                                `Aquí respondemos:
                                • Formas de pago
                                • Envíos
                                • Entregas
                                • Cambios y devoluciones
                                • Seguimiento de pedidos`
                            )}
                        >
                            Leer más
                        </button>
                    </div>

                    <div className="info-card">
                        <h3>Cómo comprar</h3>
                        <p>Seguí estos simples pasos para comprar rápido y seguro en nuestra tienda...</p>
                        <button 
                            onClick={() => abrirModal(
                                "Cómo comprar",
                                `1) Elegí tus productos.
                                2) Agregalos al carrito.
                                3) Confirmá envío y pago.
                                4) Recibí tu compra en tu casa.`
                            )}
                        >
                            Leer más
                        </button>
                    </div>

                    <div className="info-card">
                        <h3>Mascotas perdidas</h3>
                        <p>Ayudamos a encontrar mascotas perdidas y reunirlas con sus dueños...</p>
                        <button 
                            onClick={() => abrirModal(
                                "Mascotas perdidas",
                                `• Revisá reportes de mascotas perdidas.
                                • Publicá la tuya.
                                • Contactá a los dueños.
                                • Colaborá compartiendo.`
                            )}
                        >
                            Leer más
                        </button>
                    </div>

                </div>
            </div>

            {/* === MODAL === */}
            {modalAbierto && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                        <h2>{modalContenido.titulo}</h2>
                        <p style={{ whiteSpace: "pre-line" }}>{modalContenido.texto}</p>
                        <button className="modal-cerrar" onClick={cerrarModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainInicio;