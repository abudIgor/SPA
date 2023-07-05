import React, { useState } from "react";
import "../App.css"

const ModalErro = ({msg}) => {
 
    return (
        <div id="modalId" className="modal">
            <div className="close-icon-container">
                <div className="close-icon" onClick={() => closeModal()}>X</div>
            </div>
            <div className="container-error-text">
                {msg}
            </div>
        </div>
    )
}

const closeModal = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
}

export default ModalErro