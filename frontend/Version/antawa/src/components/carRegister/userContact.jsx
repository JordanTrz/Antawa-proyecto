import { useSelector } from 'react-redux';


const UserContact = () => {

  const userData = useSelector((state) => {
    return state.auth.userData;
  });

  return(
    <div className="UserContact__Wrapper">
      <div className="UserContact__Data">
        <h3>Datos de Contacto</h3>
        <div className="UserContact__line"></div>
        <div>
          <div>
            <h2>Nombre</h2>
            <h2>{userData.nombre} {userData.apellido}</h2>
          </div>
          <div>
            <h2>Email</h2>
            <h2>{userData.email}</h2>
          </div>
          <div>
            <h2>Celular</h2>
            <h2>{userData.celular}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContact;