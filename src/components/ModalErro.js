import React from "react"; 

const ModalErro = (props) => {
    const errorMsg = new Map([[1,"Não foi possível consultar o CEP desejado. Tente novamente."],
                              [3,"Verifique o número do Telefone e tente novamente."]])

    return (
        <div id="modalId" className="modal">
            <div className="close-icon-container">
                <div className="close-icon" onClick={() => closeModal()}>X</div>
            </div>
            <div className="container-error-text">
                {errorMsg.get(props.step)}
            </div>
        </div>
    )
}

const closeModal = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
}

export default ModalErro