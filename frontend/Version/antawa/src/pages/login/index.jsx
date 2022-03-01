import { BoxLogReg } from "../../components/loginRegisterBox/boxLogReg";
import { FormLogin } from "../../components/loginRegisterBox/formLogin";

const Login = () => {

    return (
        <main>
            <BoxLogReg TituloBox="Ingresa tu cuenta">
              <FormLogin/>
            </BoxLogReg>
        </main>
    );
}

export default Login;

