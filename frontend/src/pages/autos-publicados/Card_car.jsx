import React from 'react';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';

const Card_car = ({values,handleRemoveBox}) => {

  const e = values.e;
  const i = values.i;

  // console.log(e.salePost_id)

  const idCarId = `/modificar-auto/${e.salePost_id}`

  return (
    <div
    className="publishCar__data"
  >
    <h1>Publicación #{i + 1}</h1>

    <Link exact to={idCarId}>
      <div className='data__wrapper'>
        <div>
          <img src={e.photos[0].photo_url} />
        </div>
        <div className="publishCar__dataInput">
          <div>
            <h2>Marca</h2>
            <h2>{e.make_type}</h2>
          </div>
          <div>
            <h2>Transmisión</h2>
            <h2>{e.transmission_type}</h2>
          </div>
          <div>
            <h2>Kilometraje</h2>
            <h2>{e.salePost_kilometer}</h2>
          </div>
          <div>
            <h2>Modelo</h2>
            <h2>{e.model_type}</h2>
          </div>
          <div>
            <h2>Año de frabricación</h2>
            <h2>{e.salePost_yearManufacturing}</h2>
          </div>
          <div>
            <h2>Combustible</h2>
            <h2>{e.fuel_type}</h2>
          </div>
        </div>
      </div>
    </Link>

    <div className="butonDeleteCars">
      <button value={e.salePost_id} onClick={handleRemoveBox}>
        X
      </button>
    </div>
  </div>
  )
}

export default Card_car