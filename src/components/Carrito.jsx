import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CarritoContext } from "../contexts/CarritoContext";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/estilos-globales.css"
import "../styles/carrito.css";

const Carrito = () => {
    const { carrito, eliminarProducto, vaciarCarrito, aumentarCantidad, disminuirCantidad, total } = useContext(CarritoContext);

    const { estaAutenticado } = useContext(AuthContext);

    const [modal, setModal] = useState({ visible: false, tipo: "", id: null });

    if (!estaAutenticado) {
        return (
            <div className="carrito-container">
                <h2>Iniciá sesión para usar el carrito</h2>
                <p>Podés hacerlo desde el botón <strong>“Iniciar sesión”</strong> en la parte superior o desde el menú en teléfonos.</p>
            </div>
        );
    }  

    const confirmarAccion = () => {
        if (modal.tipo === "eliminar") eliminarProducto(modal.id);
        if (modal.tipo === "vaciar") vaciarCarrito();
        setModal({ visible: false, tipo: "", id: null });
    };

    return (
        <div className="carrito-container">
            <h2 className="carrito-titulo">Tu Carrito</h2>

            {carrito.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
                <>
                    <table className="carrito-tabla">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item) => (
                                <tr key={item.id}>
                                    <td className="producto-info">
                                        <img src={item.imagen} alt={item.nombre} className="carrito-img" />
                                        {item.nombre}
                                    </td>
                                    <td>${item.precio}</td>
                                    <td className="carrito-cantidad">
                                        <button onClick={() => disminuirCantidad(item.id)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => aumentarCantidad(item.id)}>+</button>
                                    </td>
                                    <td>${item.precio * item.cantidad}</td>
                                    <td>
                                        <button
                                            className="carrito-eliminar"
                                            onClick={() => setModal({ visible: true, tipo: "eliminar", id: item.id })}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="carrito-footer">
                        <button
                            className="carrito-vaciar"
                            onClick={() => setModal({ visible: true, tipo: "vaciar" })}
                        >
                            Vaciar carrito
                        </button>
                        <h3>Total: ${total}</h3>
                    </div>
                </>
            )}

            {modal.visible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>
                            {modal.tipo === "vaciar"
                                ? "¿Seguro que deseas vaciar el carrito?"
                                : "¿Seguro que deseas eliminar este producto?"}
                        </p>
                        <div className="modal-botones">
                            <button className="btn-cancelar" onClick={() => setModal({ visible: false })}>
                                Cancelar
                            </button>
                            <button className="btn-confirmar" onClick={confirmarAccion}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
