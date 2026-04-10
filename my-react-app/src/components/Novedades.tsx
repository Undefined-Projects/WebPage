import { useState, useEffect } from 'react';
import Default from '../assets/default.png';
import './Novedades.css'
import { motion, AnimatePresence } from 'framer-motion';

interface NovedadesProps {
	Tittle: string;
	Paragraph: string;
	Img?: string;
	onNext: () => void; 
  onPrev: () => void;
}

function Novedades({Tittle, Paragraph, Img = Default, onNext, onPrev}: NovedadesProps) {

	const [src, setSrc] = useState(Img);
	useEffect(() => {
    setSrc(Img);
  }, [Img]);

	return (
		<>
			<div className='content'>
				<div className='button-container'>

					<button className='swap' onClick={onPrev}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#1E202C' stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M6 8L2 12L6 16" />
							<path d="M2 12H22" />
						</svg>
					</button>
					<button className='swap' onClick={onNext}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke='#1E202C' stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 8L22 12L18 16" />
							<path d="M2 12H22" />
						</svg>
					</button>

				</div>

				<AnimatePresence mode='wait'>
					<motion.img
						key={src} // La key es vital: le dice a Framer Motion que es una imagen nueva
						initial={{ x: -350, opacity: 0 }} /* Estado inicial: escondido a la izquierda */
						animate={{ x: 0, opacity: 1 }}    /* Estado normal: en su posición original */
						exit={{ x: -350, opacity: 0 }}    /* Estado al salir: se va hacia la izquierda */
						transition={{ duration: 0.3 }}    /* Cuánto dura la animación */
						className='img'
						src={src}
						alt="ImagNovedades"
						onError={() => setSrc(Default)}
					/>
				</AnimatePresence>

				<AnimatePresence mode='wait'>
					<motion.div 
						key={Tittle} // Usamos el título como key para saber cuándo cambia la noticia
						initial={{ opacity: 0 }}       /* Inicia invisible */
						animate={{ opacity: 1 }}       /* Aparece */
						exit={{ opacity: 0 }}          /* Desaparece */
						transition={{ duration: 0.3 }} /* Un poco más rápido que la imagen */
						className='texto'>
						<h2>{Tittle}</h2>
						<p>{Paragraph}</p>
					</motion.div>
				</AnimatePresence>

					<a href="#" className='button-link'>Saber más</a>
			</div>
		</>
	);
}

export default Novedades