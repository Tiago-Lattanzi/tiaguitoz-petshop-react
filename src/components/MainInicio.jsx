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

    const [formEnviado, setFormEnviado] = useState(false);
    const [formValido, setFormValido] = useState(false);

    const [enviandoFormulario, setEnviandoFormulario] = useState(false);
    const [inputsCompletos, setInputsCompletos] = useState({
        nombre: false,
        email: false,
        mensaje: false
    });

    const [intentoEnvio, setIntentoEnvio] = useState(false);

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
                                <p>${Number(p.precio).toLocaleString("es-AR")}</p>
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

            {/* INFORMACIÓN DE CONTACTO + MAPA */}
            <div className="inicio-contacto-seccion">
                <h2>Contacto y ubicación</h2>

                <div className="contacto-grid">
                    
                    {/* MAPA + INFO*/}
                    <div className="contacto-mapa">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6565.908928001306!2d-58.49531!3d-34.630591!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc43ad634b1ea7ef%3A0xab4e910fd9a6294b!2sTiaguitoz%20Petshop!5e0!3m2!1ses-419!2sar!4v1765412578057!5m2!1ses-419!2sar"
                            allowfullscreen="" 
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="mapa ubicación"
                        ></iframe>

                        <div className="contacto-datos"> 
                            <h3>Datos de contacto</h3>
                            <p><strong>Email:</strong> tienda@tiaguitozpetshop.com</p>
                            <p><strong>Teléfono:</strong> +54 11 32187898</p>
                            <p><strong>Dirección:</strong> Bermúdez 634, Buenos Aires</p> 
                        </div>
                    </div>

                    {/* FORMULARIO */}
                    <form 
                        className="contacto-form"
                        onSubmit={async (e) => {
                            e.preventDefault();

                            setIntentoEnvio(true);

                            if (!formValido) return;

                            setEnviandoFormulario(true);

                            const formData = new FormData(e.target);

                            const respuesta = await fetch("https://formspree.io/f/mwpgrjko", {
                                method: "POST",
                                body: formData,
                                headers: { "Accept": "application/json" }
                            });

                            setEnviandoFormulario(false);

                            if (respuesta.ok) {
                                setFormEnviado(true);
                                setFormValido(false);
                                setInputsCompletos({ nombre: false, email: false, mensaje: false });
                                setIntentoEnvio(false);

                                e.target.reset();

                                setTimeout(() => setFormEnviado(false), 4000);
                            }
                        }}
                    >
                        <h3>Envíanos un mensaje</h3>

                        <input 
                            type="text" 
                            name="Nombre" 
                            title="Nombre" 
                            placeholder="Tu nombre" 
                            required
                            className={intentoEnvio && !inputsCompletos.nombre ? "input-error" : ""}
                            onChange={(e) => {
                                const valor = e.target.value.trim();
                                setInputsCompletos(prev => ({ ...prev, nombre: valor !== "" }));
                                setFormValido(
                                    valor &&
                                    e.target.form.Email.value.trim() &&
                                    e.target.form["Tu mensaje"].value.trim()
                                );
                            }}
                        />
                        {intentoEnvio && !inputsCompletos.nombre && (
                            <p className="input-msg-error">⚠️ Escribí tu nombre.</p>
                        )}

                        <input 
                            type="email" 
                            name="Email" 
                            title="Email" 
                            placeholder="Tu email" 
                            required
                            className={intentoEnvio && !inputsCompletos.email ? "input-error" : ""}
                            onChange={(e) => {
                                const valor = e.target.value.trim();
                                setInputsCompletos(prev => ({ ...prev, email: valor !== "" }));
                                setFormValido(
                                    e.target.form.Nombre.value.trim() &&
                                    valor &&
                                    e.target.form["Tu mensaje"].value.trim()
                                );
                            }}
                        />
                        {intentoEnvio && !inputsCompletos.email && (
                            <p className="input-msg-error">⚠️ Ingresá un email válido.</p>
                        )}

                        <textarea 
                            name="Tu mensaje" 
                            title="Tu mensaje" 
                            placeholder="Tu mensaje..." 
                            required
                            className={intentoEnvio && !inputsCompletos.mensaje ? "input-error" : ""}
                            onChange={(e) => {
                                const valor = e.target.value.trim();
                                setInputsCompletos(prev => ({ ...prev, mensaje: valor !== "" }));
                                setFormValido(
                                    e.target.form.Nombre.value.trim() &&
                                    e.target.form.Email.value.trim() &&
                                    valor
                                );
                            }}
                        ></textarea>

                        {intentoEnvio && !inputsCompletos.mensaje && (
                            <p className="input-msg-error">⚠️ Escribí tu mensaje.</p>
                        )}

                        <input type="hidden" name="_subject" value="Nuevo mensaje desde Tiaguitoz PetShop" />

                        <button 
                            type="submit"
                            disabled={!formValido || enviandoFormulario}
                            className={
                                !formValido || enviandoFormulario 
                                    ? "btn-deshabilitado"
                                    : "btn-activo"
                            }
                        >
                            {enviandoFormulario ? (
                                <div className="loader"></div>
                            ) : (
                                "Enviar mensaje"
                            )}
                        </button>

                        {formEnviado && (
                            <p className="form-exito">¡Mensaje enviado con éxito!</p>
                        )}
                    </form>
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