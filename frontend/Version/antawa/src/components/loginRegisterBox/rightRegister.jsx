import imgRegister1 from "../../img/register_1.png";
import imgRegister2 from "../../img/register_2_new.png";
import imgRegister3 from "../../img/register_3.png";

function RightRegister(){
  return(
      <div className="RightRegister">
        <h3>¿Por qué registrarse?</h3>
        <div className="RightRegister__txtImg">
          <div>
            <img src={imgRegister1} alt={imgRegister1}/>
            <p>Transacciones seguras y entrega de vehículos en el menor tiempo posible</p>
          </div>
          <div>
            <p>Contacto directo con vendedores de tu localidad</p>
            <img src={imgRegister2} alt={imgRegister2}/>
          </div>
          <div>
            <img src={imgRegister3} alt={imgRegister3}/>
            <p>Variedad de modelos y marcas a tu disposición</p>
          </div>
        </div>
      </div>
  )
}

export { RightRegister }