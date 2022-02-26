import React, { Fragment, useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";

function Cards() {
  const [Oferta, setOferta] = useState([]);
  // const urlc = "http://localhost:5000/ofertas";
  const urlc = "http://localhost:8000/sale";

  const fetchApiOferta = () => {
    fetch(urlc)
      .then((responses) => responses.json())
      .then((data) => setOferta(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchApiOferta(urlc);
  }, []);

  return (
    <Fragment>
      {Oferta.map((Ofertas, index) => (
        <div key={index}>
          <Link exact to="/detalle">
            <div className="container__img">
              <img src={Ofertas.photos[0]} alt="imagen1" />
            </div>
          </Link>
          <div className="container__card">
            <div className="container__card__titulo">
              <div className="container__card__titulo__anio">
                {Ofertas.añomodelo}
              </div>
              <h3 className="container__card__titulo__marca">
                {Ofertas.marca} {Ofertas.modelo}
              </h3>
            </div>

            <div className="container__card__tipo">{Ofertas.transmision}</div>

            <div className="container__card__precio">
              <div>
                <box-icon type="solid" name="no-entry" color="white"></box-icon>
              </div>
              <div className="container__card__precio__precio1">$ 1,200</div> |
              <h3 className="container__card__precio__precio2">
                $ {Ofertas.preciodolares}
              </h3>
            </div>
            <hr />
            <div className="container__card__kilometros">
              <div>
                <box-icon
                  type="solid"
                  name="ev-station"
                  color="white"
                ></box-icon>
              </div>
              <div>{Ofertas.kilometraje} Kilometros</div>
            </div>
            <div className="container__card__color">
              <div>
                <box-icon name="color-fill" color="white"></box-icon>
              </div>
              <div>Exterior {Ofertas.color}</div>
            </div>
            <div className="container__card__descripcion">
              <div>
                <box-icon name="taxi" color="white"></box-icon>
              </div>
              <div>{Ofertas.descripcion}</div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default Cards;
