import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === "") {
            alert("Por favor ingresa un nombre");
            return;
        }
        login(nombre); // Guardamos usuario en contexto + localStorage
        navigate("/"); 
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
