import React, { useState } from "react";
import "../App.css"

const NextButton = ({children,onClick,isDisabled}) => {
    
    return (
        <div className="container-button">
            <button onClick={onClick} className="button" disabled={isDisabled} >
                {children}
            </button>
        </div>
    )
}

export default NextButton;