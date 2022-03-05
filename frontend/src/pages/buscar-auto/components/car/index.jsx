import { NavLink as Link } from "react-router-dom";

function Car(props) {

  const {
    user_id,
    salePost_description,
    model_id,
    category_id,
    salePost_yearManufacturing,
    salePost_yearModel,
    salePost_kilometer,
    tranmission_id,
    fuel_id,
    salePost_cylinder,
    salePost_door,
    salePost_color,
    salePost_price,
    salePost_newCar,
    region_id,
    photos,
    salePost_id,
    // nuevos onlyread
    model_type,
    make_type,
    category_type,
    transmission_type,
    fuel_type,
    region_type
  } = props;

  const idcardlink=`/detalle/${salePost_id}`;

  return (
    <div className="car-component">
      <Link exact to={idcardlink}>
        <div className="container__img">
          <img src={photos[0].photo_url} />
        </div>
      </Link>
      <div className="container__card">
        <div className="container__card__titulo">
          <div className="container__card__titulo__anio">{salePost_yearModel}</div>
          <h3 className="container__card__titulo__marca">
            {make_type} {model_type}
          </h3>
        </div>

        <div className="container__card__tipo">{
        transmission_type
        }</div>

        <div className="container__card__precio">
          {/* <div>
            <box-icon type="solid" name="no-entry" color="white"></box-icon>
          </div> */}
          {/* <div className="container__card__precio__precio1">$ 1,200</div> | */}
          <h3>Precio</h3>
          <h3 className="container__card__precio__precio2">
            $ {salePost_price}
          </h3>
        </div>
        <hr />
        <div className="container__card__kilometros">
          <div>
            <box-icon type="solid" name="ev-station" color="white"></box-icon>
          </div>
          <div>{salePost_kilometer} Kilometros</div>
        </div>
        <div className="container__card__color">
          <div>
            <box-icon name="color-fill" color="white"></box-icon>
          </div>
          <div>Exterior {salePost_color}</div>
        </div>
        <div className="container__card__descripcion">
          <div>
            <box-icon name="taxi" color="white"></box-icon>
          </div>
          <div>{salePost_description}</div>
        </div>
      </div>
    </div>
  );
}

export { Car };
