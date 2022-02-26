import React, { Fragment, useEffect, useState } from "react";
import { api } from "./api";

const Categoria = () => {

  const [cat, setcat] = useState([]);

  useEffect(()=>{
    api
      .get("/category")
      .then((response)=>setcat(response.data.content))
      .catch((err)=>console.log(err))
  },[])

  return (
    <Fragment>
      {cat.map((itemC, index) => (
        <option key={index} value={itemC.category_type}>
          {itemC.category_type}
        </option>
      ))}
    </Fragment>
  );
};

export default Categoria;
