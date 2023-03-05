import React from "react";

const Address = ({data,updateFieldHandler,hasNumber}) => {
   return (
    <div className="address-container">
        <div className="title-input">Rua</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("objLodragouro.logradouro",e.target.value)}
            value = {data.logradouro}
        ></input>
        <div className="title-input">Bairro</div>
        <input className="general-input"
            onChange={(e) => updateFieldHandler("bairro",e.target.value)}
            value = {data.bairro}
        ></input>
        <div className="title-input">Número</div>
        <input disabled = {hasNumber} id = "number"className="general-input"
            onChange={(e) => updateFieldHandler("numero",e.target.value)}
            value = {data.numero}
        ></input>
        <div className="checkbox-container">
            <input type="checkbox"
                onChange={(e) => updateFieldHandler("addressWithoutNumber",e.target.checked)}
            ></input>
            <div className="title-input">Endereço sem número</div>
        </div>   
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