import React from "react";

const Cep = ({data, updateFieldHandler}) => {

    return (
        <div className="address-container">
            <div className="title-input">Digite seu CEP</div>
            <input 
                className="general-input" 
                placeholder="CEP" 
                onChange={(e) => updateFieldHandler("cep",e.target.value)}>
            </input>
        </div>
    );
}

export default Cep;