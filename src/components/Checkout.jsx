import React, { useContext, useState } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

const Checkout = () => {
    const { carrito, total, vaciarCarrito } = useContext(CarritoContext);
    const navigate = useNavigate();

    const [enviando, setEnviando] = useState(false);

    const [errores, setErrores] = useState({});

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    const [confirmado, setConfirmado] = useState(false);

    if (carrito.length === 0 && !confirmado) {
        return (
            <div className="checkout-container">
                <h2>Tu carrito está vacío</h2>
                <button onClick={() => navigate("/productos")}>
                    Ver productos
                </button>
            </div>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmado(true);
        vaciarCarrito();
    };

    return (
        <div className="checkout-container">
            {!confirmado ? (
                <>
                    <h2>Finalizar compra</h2>

                    {/* RESUMEN */}
                    <div className="checkout-resumen">
                        {carrito.map((p) => (
                            <div key={p.id} className="checkout-item">
                                <img src={p.imagen} alt={p.nombre} />
                                <span>{p.nombre} x{p.cantidad}</span>
                                <span>
                                    ${(p.precio * p.cantidad).toLocaleString("es-AR")}
                                </span>
                            </div>
                        ))}
                        <h3>Total: ${total.toLocaleString("es-AR")}</h3>
                    </div>

                    {/* FORM */}
                    <form 
                        className="checkout-form"
                        onSubmit={async (e) => {
                            e.preventDefault();

                            const nuevosErrores = {};

                            if (!form.nombre) nuevosErrores.nombre = "Ingresá tu nombre";
                            if (!form.email) nuevosErrores.email = "Ingresá un email válido";
                            if (!form.telefono) nuevosErrores.telefono = "Ingresá tu teléfono";
                            if (!form.direccion) nuevosErrores.direccion = "Ingresá la dirección";

                            if (Object.keys(nuevosErrores).length > 0) {
                                setErrores(nuevosErrores);
                                return;
                            }

                            setErrores({});
                            setEnviando(true);

                            try {
                                const formData = new FormData(e.target);

                                const response = await fetch("https://formspree.io/f/mjknlzzr", {
                                    method: "POST",
                                    body: formData,
                                    headers: { Accept: "application/json" }
                                });

                                if (response.ok) {
                                    setConfirmado(true);
                                    vaciarCarrito();
                                } else {
                                    alert("Error al procesar la compra");
                                }
                            } catch (error) {
                                alert("Error de conexión");
                            } finally {
                                setEnviando(false);
                            }
                        }}
                    >
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre completo"
                            className={errores.nombre ? "input-error" : ""}
                            onChange={handleChange}
                        />
                        {errores.nombre && <p className="error-text">{errores.nombre}</p>}
                            <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={errores.email ? "input-error" : ""}
                            onChange={handleChange}
                        />
                        {errores.email && <p className="error-text">{errores.email}</p>}
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            className={errores.telefono ? "input-error" : ""}
                            onChange={handleChange}
                        />
                        {errores.telefono && <p className="error-text">{errores.telefono}</p>}
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección de envío"
                            className={errores.direccion ? "input-error" : ""}
                            onChange={handleChange}
                        />
                        {errores.direccion && <p className="error-text">{errores.direccion}</p>}

                        <textarea
                            name="pedido"
                            hidden
                            value={carrito.map(p => `${p.nombre} x${p.cantidad}`).join(", ")}
                        />

                        <input type="hidden" name="total" value={total} />

                        <button type="submit" disabled={enviando}>
                            {enviando ? "Procesando compra..." : "Confirmar compra"}
                        </button>
                    </form>
                </>
            ) : (
                <div className="checkout-exito">
                    <div className="check-icon">✔</div>
                    <h2>¡Gracias por tu compra!</h2>
                    <p>Te enviaremos un email con los detalles.</p>
                    <button onClick={() => navigate("/")}>Volver al inicio</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;