import React from "react"; 

const ModalErro = () => {
    return (
        <div id="modalId" className="modal">
            <div className="close-icon-container">
                <div className="close-icon" onClick={() => closeModal()}>X</div>
            </div>
            <div className="container-error-text">
                Não foi possível realizar a consulta para o seu CEP. Verifique o valor inserido e tente novamente.
            </div>
        </div>
    )
}

const closeModal = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
}

export default ModalErro