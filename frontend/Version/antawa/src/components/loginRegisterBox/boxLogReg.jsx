import React from "react";

function BoxLogReg(props){
  let {TituloBox} = props;
  return(
    <div className='Wrapper__LoginBox'>
        <div className="LoginBox">
          <h1>{TituloBox}</h1>
          {props.children}
        </div>
    </div>
  )
}

export { BoxLogReg }