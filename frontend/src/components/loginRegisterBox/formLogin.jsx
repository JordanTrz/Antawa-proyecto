import { ButtonLogReg } from "./buttonLogReg";
import { NavLink as Link } from 'react-router-dom';
import { api } from "../../api/api";
import { URL_BACKEND } from "../../api/environment";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

function FormLogin(){
  const initialFormValues = {email:"", password:""};
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();
  const dispatch = useDispatch();

  let handleChange = (e) =>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]:value});
  }

  let handleGet = async (payloadJSON) => {
    await URL_BACKEND
      .get(`/user/${payloadJSON.user_id}`)
      .then((response) => {
        saveUserLocal(response.data.content)
      });
    await api
      .get(`/salepost/user/${payloadJSON.user_id}`)
      .then(res => {
        dispatch({
          type: 'SET_PUBLISH_CARS',
          payload: res.data.content,
        });
      })
  }

  const saveUserLocal = (dataUser) =>{
    let user = {
      "nombre": dataUser.first_name,
      "apellido": dataUser.last_name,
      "email": dataUser.email,
      "contraseña": dataUser.password,
      "id":dataUser.id,
      "dni": dataUser.extentuser.extentUser_dni,
      "celular": dataUser.extentuser.extentUser_cellphone,
    };
    dispatch({
      type: 'SET_LOGIN',
      payload: true,
    });

    dispatch({
      type: 'SET_USER',
      payload: user,
    });
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    const response = await
      URL_BACKEND
        .post('/user/login',{
          username:e.target.email.value, password:e.target.password.value
        });
    if (response.status === 200){
      let token = response.data.access;
      URL_BACKEND.defaults.headers['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('access_token', token)
      let payload = token.split('.')[1];
      let payloadDecoded = atob(payload)
      let payloadJSON = JSON.parse(payloadDecoded);
      handleGet(payloadJSON)
      swal("Bienvenido", "Contraseña correcta", "success");
      history.push('/');
    }
    else{
      swal("Error", "Contraseña incorrecta", "error");
    }
  }

  // -----------------------------------------

  return(
    <div className="LoginBox__form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" type="text" className="inputEmail" placeholder="Correo electrónico" required value={formValues.email} onChange={handleChange}/>
        </div>
        <div>
          <label>Contraseña</label>
          <input name="password" type="password" className="inputPassword" placeholder="Contraseña" required value={formValues.password} onChange={handleChange}/>
        </div>
        <div>
        <ButtonLogReg TextoBtn="Ingresar"/>
        </div>
        <div className="LoginBox__text">
          <h5>¿Olvidaste tu contraseña?</h5>
          <h5>Si no es miembro de Antawa, <Link to="/register">regístrate aquí</Link></h5>
        </div>
      </form>
    </div>

  )
}

export { FormLogin }