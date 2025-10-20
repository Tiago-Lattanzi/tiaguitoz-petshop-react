import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario");
        return guardado ? JSON.parse(guardado) : { nombre: "Anónimo", email: null };
    });

    useEffect(() => {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }, [usuario]);

    const login = (nombre, email) => {
        setUsuario({ nombre, email });
    };

    const logout = () => {
        setUsuario({ nombre: "Anónimo", email: null });
    };

    const estaAutenticado = !!usuario.email;

    return (
        <AuthContext.Provider value={{ usuario, login, logout, estaAutenticado }}>
            {children}
        </AuthContext.Provider>
    );
};
