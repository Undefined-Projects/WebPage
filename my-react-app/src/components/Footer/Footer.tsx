import React from "react";
import './footer.css';
import insta from '../../assets/insta.png'
import tiktok from '../../assets/tiktok.png'
import whatsapp from '../../assets/whatsapp.png'
import linkedin from '../../assets/linkedin.webp'
import undefined_logo from '../../assets/undefinedlogo.svg'

const Footer=()=>{
    return (
        <div className="footer">
            <div className="sb__footer-section_padding">
                <div className="sb__footer-logo">
                    <img src={undefined_logo}/>

                </div>
                <div className="sb__footer-links-div">
                    <h4>Links</h4>
                    <a href="/inicio">
                        <p>Inicio</p>
                    </a>
                    <a href="/novedades">
                        <p>Novedades</p>
                    </a>
                    <a href="/informacion">
                        <p>Información</p>
                    </a>
                    <a href="/registrate">
                        <p>Registrate</p>
                    </a>
                    <a href="/preguntas_frecuentes">
                        <p>Preguntas Frecuentes</p>
                    </a>
                </div>
                <div className="footer-links-div">
                    <h4>Ubicación</h4>
                    <a href="/ubicacion">
                        <p>PIT 3 Piso 7 Tecnologico de Monterrey Av. H. Colegio Militar, Bodegas del Estado 31300 Chihuahua, Chih.</p>
                    </a>
                </div>
                <div className="sb__footer-links-div">
                    <h4>Contactanos</h4>
                    <p>contacto@undefinedclub.org</p>
                    <div className="socialmedia">
                        <p><img src={insta} alt=""/></p>
                        <p><img src={tiktok} alt=""/></p>
                        <p><img src={whatsapp} alt=""/></p>
                        <p><img src={linkedin} alt=""/></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer