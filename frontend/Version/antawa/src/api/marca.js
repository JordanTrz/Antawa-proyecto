import React, { useEffect, Fragment, useState } from "react";

const Marc = (props) => {
  //   const urlMarca = "http://localhost:5000/marcas";
  //   const [marcaA, setmarcaA] = useState([]);

  //   const fetchMarca = () => {
  //     fetch(urlMarca)
  //       .then((response) => response.json())
  //       .then((data) => setmarcaA(data))
  //       .catch((err) => console.log(err));
  //   };
  //   useEffect(() => {
  //     fetchMarca(urlMarca);
  //   }, []);

  return (
    <Fragment>
      {/* {marcaA.map((mitems, index) => (
        <option key={index} value={mitems.id}>
          {mitems.marca}
        </option>
      ))} */}
    </Fragment>
  );
};

export default Marc;
