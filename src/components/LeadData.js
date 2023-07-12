import React from "react";

const LeadData = ({data, updateFieldHandler}) => {

    return (
        <div className="address-container">
            <div className="title-input">Nome Completo</div>
            <input  placeholder="José Silva" className="general-input" 
                onChange={(e) => updateFieldHandler("name",e.target.value)}
            ></input>
            <div className="title-input">Telefone</div>
            <input placeholder="(DD) 999999999" className="general-input"
                onKeyPress={(e) => checkNumber(e)}
                onChange={(e) => updateFieldHandler("phone",e.target.value)}
            ></input>

            <div className="title-input">E-mail</div>
            <input placeholder="jose.silva@email.com" className="general-input"
                onChange={(e) => updateFieldHandler("email",e.target.value)}
            ></input>
            <div className="checkbox-container">
                <input type="checkbox"
                    onChange={(e) => updateFieldHandler("agreementSharingData",e.target.checked)}
                ></input>
                <div className="title-input-small"> Concordo a políticas de dados</div>
            </div>
        </div>
    );
}

const checkNumber = (e) => {
    if(isNaN(e.key)) {
        e.preventDefault();
    }
}


export default LeadData;