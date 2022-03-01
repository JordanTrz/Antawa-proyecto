//importar el index
import Slider from 'react-slick';
import React, { Component } from 'react';
import axios from 'axios';
import 'boxicons';
import 'glider-js';
import { useEffect, useState } from 'react';
import Glider, { GliderMethods } from 'react-glider';

const DetAuto = (props) => {
  const [oferta, setOferta] = useState([]);
  const [status, setStatus] = useState(false);
  const { match } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/salepost/${match.params.idcard}`)
      .then((res) => {
        setOferta(res.data.content);
        setStatus(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(oferta.salePost_description);

  return (
    <div>
      <div>
        <div className="det-main">
          <div className="div1">
            <div className="div1__slider">
              <div className="div1__slider__imagen">
                <div className="div1_sliderimagen_lista">
                  <Slider {...settings}>
                    {oferta.photos &&
                      oferta.photos.map((photo) => {
                        return (
                          <div className="div1_slider__imagen">
                            <img src={photo.photo_url} alt="1" />
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </div>

            <div className="div1__frm">
              <div className="div1__frm__filtro">
                <div className="btn1">Mensaje</div>
                <div className="btn2">Telefono</div>
              </div>
              <div className="div1__frm__card">
                <h2>Contacta al Vendedor</h2>
                <form action="">
                  <div className="inputs">
                    <input type="text" placeholder="Nombre" />
                  </div>
                  <div className="inputs">
                    <input type="text" placeholder="Correo" />
                  </div>
                  <div className="inputs">
                    <input type="text" placeholder="Celular" />
                  </div>
                  <div className="inputs">
                    <textarea placeholder="Descripcion"> </textarea>
                  </div>
                  <div className="inputs">
                    <button className="btn">CONTACTAR</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="descripcion">
            <div className="descripcion__vehiculo">
              <h2>Descripcion del Vehiculo</h2>
              <div className="descripcion__vehiculo__inputs">
                <textarea name="" id="" cols="30" rows="10" readOnly value={
                  oferta.salePost_description
                }>
                </textarea>
              </div>
            </div>

            <div className="descripcion__carac">
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Marca
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={
                      // oferta.model_id &&
                      // oferta.model_id.make_id &&
                      // oferta.model_id.make_id.make_type
                      oferta.make_type
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Modelo
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value=
                    {
                      // oferta.model_id && oferta.model_id.model_type
                      oferta.model_type
                    }

                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Categoria
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={
                      // oferta.category_id && oferta.category_id.category_type
                      oferta.category_type
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Año-Modelo
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={oferta.salePost_yearModel}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="descripccion__carac">
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Kilomentraje
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={oferta.salePost_kilometer}
                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Transmision
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={
                      // oferta.transmission_id &&
                      // oferta.transmission_id.transmission_type
                      oferta.transmission_type
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Combustible
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input
                    type="text"
                    value={
                      // oferta.fuel_id && oferta.fuel_id.fuel_type
                      oferta.fuel_type
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="descripcion__carac__division">
                <div className="descripcion__carac__division__titulo">
                  Color
                </div>
                <div className="descripcion__carac__division__inputs">
                  <input type="text" value={oferta.salePost_color} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetAuto;
