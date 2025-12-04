import React from "react";
import "../styles/footer.css"
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaTwitter, FaEnvelope} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-contenido">
                <p>© {new Date().getFullYear()} Tiaguitoz PetShop — Todos los derechos reservados</p>

                <div className="footer-redes">
                    <a href="https://www.instagram.com/tiaguitoz" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={22} />
                    </a>
                    <a href="https://www.facebook.com/Tiaguitoz/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={22} />
                    </a>
                    <a href="https://www.youtube.com/@Tiaguitoz" target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={22} />
                    </a>
                    <a href="https://www.tiktok.com/@balanceados_tiaguitoz " target="_blank" rel="noopener noreferrer">
                        <FaTiktok size={22} />
                    </a>
                    <a href="https://www.twitter.com/Tiaguitozpets" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={22} />
                    </a>
                    <a href="mailto:tienda@tiaguitozpetshop.com">
                        <FaEnvelope size={22}/>
                    </a>
                </div>
            </div>
        </footer>
    );
} export default Footer