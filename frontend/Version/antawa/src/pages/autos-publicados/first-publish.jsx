import primeraPub from "../../img/primera-publicacion.png";
import { NavLink as Link } from 'react-router-dom';

const FirstCarPublish = () => {
  return(
    <main>
      <div className="firstPub__wrapper">
        <div>
          <h1>¡Realiza tu primera publicación!</h1>
        </div>
        <div>
          <img src={primeraPub} />
        </div>
        <div>
          <Link to="/publicar-auto">
          <button>Registrar Auto</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default FirstCarPublish;