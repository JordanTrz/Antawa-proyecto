import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { api } from '../../api/api';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Card_car from './Card_car';

const CarsPublished = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userData.id);
  const [carPublished, setCarPublished] = useState([]);
  const [updateCar, setUpdateCar] = useState([]);

  const dataCarsPublished = async () => {
    await api
      .get(`/salepost/user/${userID}`)
      .then((res) => {
        setCarPublished(res.data.content);
        dispatch({
          type: 'SET_PUBLISH_CARS',
          payload: res.data.content,
        });
        if (res.data.content.length < 1) {
          history.push('/primera-publicacion');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveBox = async (id) => {
    // await api
    //   .delete(`salepost/${id.target.value}`)
    //   .then(res=>swal('Correcto', 'Actualización exitosa', 'success'));
    // dataCarsPublished();

    swal2.fire({
      title: 'Confirmación',
      text: "Una vez se elimine no se podrá recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a9d8f',
      cancelButtonColor: '#e76f51',
      confirmButtonText: 'Sí, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        swal2.fire(
          'Eliminado!',
          'Tu publicación ha sido eliminada',
          'success'
        );
        api
        .delete(`salepost/${id.target.value}`)
        .then(res=>{
          dataCarsPublished();
        });
      }
    })

  };

  useEffect(() => {
    dataCarsPublished();
  }, []);

  return (
    <div className="main_buscar_auto_publish">
      <div className="publishCar__wrapper">
        {carPublished && carPublished.length == 0
          ? ''
          : carPublished.map((e, i) => {
              return (
                <Card_car values={{e,i}} handleRemoveBox={handleRemoveBox}/>
              );
            })}
      </div>
      <div className="btnPublicarCars">
        <Link to="/publicar-auto">
          <button>Publicar</button>
        </Link>
      </div>
    </div>
  );
};

export default CarsPublished;
