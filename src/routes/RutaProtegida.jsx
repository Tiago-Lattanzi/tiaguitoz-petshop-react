import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function RutaProtegida({ children }) {
    const { usuario, cargando } = useContext(AuthContext);

    if (cargando) {
        return <p style={{ textAlign: "center" }}>Cargando sesión...</p>; // 👈 evita redirigir antes de tiempo
    }

    return usuario ? children : <Navigate to="/login" />;
}

export default RutaProtegida;
