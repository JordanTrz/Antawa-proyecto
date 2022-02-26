import { BoxLogReg } from "../../components/loginRegisterBox/boxLogReg";
import { RightRegister } from "../../components/loginRegisterBox/rightRegister";
import { FormRegister } from "../../components/loginRegisterBox/formRegister";

const Register = () => {
    return (
        <main>
          <div className="Register__Wrapper">
            <div className="Register__BoxWrapper">
              <BoxLogReg TituloBox="Regístrate">
                <FormRegister/>
              </BoxLogReg>
            </div>
            <RightRegister/>
          </div>
        </main>
    );
}

export default Register;