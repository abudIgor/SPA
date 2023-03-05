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

const Slots = ({data,updateFieldHandler,slotsAvaiable}) => {
    if(slotsAvaiable && slotsAvaiable.length) {
        return (
            <div>
                <div className="products-container">
                    {slotsAvaiable.map(slot => (
                        <div className="product-container" key={slot.day+slot.hour} id={slot.day+slot.hour} onClick={(e) => updateFieldHandler("selectedSlot",e)}>
                            <div>{getFullTextDate(slot.day)}</div>
                            <div>{slot.hour}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="products-container">
                <div className="no-slots">
                    Não encontramos horários disponíveis para a visita do técnico, mas fique tranquilo,
                    seguiremos com sua compra e entraremos em contato em até 10 dias para agendarmos
                    uma data de instalação.
                </div>
            </div>
        )
    }
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


export default Slots