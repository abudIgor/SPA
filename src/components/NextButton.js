import React, { useState } from "react";
import "../App.css"

const NextButton = ({children,onClick,isDisabled}) => {

    const mapButtonMessage = new Map ([[1,"Consultar Endereço"],
                                       [2,"Inserir Dados"],
                                       [3,"Avançar"],
                                       [4,"Avançar"],
                                       [5,"Avançar"],
                                       [5,"Avançar"]]);
    
    return (
        <div className="container-button">
            <button onClick={onClick} className="button" disabled={isDisabled} >
                {mapButtonMessage.get(children)}
            </button>
        </div>
    )
}

export default NextButton;