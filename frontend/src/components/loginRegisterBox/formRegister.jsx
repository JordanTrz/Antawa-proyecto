import { ButtonLogReg } from "./buttonLogReg";
import { NavLink as Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { URL_BACKEND } from "../../api/environment";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { api } from "../../api/api";

function FormRegister(){

  const url = `${URL_BACKEND}/user`
  // const url_create = 'http://127.0.0.1:8000/user';
  const url_create = 'http://34.238.235.4:8000/user';
  // const pageHome = '/';
  const initialValues = { nombre:"", apellido:"", email:"", contrasena:"", dni:"", celular:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));
  }

  useEffect( async () => {
    if(Object.keys(formErrors).length === 0 && isSubmit){

      const alldata = {
          username: formValues.email,
          password:formValues.contrasena,
          first_name:formValues.nombre,
          last_name:formValues.apellido,
          email:formValues.email,
          extentuser:{
            extentUser_dni:formValues.dni,
            extentUser_cellphone:formValues.celular
          }
      }

      console.log(alldata)

      // await axios
      // api
      // .post('/user',
      await URL_BACKEND
      .post('/user',
        alldata
        )
      .then(() => {
        console.log("Enviado a la base de datos");
      })
      swal("Correcto", "Registro exitoso", "success");
      // setTimeout(() => {
        history.push('/login');
      // }, 1000);
    }

  },[formErrors])

  const validate = (values) =>{
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if(!values.nombre){
      errors.nombre = "Es obligatorio ingresar su nombre";
    }
    if(!values.apellido){
      errors.apellido = "Es obligatorio ingresar su apellido";
    }
    if(!values.email){
      errors.email = "Es obligatorio ingresar su correo";
    } else if(!regex.test(values.email)){
      errors.email = "No es un correo válido";
    }
    if(!values.contrasena){
      errors.contrasena = "Es obligatorio ingresar su contraseña";
    } else if(values.contrasena.length < 4 ){
      errors.contrasena = "La contraseña no puede tener menor de 4 caractéres";
    } else if (values.contrasena.length > 10){
      errors.contrasena = "La contraseña no puede tener mayor de 10  caractéres";
    }
    if(!values.dni){
      errors.dni = "Es obligatorio ingresar su dni";
    } else if(values.dni.length < 8 || values.dni.length > 8){
      errors.dni = "DNI inválido";
    }
    if(!values.celular){
      errors.celular = "Es obligatorio ingresar su celular";
    } else if (values.celular.length < 9 || values.celular.length > 9){
      errors.celular = "Número de celular inválido";
    }

    return errors;
  }

  return(
      <form className="FormRegister" onSubmit={handleSubmit}>
        <div className="FormRegister__2row inputHigh">
          <div className="FormRegister__divHigh">
            <input type="text" name="nombre" placeholder="Nombre" value={formValues.nombre} onChange={handleChange}/>
            <p>{formErrors.nombre}</p>
          </div>
          <div className="FormRegister__divHigh">
            <input type="text" name="apellido" placeholder="Apellido" value={formValues.apellido} onChange={handleChange}/>
            <p>{formErrors.apellido}</p>
          </div>
        </div>
        <div className="FormRegister__1row inputHigh FormRegister__divHigh" >
          <input type="text" name="email" placeholder="Correo Electrónico" value={formValues.email} onChange={handleChange}/>
          <p>{formErrors.email}</p>
        </div>
        <div className="FormRegister__1row inputHigh FormRegister__divHigh">
          <input type="password" name="contrasena" placeholder="Contraseña" value={formValues.contrasena} onChange={handleChange}/>
          <p>{formErrors.contraseña}</p>
        </div>
        <div className="FormRegister__2row inputHigh">
          <div className="FormRegister__divHigh">
            <input type="number" name="dni" placeholder="DNI" value={formValues.dni} onChange={handleChange}/>
            <p>{formErrors.dni}</p>
          </div>
          <div className="FormRegister__divHigh">
            <input type="number" name="celular" placeholder="Celular" value={formValues.celular} onChange={handleChange}/>
            <p>{formErrors.celular}</p>
          </div>
        </div>
        <div className="FormRegister__check">
          <label><input type="checkbox"/> Acepto las Políticas de privacidad de Antawa</label>
          <label><input type="checkbox"/> Acepto los Términos y condiciones de Antawa</label>
          <label><input type="checkbox"/> Autorizo el uso de mis datos para Fines adicionales.</label>
        </div>
        <div>
        <ButtonLogReg TextoBtn="Registrar"/>
        </div>
        <div className="LoginBox__text">
          <h5>¿Ya tienes una cuenta? <span><Link to="/login">Ingresa</Link></span> </h5>
        </div>
      </form>
  )
}

export { FormRegister };