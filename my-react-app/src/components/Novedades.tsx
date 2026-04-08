import { useState } from 'react';
import Default from '../assets/default.png';
import './Novedades.css'

function Novedades() {
	const [src, setSrc] = useState('./novedades.jpg');
	
	return (
		<>
			<div className='content'>
				<div className='button-container'>

					<button className='swap'>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M6 8L2 12L6 16"/>
						<path d="M2 12H22"/>
						</svg>
					</button>
					<button className='swap'>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 8L22 12L18 16"/>
						<path d="M2 12H22"/>
						</svg>
					</button>

				</div>
				<img
					className='img'
					src={src}
					alt="ImagNovedades"
      		onError={() => setSrc(Default)}
				/>
				<div className='texto'>
					<h2>¡Novedades!</h2>
					<p>¡Estamos emocionados de anunciar que hemos lanzado una nueva función en nuestra aplicación! Ahora puedes personalizar tu perfil con una variedad de temas y colores. ¡Haz que tu experiencia sea única y refleja tu estilo personal! Explora las opciones de personalización en la configuración de tu cuenta y dale un toque especial a tu perfil. ¡Esperamos que disfrutes esta nueva función tanto como nosotros disfrutamos desarrollándola para ti!</p>
				</div>
				<a href="#" className='button-link'>Saber más</a>
			</div>
		</>
	);
}

export default Novedades