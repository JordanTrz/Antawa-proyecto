import React, { Fragment, useState, useEffect } from 'react';
import auto from '../../img/auto.png';

const Banner = () => {
  return (
    <div class="banner">
      {/* <img src={auto} alt="" /> */}
      <div className="banner__slogan__div">
        <h1 class="banner__slogan">Encuentra el auto de tus sueños</h1>
      </div>
    </div>
  );
};

export default Banner;