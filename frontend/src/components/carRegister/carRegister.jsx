import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

import AddBoxIcon from '@mui/icons-material/AddBox';

const CarRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => {
    return state.auth.userData;
  });
  const initialStateValues = {
    marca: '',
    modelo: '',
    categoria: '',
    añomfabricacion: '',
    añomodelo: '',
    kilometraje: '',
    transmision: '',
    combustible: '',
    cilindrada: '',
    numeropuertas: '',
    color: '',
    preciodolares: '',
    region: '',
    photos: '',
    descripcion: '',
    autonuevo: false,
    idVendedor: userData.id,
  };
  const [newDataForm, setNewDataForm] = useState(initialStateValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [allBackData, setAllBackData] = useState({
    make: '',
    category: '',
    fuel: '',
    transmission: '',
    region: '',
  });
  const [toBack, setToBack] = useState({});

  useEffect(() => {
    const getCarData = async () => {
      const make = await api.get('/make');
      const category = await api.get('/category');
      const fuel = await api.get('/fuel');
      const transmission = await api.get('/transmission');
      const region = await api.get('/region');
      setAllBackData({
        make: make.data.content,
        category: category.data.content,
        fuel: fuel.data.content,
        transmission: transmission.data.content,
        region: region.data.content,
      });
    };
    getCarData();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewDataForm({ ...newDataForm, [name]: value });
  };

  const toEnglish = () => {
    const toBack = {
      user_id: parseInt(userData.id),
      model_id: parseInt(newDataForm.modelo),
      category_id: parseInt(newDataForm.categoria),
      salePost_yearModel: parseInt(newDataForm.añomodelo),
      salePost_yearManufacturing: parseInt(newDataForm.añomfabricacion),
      salePost_kilometer: parseInt(newDataForm.kilometraje),
      salePost_cylinder: newDataForm.cilindrada,
      salePost_door: parseInt(newDataForm.numeropuertas),
      salePost_color: newDataForm.color,
      salePost_price: parseInt(newDataForm.preciodolares),
      salePost_newCar: false,
      transmission_id: parseInt(newDataForm.transmision),
      fuel_id: parseInt(newDataForm.combustible),
      region_id: parseInt(newDataForm.region),
      salePost_description: newDataForm.descripcion,
      photos: [
        {
          photo_url: newDataForm.photos,
        },
      ],
    };
    setToBack(toBack);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toEnglish();
    setFormErrors(validate(newDataForm));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // axios
      console.log(toBack);
      api.post('/salepost', toBack).then(() => {
        setTimeout(() => {
          swal('Guardado', 'Registro Exitoso', 'success');
          history.push('/autos-publicados');
        }, 500);
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.marca) {
      errors.marca = 'Es obligatorio ingresar marca';
    }
    if (!values.modelo) {
      errors.modelo = 'Es obligatorio ingresar modelo';
    }
    if (!values.categoria) {
      errors.categoria = 'Es obligatorio ingresar categoría';
    }
    if (!values.añomfabricacion) {
      errors.añomfabricacion = 'Es obligatorio ingresar año de fabricación';
    }
    if (!values.añomodelo) {
      errors.añomodelo = 'Es obligatorio ingresar año del modelo';
    }
    if (!values.kilometraje) {
      errors.kilometraje = 'Es obligatorio ingresar kilometraje';
    }
    if (!values.transmision) {
      errors.transmision = 'Es obligatorio ingresar transmisión';
    }
    if (!values.combustible) {
      errors.combustible = 'Es obligatorio ingresar tipo de combustible';
    }
    if (!values.cilindrada) {
      errors.cilindrada = 'Es obligatorio ingresar cilindrada';
    }
    if (!values.numeropuertas) {
      errors.numeropuertas = 'Es obligatorio ingresar dato';
    }
    if (!values.color) {
      errors.color = 'Es obligatorio ingresar color';
    }
    if (!values.preciodolares) {
      errors.preciodolares = 'Es obligatorio ingresar precio';
    }
    if (!values.region) {
      errors.region = 'Es obligatorio ingresar región';
    }
    if (!values.photos) {
      errors.photos = 'Es obligatorio ingresar link de photo';
    }
    if (!values.descripcion) {
      errors.descripcion = 'Es obligatorio ingresar descripción';
    } else if (values.descripcion.length < 10) {
      errors.descripcion = 'Ingresar mínimo 10 caracteres';
    }

    return errors;
  };

  return (
    <div className="carRegister_wrapper">
      <div className="carRegister__Publish">
        <h2>Datos del Vehículo</h2>
        <div className="UserContact__line"></div>
        <form onSubmit={handleSubmit}>
          <div className="carRegister__Inputs">
            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.marca}
                onChange={handleChange}
                name="marca"
                id="marca"
              >
                <option> Marcas </option>
                {allBackData.make &&
                  allBackData.make.map((marcaCarros) => {
                    return (
                      <option
                        value={marcaCarros.make_id}
                        key={marcaCarros.make_id}
                      >
                        {marcaCarros.make_type}
                      </option>
                    );
                  })}
              </select>
              <p>{formErrors.marca}</p>
            </div>

            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.modelo}
                onChange={handleChange}
                name="modelo"
                id="modelo"
              >
                <option>Modelos</option>
                {allBackData.make &&
                  allBackData.make
                    .filter((models) => models.make_id == newDataForm.marca)
                    .map((model) => {
                      return model.make_models.map((one_model) => (
                        <option
                          key={one_model.model_id}
                          value={one_model.model_id}
                        >
                          {one_model.model_type}
                        </option>
                      ));
                    })}
              </select>
              <p>{formErrors.modelo}</p>
            </div>

            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.categoria}
                onChange={handleChange}
                name="categoria"
                id="categoria"
              >
                <option>Categorías</option>
                {allBackData.category &&
                  allBackData.category.map((categorias) => {
                    return (
                      <option
                        value={categorias.category_id}
                        key={categorias.category_id}
                      >
                        {categorias.category_type}
                      </option>
                    );
                  })}
              </select>
              <p>{formErrors.categoria}</p>
            </div>

            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.añomfabricacion}
                onChange={handleChange}
                name="añomfabricacion"
                id="añomfabricacion"
                type="number"
                placeholder="Año de fabricación"
              />
              <p>{formErrors.añomfabricacion}</p>
            </div>
            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.añomodelo}
                onChange={handleChange}
                name="añomodelo"
                id="añomodelo"
                type="number"
                placeholder="Año de modelo"
              />
              <p>{formErrors.añomodelo}</p>
            </div>
            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.kilometraje}
                onChange={handleChange}
                name="kilometraje"
                id="kilometraje"
                type="number"
                placeholder="kilometraje"
              />
              <p>{formErrors.kilometraje}</p>
            </div>

            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.transmision}
                onChange={handleChange}
                name="transmision"
                id="transmision"
              >
                <option>Transmisiones</option>
                {allBackData.transmission &&
                  allBackData.transmission.map((transmisiones) => {
                    return (
                      <option
                        value={transmisiones.transmission_id}
                        key={transmisiones.transmission_id}
                      >
                        {transmisiones.transmission_type}
                      </option>
                    );
                  })}
              </select>
              <p>{formErrors.transmision}</p>
            </div>

            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.combustible}
                onChange={handleChange}
                name="combustible"
                id="combustible"
              >
                <option>Combustibles</option>
                {allBackData.fuel &&
                  allBackData.fuel.map((combustibles) => {
                    return (
                      <option
                        value={combustibles.fuel_id}
                        key={combustibles.fuel_id}
                      >
                        {combustibles.fuel_type}
                      </option>
                    );
                  })}
              </select>
              <p>{formErrors.combustible}</p>
            </div>

            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.cilindrada}
                onChange={handleChange}
                name="cilindrada"
                id="cilindrada"
                type="text"
                placeholder="Cilindrada"
              />
              <p>{formErrors.cilindrada}</p>
            </div>
            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.numeropuertas}
                onChange={handleChange}
                name="numeropuertas"
                id="numeropuertas"
              >
                <option>Número de puertas</option>
                <option>4</option>
                <option>5</option>
              </select>
              <p>{formErrors.numeropuertas}</p>
            </div>
            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.color}
                onChange={handleChange}
                name="color"
                id="color"
                type="text"
                placeholder="Color"
              />
              <p>{formErrors.color}</p>
            </div>
            <div className="FormRegister__divHigh">
              <input
                value={newDataForm.preciodolares}
                onChange={handleChange}
                name="preciodolares"
                id="preciodolares"
                type="number"
                placeholder="Precio en Dólares"
              />
              <p>{formErrors.preciodolares}</p>
            </div>
            <div className="FormRegister__divHigh">
              <select
                value={newDataForm.region}
                onChange={handleChange}
                name="region"
                id="region"
              >
                <option>Regiones</option>
                {allBackData.region &&
                  allBackData.region.map((regiones) => {
                    return (
                      <option
                        value={regiones.region_id}
                        key={regiones.region_id}
                      >
                        {regiones.region_type}
                      </option>
                    );
                  })}
              </select>
              <p>{formErrors.region}</p>
            </div>
            <div className="FormRegister__divHigh">
              <label><i className='fa fa-plus'></i></label>
              {/* <AddBoxIcon/> */}
              <input
                value={newDataForm.photos}
                onChange={handleChange}
                name="photos"
                id="photos"
                type="text"
                placeholder="Link de photo"
                autoComplete="off"
              />
              <p>{formErrors.photos}</p>
            </div>
            <div className="gridInputPublishCar FormRegister__divHigh">
              <textarea
                value={newDataForm.descripcion}
                onChange={handleChange}
                name="descripcion"
                id="descripcion"
                type="text"
                placeholder="Ingresa descripción"
                className="inputDatoDescription"
              >
                Ingrese descripción
              </textarea>
              <p>{formErrors.descripcion}</p>
            </div>
          </div>
          <div>
            <button>PUBLICAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarRegister;
