import { useState } from 'react';
import './Info.css'; 

function Info() {
  const [activo, setActivo] = useState<string | null>(null);

  return (
    <div className="contenedor-principal">
      <h2>Sobre nosotros</h2>

      {/* BLOQUE 1: Presentación */}
      <div className="fila">
        <div className="columna-texto">
          <button onClick={() => setActivo(activo === 'pres' ? null : 'pres')}>
            Presentación
          </button>
          {activo === 'pres' && <p>Como un espacio formado por y para jóvenes, en Undefined_Club entendemos que el aprendizaje es una aventura constante. Nos enfocamos en el desarrollo de competencias técnicas y blandas, creando un entorno donde los estudiantes pueden experimentar con nuevas herramientas, fallar sin miedo y adquirir las habilidades que el mundo laboral y la innovación tecnológica exigen actualmente.</p>}
        </div>
        <div className="columna-imagen">
          <div className="cuadro-imagen">Imagen 1</div> 
        </div>
      </div>

      {/* BLOQUE 2: Aprender */}
      <div className="fila inversa">
        <div className="columna-texto">
          <button onClick={() => setActivo(activo === 'prog' ? null : 'prog')}>
            Aprender a programar
          </button>
          {activo === 'prog' && <p>Undefined_Club es una comunidad de estudiantes apasionados por la tecnología, donde nuestro motor principal es el aprendizaje mutuo. Nos enfocamos en dominar la programación y el desarrollo web a través de la colaboración, compartiendo conocimientos para crecer juntos desde las bases hasta proyectos reales.</p>}
        </div>
        <div className="columna-imagen">
          <div className="cuadro-imagen">Imagen 2</div>
        </div>
      </div>

      {/* BLOQUE 3: Asesoramiento */}
      <div className="fila">
        <div className="columna-texto">
          <button onClick={() => setActivo(activo === 'ases' ? null : 'ases')}>
            Asesoramiento de proyectos
          </button>
          {activo === 'ases' && <p>Te ayudamos con tus ideas técnicas..Undefined_Club es un espacio abierto a mentes curiosas que buscan transformar una idea en un proyecto tangible. Aquí, no solo programamos, sino que ofrecemos un entorno de asesoramiento colectivo donde los estudiantes pueden aterrizar sus propuestas, recibir retroalimentación técnica y encontrar el apoyo necesario para dar vida a sus iniciativas digitales.</p>}
        </div>
        <div className="columna-imagen">
          <div className="cuadro-imagen">Imagen 3</div>
        </div>
      </div>

      {/* BLOQUE 4: Convivencia */}
      <div className="fila inversa">
        <div className="columna-texto">
          <button onClick={() => setActivo(activo === 'conv' ? null : 'conv')}>
            Convivencia
          </button>
          {activo === 'conv' && (
            <p>Undefined_Club entiende que detrás de cada línea de código hay una persona. Por ello, no solo somos un espacio de aprendizaje técnico, sino un ecosistema que prioriza el fortalecimiento de lazos entre sus integrantes. Buscamos que el crecimiento profesional vaya de la mano con una sana convivencia, creando un ambiente de confianza donde el apoyo mutuo sea la base de nuestra red.</p>
          )}
        </div>
        <div className="columna-imagen">
          <div className="cuadro-imagen">Imagen 4</div>
        </div>
      </div>

    </div> /* Cierre de contenedor-principal */
  ); /* Cierre de return */
} /* Cierre único de la función Info */

export default Info;