import React from "react";

const PersonalData = ({data, updateFieldHandler}) => {
    return (
        <div className="address-container">
            <div className="title-input">CPF</div>
            <input className="general-input"
                onKeyPress={(e) => checkNumber(e)}
                onChange={(e) => updateFieldHandler("cpf",e.target.value)}
            ></input>
    </div>
    )
}

const checkNumber = (e) => {
    if(isNaN(e.key)) {
        e.preventDefault();
    }
}

export default PersonalData