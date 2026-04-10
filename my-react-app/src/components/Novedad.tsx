import { useState } from 'react';
import Novedades from './Novedades';

interface Noticia {
  id: number;
  Tittle: string;
  Paragraph: string;
  foto?: string;
}

function SeccionCarrusel() {
  const datos: Noticia[] = [
    {
      id: 1,
      Tittle: "¡Nueva Actualización!",
      Paragraph: "Hemos añadido el modo oscuro...",
      foto: "./foto1.jpg"
    },
    {
      id: 2,
      Tittle: "Mejoras de Rendimiento",
      Paragraph: "La app ahora carga un 50% más rápido...",
      foto: "./foto2.jpg"
    },
    {
      id: 3,
      Tittle: "Evento Especial",
      Paragraph: "Participa en nuestro torneo de este fin de semana...",
      foto: "./foto3.jpg"
    }
  ];

  const [index, setindex] = useState(0);

  const irSiguiente = () => {
    // Si estamos en la última, volvemos a la 0. Si no, sumamos 1.
    setindex((prev) => (prev === datos.length - 1 ? 0 : prev + 1));
  };

  const irAnterior = () => {
    // Si estamos en la 0, vamos a la última. Si no, restamos 1.
    setindex((prev) => (prev === 0 ? datos.length - 1 : prev - 1));
  };

  const noticiaActual = datos[index];

  return (
      <Novedades 
        Tittle={noticiaActual.Tittle}
        Paragraph={noticiaActual.Paragraph}
        Img={noticiaActual.foto}
        onNext={irSiguiente}
        onPrev={irAnterior}
      />
  );
}

export default SeccionCarrusel;