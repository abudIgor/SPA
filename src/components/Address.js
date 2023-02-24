import React from "react";

const Address = ({data,updateFieldHandler,addressObj}) => {
   return (
    <div className="address-container">
        <div className="title-input">Rua</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("logradouro",e.target.value)}
            value = {data.logradouro}
        ></input>
        <div className="title-input">Bairro</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("bairro",e.target.value)}
            value = {data.bairro}
        ></input>
        <div className="title-input">Complemento</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("complemento",e.target.value)}
            value = {data.complemento}
        ></input>
        <div className="title-input">Cidade</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("localidade",e.target.value)}
            value = {data.localidade}
        ></input>
        <div className="title-input">Estado</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("uf",e.target.value)}
            value = {data.uf}
        ></input>
    </div>
   )
}

export default Address