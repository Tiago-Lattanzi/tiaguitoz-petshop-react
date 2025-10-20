import React, { useState, useContext } from "react";
import { ProductosContext } from "../contexts/ProductosContext";
import "../styles/form-productos.css"
import "../styles/estilos-globales.css"

function FormularioProducto() {
    const { agregarProducto } = useContext(ProductosContext);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        categoria: "",
        imagen: ""
    });

    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validar = () => {
        if (!form.nombre.trim()) return "El nombre es obligatorio.";
        if (Number(form.precio) <= 0) return "El precio debe ser mayor a 0.";
        if (form.descripcion.trim().length < 10) return "La descripción debe tener al menos 10 caracteres.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorValidacion = validar();
        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }
        setError("");
        await agregarProducto(form);
        setExito("Producto agregado correctamente");
        setForm({ nombre: "", precio: "", descripcion: "", categoria: "", imagen: "" });
        setTimeout(() => setExito(""), 2500);
    };

    return (
        <form className="form-producto" onSubmit={handleSubmit}>
            <h2>Agregar producto</h2>

            <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={form.nombre}
                onChange={handleChange}
            />
            <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
            />
            <input
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={form.categoria}
                onChange={handleChange}
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
            />
            <input
                type="text"
                name="imagen"
                placeholder="URL de imagen (opcional)"
                value={form.imagen}
                onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}
            {exito && <p className="exito">{exito}</p>}

            <button type="submit">Agregar producto</button>
        </form>
    );
}

export default FormularioProducto;
