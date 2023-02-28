import React from "react"; 

const ModalErro = () => {
    return (
        <div id="modalId" className="modal">
            <div className="close-icon-container">
                <div className="close-icon" onClick={() => teste()}>X</div>
            </div>
        </div>
    )
}

const teste = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
}

export default ModalErro