import React from "react";

const LeadData = ({data, updateFieldHandler}) => {

    return (
        <div className="address-container">
            <div className="title-input">Nome Completo</div>
            <input className="general-input"
                onChange={(e) => updateFieldHandler("name",e.target.value)}
            ></input>
            <div className="title-input">Telefone</div>
            <input className="general-input"
                onKeyPress={(e) => checkNumber(e)}
                onChange={(e) => updateFieldHandler("phone",e.target.value)}
            ></input>

            <div className="title-input">E-mail</div>
            <input className="general-input"
                onChange={(e) => updateFieldHandler("email",e.target.value)}
            ></input>
        </div>
    );
}

const checkNumber = (e) => {
    if(isNaN(e.key)) {
        e.preventDefault();
    }
}


export default LeadData;