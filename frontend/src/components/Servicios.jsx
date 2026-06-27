import { servicios, proyectosEspeciales } from '../config/servicios.js'

import fondoServicios from '../img/servicios-fondo.png'

import IconBullet from './icons/IconBullet.jsx'

import IconCheck from './icons/IconCheck.jsx'

import Reveal from './Reveal.jsx'

import TechnologyAnimation from './TechnologyAnimation.jsx'

import './Servicios.css'



export default function Servicios() {

  const mitad = Math.ceil(proyectosEspeciales.items.length / 2)

  const columnaIzq = proyectosEspeciales.items.slice(0, mitad)

  const columnaDer = proyectosEspeciales.items.slice(mitad)



  return (

    <section id="servicios" className="seccion servicios">

      <div

        className="servicios__bg"

        aria-hidden="true"

        style={{ backgroundImage: `url(${fondoServicios})` }}

      />

      <div className="servicios__overlay" aria-hidden="true" />

      <div className="contenedor servicios__contenedor">

        <Reveal className="servicios__head">

          <span className="seccion-eyebrow">Nuestros Servicios</span>

          <h2 className="seccion-titulo">Oferta tecnológica</h2>

          <p className="servicios__sub">

            Creamos soluciones digitales que conectan personas, procesos e

            interfaces de forma más sencilla y eficiente.

          </p>

          <a href="#contacto" className="btn btn-rojo servicios__cta">

            Ver todos

          </a>

        </Reveal>



        <div className="servicios__grid">

          {servicios.map((s, i) => (

            <Reveal

              as="article"

              className="servicio-oferta"

              key={s.id}

              delay={(i % 3) * 90}

            >

              <div className="servicio-oferta__media">

                <img

                  className="servicio-oferta__img"

                  src={s.imagen}

                  alt={s.imagenAlt}

                  loading="lazy"

                />

                <div className="servicio-oferta__overlay" aria-hidden="true" />

                <h3 className="servicio-oferta__titulo">{s.titulo}</h3>

              </div>

              <div className="servicio-oferta__panel">

                <ul className="servicio-oferta__lista">

                  {s.opciones.map((opcion) => (

                    <li key={opcion.texto} className="servicio-oferta__item">

                      <IconBullet className="servicio-oferta__icono" />

                      <span>{opcion.texto}</span>

                    </li>

                  ))}

                </ul>

              </div>

            </Reveal>

          ))}

        </div>



        <div className="servicios__especiales">

          <Reveal className="servicios__especiales-visual">

            <TechnologyAnimation />

          </Reveal>



          <Reveal className="servicios__especiales-contenido" delay={120}>

            <h3 className="servicios__especiales-titulo">

              {proyectosEspeciales.titulo}

            </h3>

            <p className="servicios__especiales-texto">

              {proyectosEspeciales.descripcion}

            </p>



            <div className="servicios__especiales-listas">

              <ul className="servicios__especiales-lista">

                {columnaIzq.map((item) => (

                  <li key={item} className="servicios__especiales-item">

                    <IconCheck className="servicios__especiales-check" />

                    <span>{item}</span>

                  </li>

                ))}

              </ul>

              <ul className="servicios__especiales-lista">

                {columnaDer.map((item) => (

                  <li key={item} className="servicios__especiales-item">

                    <IconCheck className="servicios__especiales-check" />

                    <span>{item}</span>

                  </li>

                ))}

              </ul>

            </div>



            <a href="#contacto" className="btn btn-rojo servicios__especiales-cta">

              Ver todos

            </a>

          </Reveal>

        </div>

      </div>

    </section>

  )

}


