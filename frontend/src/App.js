import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./sass/App.css";
import Navbar from "./components/header/Navbar/Navbar";

import Home from "./pages/landing-page/index";
import Login from "./pages/login/index";
import Register from "./pages/registerUser";
import BcrAuto from "./pages/buscar-auto/index";
import DetAuto from "./pages/detalle-auto";
import CarsPublished from "./pages/autos-publicados";
import FirstCarPublish from "./pages/autos-publicados/first-publish";
import ContactForm from "./pages/usados/index";
import PublshCar from './pages/publicar-auto';
import UserUpdate from "./pages/userUpdate";
import ModificarAuto from "./pages/modificar-auto/ModificarAuto";

import { store, persistor } from "./store/";
// import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar />

            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/ANTAWA" component={Home} /> */}
              <Route exact path="/buscar-auto" component={BcrAuto} />
              <Route exact path="/detalle/:idcard" component={DetAuto} />
              <Route exact path="/contactform" component={ContactForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/publicar-auto" component={PublshCar} />
              <Route exact path="/autos-publicados" component={CarsPublished} />
              <Route exact path="/primera-publicacion" component={FirstCarPublish} />
              <Route exact path="/user-update" component={UserUpdate} />
              <Route exact path="/modificar-auto/:idcar" component={ModificarAuto} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
