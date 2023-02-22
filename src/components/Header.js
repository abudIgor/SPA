import React from "react";
import '../App.css';

const Header = (props) => {
    const stepTile = new Map([[1,"CONSULTE SE TEM FIBRA NO SEU ENDEREÇO"],
                              [2,"INFORME SEUS DADOS"],
                              [3,"ESCOLHA UMA OFERTA DISPONÍVEL"],
                              [4,"ESCOLHA A FORMA DE PAGAMENTO"],
                              [5,"RESUMO DO PEDIDO"]])
    
    return (
        <div className="title-step">
            {stepTile.get(props.step)}
        </div>
    )


}

export default Header;