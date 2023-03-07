import React from "react";
import '../App.css';

const Header = (props) => {
    const stepTile = new Map([[1,"CONSULTE SE TEM FIBRA NO SEU ENDEREÇO"],
                              [2,"CONFIRME SEU ENDEREÇO"],
                              [3,"ANTES DE CONTINUARMOS, INFORME SEUS DADOS DE CONTATO"],
                              [4,"ESCOLHA UMA OFERTA DISPONÍVEL"],
                              [5,"VAMOS PRECISAR DE MAIS ALGUMAS INFORMAÇÕES"],
                              [6,"INSTALAÇÃO"],
                              [7,"PAGAMENTO"],
                              [8,"PARABÉNS, VOCÊ AGORA É UM CLIENTE DO PROGRAMAFIBRA"]])
    
    const stepSubtitle = new Map([[1,""],
                                [2,""],
                                [3,""],
                                [4,""],
                                [5,""],
                                [6,""],
                                [7,"Escolhe um método de pagamento"],
                                [8,"Confira aqui o resumo de sua compra"]])

    return (
        <>
            <div className="title-step">
                {stepTile.get(props.step)}
            </div>
            <div className="subtitle-step">
                {stepSubtitle.get(props.step)}
            </div>
        </>
        
    )


}

export default Header;