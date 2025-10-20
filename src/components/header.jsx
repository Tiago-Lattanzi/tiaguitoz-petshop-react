import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CarritoContext } from "../contexts/CarritoContext";
import { FaShoppingCart, FaHome, FaBoxOpen, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import "../styles/estilos-globales.css"
import "../styles/header.css"

function Header() {
    const { usuario, login, logout, estaAutenticado } = useContext(AuthContext);
    const { cantidadTotal } = useContext(CarritoContext);
    const navigate = useNavigate();

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [cerrando, setCerrando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const menuRef = useRef(null);
    const botonRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        if (menuAbierto) {
            setCerrando(true);
            setTimeout(() => {
                setMenuAbierto(false);
                setCerrando(false);
            }, 300); // mismo tiempo que la animación CSS
        } else {
            setMenuAbierto(true);
        }
    };

    const cerrarMenu = () => {
        if (menuAbierto) toggleMenu();
    };

    // Cerrar con ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") cerrarMenu();
        };
        if (menuAbierto) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
        }, [menuAbierto]);

    useEffect(() => {
        document.body.style.overflow = menuAbierto ? "hidden" : "";
    }, [menuAbierto]);

    const handleLogin = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value.trim();
        const email = e.target.email.value.trim();
        if (nombre && email) {
            login(nombre, email);
            setMostrarModal(false);
        }
    };

    return (
        <header className="header">
            <button ref={botonRef} className="btn-menu" onClick={toggleMenu} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuAbierto} style={{ color: menuAbierto ? "#fff" : "#1203f9" }}>
                {menuAbierto ? <FaTimes /> : <FaBars />}
            </button>

            <div className="logoArea">
                <Link to="/" className="logo">Bienvenido {usuario.nombre || "Anonimo"}</Link>
            </div>

            <nav className="nav">
                <Link to="/" className="link"><FaHome /> Inicio</Link>
                <Link to="/productos" className="link"><FaBoxOpen /> Productos</Link>
                <Link 
                    to={estaAutenticado ? "/carrito" : "#"} className="carrito"
                    onClick={(e) => {
                        if (!estaAutenticado) {
                            e.preventDefault();
                            setMostrarModal(true)
                        }
                    }}
                >
                    <FaShoppingCart />
                    {cantidadTotal > 0 && <span className="contador">{cantidadTotal}</span>}
                </Link>
            </nav>

            <div className="userArea">
                {estaAutenticado ? (
                    <button onClick={handleLogout} className="logout">
                        <FaSignOutAlt /> Cerrar sesión
                    </button>
                ) : (
                    <button onClick={() => setMostrarModal(true)} className="login">
                        <FaSignInAlt /> Iniciar sesión
                    </button>
                )}
            </div>

            {/* Menú lateral (móvil) */}
                <>
                    <aside ref={menuRef} className={`menu-lateral ${menuAbierto ? "activo" : ""} ${cerrando ? "cerrando" : ""}`}>
                        <div className="menu-logo">
                            <img src="/images/logo.png" alt="logo Tiaguitoz" />
                        </div>
                        <ul>
                            <li><Link to="/" onClick={cerrarMenu}><FaHome /> Inicio</Link></li>
                            <li><Link to="/productos" onClick={cerrarMenu}><FaBoxOpen /> Productos</Link></li>
                            <li><Link to="/carrito" onClick={cerrarMenu}><FaShoppingCart /> Carrito</Link></li>
                        </ul>

                        <div className="logout-container">
                            {estaAutenticado ? (
                                <button onClick={() => { handleLogout(); cerrarMenu(); }} className="logout">
                                    <FaSignOutAlt /> Cerrar sesión
                                </button>
                            ) : (
                                <button onClick={() => { setMostrarModal(true); cerrarMenu(); }} className="login">
                                    <FaSignInAlt /> Iniciar sesión
                                </button>
                            )}
                        </div>
                    </aside>
                    {(menuAbierto || cerrando) && (
                        <div 
                            className={`overlay ${cerrando ? "oculto" : ""}`} 
                            onClick={cerrarMenu}>
                        </div>
                    )}
                </>

                {/* Modal de login */}
                {mostrarModal && (
                    <div className="modal-login">
                        <div className="modal-content">
                            <h2>Iniciar sesión</h2>
                            <form onSubmit={handleLogin}>
                                <input name="nombre" placeholder="Nombre" required />
                                <input name="email" type="email" placeholder="Correo electrónico" required />
                                <button type="submit">Entrar</button>
                            </form>
                            <button className="cerrar" onClick={() => setMostrarModal(false)}>Cancelar</button>
                        </div>
                    </div>
                )}
        </header>
    );
}

export default Header;
