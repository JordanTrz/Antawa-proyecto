import { ButtonLogReg } from "./buttonLogReg";
import { NavLink as Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { URL_BACKEND } from "../../api/environment";

function FormUpdate(){

  const FirtsInitialValues = useSelector((state) => {
    return state.auth.userData;
  })

  // const url = 'http://localhost:5000/vendedores';
  console.log(FirtsInitialValues)
  const url = `${URL_BACKEND}/user/${FirtsInitialValues.id}`;

  // const pageHome = '/';
  //De esta línea solo se cambio la ñ por la n de contraseña

  const initialValues = { nombre:FirtsInitialValues.nombre, apellido:FirtsInitialValues.apellido, email:FirtsInitialValues.email, contrasena:FirtsInitialValues.contrasena, dni:FirtsInitialValues.dni, celular:FirtsInitialValues.celular };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  console.log(initialValues)

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
      // axios
      // .put(url,formValues)
      URL_BACKEND.put(`/user/${FirtsInitialValues.id}`,formValues)
      .then(() => {
        console.log("Enviado a la base de datos")
      })
      swal("Correcto", "Registro exitoso", "success");
      // setTimeout(() => {
        history.push('/');
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
      <div>
      <ButtonLogReg TextoBtn="Actualizar  "/>
      </div>
      <div>
        <button className="Button__delete">Eliminar Cuenta</button>
      </div>
    </form>
  )
}

export { FormUpdate };