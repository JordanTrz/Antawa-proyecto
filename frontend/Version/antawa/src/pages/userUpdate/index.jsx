import { BoxLogReg } from "../../components/loginRegisterBox/boxLogReg";
import { FormUpdate } from "../../components/loginRegisterBox/formUpdate";

const UserUpdate = () => {
    return (
        <main>
          <div className="Register__Wrapper">
            <div className="Register__BoxWrapper">
              <BoxLogReg TituloBox="Actualizar datos">
                <FormUpdate/>
              </BoxLogReg>
            </div>
          </div>
        </main>
    );
}

export default UserUpdate;