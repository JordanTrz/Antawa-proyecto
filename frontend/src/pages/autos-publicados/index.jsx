import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { api } from "../../api/api";
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const CarsPublished = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userData.id)
  const [carPublished,setCarPublished] = useState([]);

  const dataCarsPublished = async ()=>{
    await api
      .get(`/salepost/user/${userID}`)
      .then((res) => {
        setCarPublished(res.data.content);
        dispatch({
          type: 'SET_PUBLISH_CARS',
          payload: res.data.content
        });
        if (res.data.content.length<1){
        history.push('/primera-publicacion')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  useEffect(()=>{
    dataCarsPublished();
  },[])

  const handleRemoveBox = async (id) =>{
    await api.delete(`salepost/${id.target.value}`);
    dataCarsPublished();
  }

  return(
    <div className="main_buscar_auto_publish">
      <div className="publishCar__wrapper">
        {carPublished && carPublished.length == 0 ? '' : carPublished.map((e,i)=>{
          return(
          <div className="publishCar__data">
            <h1>Publicación #{i+1}</h1>
            <div>
              <div>
                <img src={e.photos[0].photo_url}/>
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
          <div  className="butonDeleteCars">
            <button value={e.salePost_id} onClick={handleRemoveBox} >X</button>
          </div>
        </div>)
        })

      }
      </div>
      <div className="btnPublicarCars">
        <Link to="/publicar-auto">
          <button>Publicar</button>
        </Link>
      </div>
    </div>
  )
}

export default CarsPublished;