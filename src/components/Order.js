import React from "react";

const Order = ({data}) => {
    return (
        <div>
            <div> 
                <div> Cliente </div>
                <div> {data.name} </div>
            </div>
            <div>
                <div> Endereço </div>
                <div> {data.logradouro + data.complemento + data.localidade + data.uf}</div>
            </div>
            <div>
                <div>
                    <div> Contato </div>
                    <div> {data.phone + data.email} </div>
                </div>

            </div>
            <div>
                <div> Oferta Selecionada </div>
                <div> {data.selectedProductCode} </div>
            </div>
            <div>
                <div>Horário de Instalação</div>
                <div>{data.selectedSlot}</div>
            </div>
        </div>
    )
}

export default Order;