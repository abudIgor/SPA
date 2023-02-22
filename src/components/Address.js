import React from "react";

const Address = ({data, updateFieldHandler}) => {

    return (
        <div className="address-container">
            <div className="title-input">Digite seu endereço</div>
            <input 
                className="general-input" 
                placeholder="Endereço/CEP" 
                onBlur={(e) => updateFieldHandler("address",e.target.value)}>
            </input>
        </div>
    );
}

export default Address;