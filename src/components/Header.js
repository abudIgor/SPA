import React from "react";
import '../App.css';

const Header = (props) => {
    const stepTile = new Map([[1,"CONSULTE SE TEM FIBRA NO SEU ENDEREÇO"],
                              [2,"CONFIRME SEU ENDEREÇO"],
                              [3,"INFORME SEUS DADOS"],
                              [4,"ESCOLHA UMA OFERTA DISPONÍVEL"],
                              [5,"ESCOLHA A FORMA DE PAGAMENTO"],
                              [6,"RESUMO DO PEDIDO"]])
    
    return (
        <div className="title-step">
            {stepTile.get(props.step)}
        </div>
    )


}

export default Header;