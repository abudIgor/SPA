import React from "react";

const Cep = ({data, updateFieldHandler}) => {

    return (
        <div className="address-container">
            <div className="title-input">Digite seu CEP</div>
            <input 
                onKeyPress={(e) => checkNumber(e)}
                className="general-input" 
                placeholder="CEP" 
                onChange={(e) => updateFieldHandler("cep",e.target.value)}>
            </input>
        </div>
    );
}

const checkNumber = (e) => {
    if(isNaN(e.key)) {
        e.preventDefault();
    }
}

export default Cep;