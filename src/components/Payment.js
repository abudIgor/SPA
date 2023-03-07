import React from "react";

const Payment = ({data,updateFieldHandler}) => {
    return ( 
        <div className="products-container">
            <div className="info-container">
                Prezado cliente, em breve novas opções de pagamento (Cartão de Crédtio e Débito Automático em Conta Corrente) serão disponibilizadas.
            </div>
            <div className="title-input">Forma de pagamento</div>
            <select className="general-input" onChange={(e) => updateFieldHandler("paymentType",e.target.value)}>
                <option value="BoletoBancario">Boleto Bancario</option>
            </select>
            <div className="title-input">Data de Vencimento</div>
            <select className="general-input" onChange={(e) => updateFieldHandler("dueDate",e.target.value)}>
                <option value="Selecione">Selecione</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="10">15</option>
                <option value="25">25</option>
            </select>
        </div>
    )
}

export default Payment