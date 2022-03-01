import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import Banner from "../../components/landingComponents/Banner";
import Formulario from "../../components/landingComponents/Formulario";

import "./landingPage.scss"

import img_background from "../../img/cars_banner_background.jpg"

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const marcas = useSelector((state) => state.car.cars);

  function Search() {
    history.push({
      pathname: `/buscar-auto`,
      search: window.location.search,
    });
  }

  useEffect(() => {
    api
      .get("/make")
      .then((response)=>{
        dispatch({
          type:"SET_CARS",
          payload: response,
      })})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main__wrapper">
        <img className="wrapper__img" src={img_background} alt="logo"/>
        <div className="wrapper__section">
          {/* <main> */}
            <Banner />
            <Formulario
              marcas={marcas}
              onSubmit={(payload) => {
              Search(payload);
              }}
            />
          {/* </main> */}
        </div>

    </div>
  );
};

export default Home;