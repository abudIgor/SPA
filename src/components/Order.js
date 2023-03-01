import React from "react";

const mapOfDays = new Map([[0,"Segunda-Feira"],
                           [1,"Terça-Feira"],
                           [2,"Quarta-Feira"],
                           [3,"Quinta-Feira"],
                           [4,"Sexta-Feira"],
                           [5,"Sábado"],
                           [6,"Domingo"]])

const mapOfMonth = new Map([[0,"jan"],
                            [1,"fev"],
                            [2,"mar"],
                            [3,"abr"],
                            [4,"mai"],
                            [5,"jun"],
                            [6,"jul"],
                            [7,"ago"],
                            [8,"set"],
                            [9,"out"],
                            [10,"nov"],
                            [11,"dez"]])

const Order = ({data}) => {
    return (
        <div className="order-container">
            <div className="client-info-container">
                <div> Endereço </div>
                <div> {data.logradouro +" - "+ data.complemento +" - "+ data.localidade +" - "+ data.uf}</div>
            </div>
            <div className="client-info-container"> 
                <div> Cliente </div>
                <div> {data.name} </div>
            </div>
            <div className="client-info-container">
                <div>
                    <div> Contato </div>
                    <div> {data.phone + " - " + data.email} </div>
                </div>

            </div>
            <div className="client-info-container">
                <div> Oferta Selecionada </div>
                <div> {data.selectedProductCode} </div>
            </div>
            <div className="client-info-container">
                <div>Horário de Instalação</div>
                <div>{getFullTextDate(data.selectedSlot.slice(0,10)) + " às " + data.selectedSlot.slice(10,15)}</div>
            </div>
        </div>
    )
}

const getFullTextDate = (dateStr) => {
    let splittedData = dateStr.split("-")
    let date =  new Date(splittedData[2]+"-"+splittedData[1]+"-"+splittedData[0]);
    let day = splittedData[0];
    let month = mapOfMonth.get(date.getMonth());
    let weekDay = mapOfDays.get(date.getDay());
    let year = splittedData[2];

   return (day + " " + month + "/" + year + " (" + weekDay + ")")
}

export default Order;