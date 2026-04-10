import { useState, useEffect } from 'react';
import Default from '../assets/default.png';
import './Novedades.css'

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
				<img
					className='img'
					src={src}
					alt="ImagNovedades"
					onError={() => setSrc(Default)}
				/>
				<div className='texto'>
					<h2>{Tittle}</h2>
					<p>{Paragraph}</p>
				</div>
				<a href="#" className='button-link'>Saber más</a>
			</div>
		</>
	);
}

export default Novedades