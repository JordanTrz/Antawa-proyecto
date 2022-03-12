import './modificarAuto.scss';
import { api } from '../../api/api';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import axios from 'axios';

const ModificarAuto = (props) => {
  const refPhotos = useRef();
  const history = useHistory();
  const userData = useSelector((state) => {
    return state.auth.userData;
  });

  const match = props.match.params.idcar;
  const [dataCar, setDataCar] = useState([]);
  const [dataPhoto, setDataPhoto] = useState([]);
  const [prevewPhoto, setPrevewPhoto] = useState([]);
  const photos_links = [];
  const [allBackCar, setAllBackCar] = useState({
    make: [],
    category: [],
    fuel: [],
    transmission: [],
    region: [],
  });

  const [dataSend, setDataSend] = useState({
    user_id: parseInt(userData.id),
    model_id: '',
    category_id: '',
    salePost_yearModel: '',
    salePost_yearManufacturing: '',
    salePost_kilometer: '',
    salePost_cylinder: '',
    salePost_door: '',
    salePost_color: '',
    salePost_price: '',
    salePost_newCar: '',
    transmission_id: '',
    fuel_id: '',
    region_id: '',
    salePost_description: '',
    photos: '',
    salePost_id: '',
  });

  const setDataToBack = (dataRes) => {
    setDataSend({
      salePost_id: parseInt(dataRes.salePost_id),
      photos: dataRes.photos,
      salePost_description: dataRes.salePost_description,
      salePost_yearModel: parseInt(dataRes.salePost_yearModel),
      salePost_yearManufacturing: parseInt(dataRes.salePost_yearManufacturing),
      salePost_kilometer: parseInt(dataRes.salePost_kilometer),
      salePost_cylinder: dataRes.salePost_cylinder,
      salePost_door: parseInt(dataRes.salePost_door),
      salePost_color: dataRes.salePost_color,
      salePost_price: parseInt(dataRes.salePost_price),
      salePost_newCar: false,
      user_id: parseInt(userData.id),
      model_id: parseInt(dataRes.model_id),
      category_id: parseInt(dataRes.category_id),
      transmission_id: parseInt(dataRes.transmission_id),
      fuel_id: parseInt(dataRes.fuel_id),
      region_id: parseInt(dataRes.region_id),
    });
  };
  const getBackData = async () => {
    const make = await api.get('/make');
    const category = await api.get('/category');
    const fuel = await api.get('/fuel');
    const transmission = await api.get('/transmission');
    const region = await api.get('/region');
    setAllBackCar({
      make: make.data.content,
      category: category.data.content,
      fuel: fuel.data.content,
      transmission: transmission.data.content,
      region: region.data.content,
    });
  };

  const getDataCar = async () => {
    await api.get(`salepost/${match}`).then((res) => {
      setDataCar(res.data.content);
      setDataToBack(res.data.content);
      setDataPhoto(res.data.content.photos);
    });
  };

  const handleSubmit = async () => {
    await api.put(`salepost/${dataSend.salePost_id}`, dataSend).then((res) => {
      // swal('Correcto', 'Actualización exitosa', 'success');
      swal2.fire('Correcto', 'Actualización exitosa', 'success');
      history.push('/autos-publicados');
    });
  };

  const handleDeleteImg = (e) => {
    swal2
      .fire({
        title: 'Confirmación',
        text: 'Una vez se elimine no se podrá recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2a9d8f',
        cancelButtonColor: '#e76f51',
        confirmButtonText: 'Sí, Eliminar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal2.fire(
            'Eliminado!',
            'Tu publicación ha sido eliminada',
            'success'
          );
        }
        const new_photos = dataSend.photos.filter(
          (photo) => photo.photo_id !== e.photo_id
        );
        setDataSend({ ...dataSend, photos: new_photos });
      });
  };

  const handleInsertImg = (e) => {
    // Mostrar solo 1 foto
    // const file = new FileReader()
    // file.onload = () =>{
    //   if(file.readyState == 2){
    //     setPrevewPhoto(file.result)
    //   }
    // }
    // file.readAsDataURL(e.target.files[0])

    Object.values(e.target.files).map(photo=>{
      console.log(photo)
      const formData = new FormData();
      formData.append("file",photo);
      formData.append("upload_preset","yvlnujk1");
      axios
        .post("https://api.cloudinary.com/v1_1/dlhsturyl/image/upload",formData)
        .then(res => {
          console.log(res)
            photos_links.push(res.data.url);
            if (photos_links.length == Object.keys(e.target.files).length){
              setDataSend({...dataSend,"photos":[...dataSend.photos,{photo_url:res.data.url}]})
            }
        })
    })

    // axios
    //   .post("https://api.cloudinary.com/v1_1/dlhsturyl/image/upload",formData)

  };

  console.log(dataSend)

  useEffect(() => {
    getDataCar();
    getBackData();
  }, []);

  return (
    <main>
      <div className="global__wrapper">
        <div className="wrapper__left">
          <div className="left__top">
            {dataSend.photos &&
              dataSend.photos.map((res) => {
                return (
                  <div className="leftTop__img">
                    <img src={res.photo_url} alt="imagen" />
                    <div
                      className="img__delete"
                      onClick={() => handleDeleteImg(res)}
                    >
                      x
                    </div>
                  </div>
                );
              })}
            <div className="left__button__img">
              {/* <button for="selectPhotos">Insertar Fotos</button> */}
              <label for="selectPhotos">Insertar Fotos</label>
              <input
                ref={refPhotos}
                type="file"
                style={{ display: 'none' }}
                name="photos"
                id="selectPhotos"
                onChange={handleInsertImg}
                multiple
              />
            </div>
          </div>
        </div>
        <div className="wrapper__right">
          <h2>Información del vehículo</h2>
          <div className="right__top">
            <div className="top__info">
              <h3>{dataSend.salePost_yearModel}</h3>
              <h3>{dataCar.make_type}</h3>
              <h3>{dataCar.model_type}</h3>
            </div>
            <div className="top__price">
              <span>$</span>{' '}
              <input
                name="salePost_price"
                type="number"
                value={dataSend.salePost_price}
                onChange={(e) =>
                  setDataSend({
                    ...dataSend,
                    salePost_price: parseInt(e.target.value),
                  })
                }
              />
              {/* <h3>$ {dataCar.salePost_price}</h3> */}
            </div>
          </div>
          <div className="right__information">
            <div className="information__bottom">
              <div className="information__wrapper left">
                <div>Kilometraje</div>
                {/* <div>{dataCar.salePost_kilometer} km.</div> */}
                <div>
                  <input
                    name="salePost_kilometer"
                    type="number"
                    value={dataSend.salePost_kilometer}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_kilometer: parseInt(e.target.value),
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="information__wrapper right">
                <div>Año de Modelo</div>
                {/* <div>{dataCar.salePost_yearModel}</div> */}
                <div>
                  <input
                    name="salePost_yearModel"
                    type="number"
                    value={dataSend.salePost_yearModel}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_yearModel: parseInt(e.target.value),
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="information__wrapper left">
                <div>Año de Fabricación</div>
                {/* <div>{dataCar.salePost_yearManufacturing}</div> */}
                <div>
                  <input
                    name="salePost_yearManufacturing"
                    type="number"
                    value={dataSend.salePost_yearManufacturing}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_yearManufacturing: parseInt(e.target.value),
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="information__wrapper right">
                <div>Categoría</div>
                {/* <div>{dataCar.category_type}</div> */}
                <div>
                  {/* <select> */}
                  <select
                    name="category_type"
                    id="category_id"
                    value={dataSend.category_id}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        category_id: parseInt(e.target.value),
                      })
                    }
                  >
                    {allBackCar.category &&
                      allBackCar.category.map((res) => {
                        return (
                          <option value={res.category_id} key={res.category_id}>
                            {res.category_type}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="information__wrapper left">
                <div>Combustible</div>
                {/* <div>{dataCar.fuel_type}</div> */}
                <div>
                  <select
                    name="fuel_type"
                    id="fuel_id"
                    value={dataSend.fuel_id}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        fuel_id: parseInt(e.target.value),
                      })
                    }
                  >
                    {allBackCar.fuel &&
                      allBackCar.fuel.map((res) => {
                        return (
                          <option value={res.fuel_id} key={res.fuel_id}>
                            {res.fuel_type}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="information__wrapper right">
                <div>Transmisión</div>
                {/* <div>{dataCar.transmission_type}</div> */}
                <div>
                  <select
                    name="transmission_type"
                    id="transmission_id"
                    value={dataSend.transmission_id}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        transmission_id: parseInt(e.target.value),
                      })
                    }
                  >
                    {allBackCar.transmission &&
                      allBackCar.transmission.map((res) => {
                        return (
                          <option
                            value={res.transmission_id}
                            key={res.transmission_id}
                          >
                            {res.transmission_type}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="information__wrapper left">
                <div>Región</div>
                {/* <div>{dataCar.region_type}</div> */}
                <div>
                  <select
                    name="region_type"
                    id="region_id"
                    value={dataSend.region_id}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        region_id: parseInt(e.target.value),
                      })
                    }
                  >
                    {allBackCar.region &&
                      allBackCar.region.map((res) => {
                        return (
                          <option value={res.region_id} key={res.region_id}>
                            {res.region_type}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="information__wrapper right">
                <div>Color</div>
                {/* <div>{dataCar.salePost_color}</div> */}
                <div>
                  <input
                    name="salePost_color"
                    type="text"
                    value={dataSend.salePost_color}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_color: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="information__wrapper left">
                <div>Puertas</div>
                {/* <div>{dataCar.salePost_door}</div> */}
                <div>
                  <select
                    name="salePost_door"
                    id="salePost_id"
                    value={dataSend.salePost_door}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_door: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="4" key={'4'}>
                      4
                    </option>
                    <option value="5" key={'5'}>
                      5
                    </option>
                  </select>
                </div>
              </div>
              <div className="information__wrapper right">
                <div>Cilindrada</div>
                {/* <div>{dataCar.salePost_cylinder}</div> */}
                <div>
                  <input
                    name="salePost_cylinder"
                    type="text"
                    value={dataSend.salePost_cylinder}
                    onChange={(e) =>
                      setDataSend({
                        ...dataSend,
                        salePost_cylinder: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="information__wrapper__desc">
              <div>Descripción</div>
              <div>
                <textarea
                  value={dataSend.salePost_description}
                  onChange={(e) =>
                    setDataSend({
                      ...dataSend,
                      salePost_description: e.target.value,
                    })
                  }
                  name="salePost_description"
                  id="salePost_id"
                  cols="30"
                  rows="15"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="right__button__update" onClick={handleSubmit}>
            <button>Actualizar</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ModificarAuto;
