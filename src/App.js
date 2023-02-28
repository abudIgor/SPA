import React, {useState } from "react";

/*Import APIs*/
import apiCEP from "./api/apiCEP";

/*Import React Components*/
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import Cep from "./components/Cep";
import PersonalData from "./components/PersonalData";
import Products from "./components/Products";
import Slots from "./components/Slots";
import Address from "./components/Address";
import Order from "./components/Order";
import ModalErro from "./components/ModalErro";

/*Import Css*/
import './App.css';

/*Import Hooks*/
import {useChangeStep} from "./hooks/useChangeStep";


const formTemplate = {
  name : "",
  email: "",
  phone: "",
  cep : "",
  selectedProductCode : "",
  selectedSlot: "",
  bairro: "",
  complemento : "",
  ddd : "",
  gia : "",
  ibge : "",
  localidade: "",
  logradouro: "",
  siafi : "",
  uf : ""
}

let products = []

let slotsAvaiable = []

let hasSelectedProduct = '';

let showErrorModal = false;

const App = () => {

  const [buttonState, setButtonState] = useState(true);
  const [data, setData] = useState(formTemplate);
  const [productCode, setProductCode] = useState({});

  const updateFieldHandler = (key,value) => {
    if(value?.nativeEvent?.srcElement?.id) {
      handleSelectedProduct(value.nativeEvent.srcElement.id);
      value = value.nativeEvent.srcElement.id;
      hasSelectedProduct = value
    }

    setData((prev) => {
      return {...prev, [key]: value};
    })
   
    handleChangeStateButton();
  }

  const handleSelectedProduct = (selectedProduct) => {
    if(selectedProduct !== productCode) {
      document.getElementById(productCode)?.classList.remove("selected-product");
      setProductCode(selectedProduct);
      document.getElementById(selectedProduct).classList.add("selected-product");
    }
  }

  const handleChangeStateButton = () => {
    if      (currentStep === 1 && data.cep) enableButton()
    else if (currentStep === 2 && data.logradouro && data.complemento && data.complemento && data.bairro && data.uf) enableButton()
    else if (currentStep === 3 && data.email && data.name && data.phone) enableButton()
    else if (currentStep === 4 && hasSelectedProduct) enableButton()
    else if (currentStep === 5 && hasSelectedProduct) enableButton()
    else disableButton()
  }

  const hiddenButton = () => {
    document.querySelector('button')?.classList.add('hidden-button');
  }

  const enableButton = () => {
    document.querySelector('button')?.classList.add('enabled');
    setButtonState(false);
  }

  const disableButton = () => {
    document.querySelector('button')?.classList.remove('enabled');
    setButtonState(true);
  }

  const formComponents = [<Cep data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Address data={data} updateFieldHandler={updateFieldHandler}/>,
                          <PersonalData data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Products data={data} updateFieldHandler={updateFieldHandler} products={products}/>,
                          <Slots data={data} updateFieldHandler={updateFieldHandler} slotsAvaiable={slotsAvaiable}/>,
                          <Order data={data}/>];

  const {currentStep,changeStep,currentComponent} = useChangeStep(formComponents);

  const handleChangeStep = () => {
    console.log('currentStep',currentStep)
    if(currentStep === 1) {
      getAddressByCep(data.cep).then((resp) => {
        console.log('resp',resp.data)
        if(resp.data && resp.data.cep) {
          hiddenModal()
          Object.keys(resp.data).forEach(elem => {
            updateFieldHandler(elem,resp.data[elem])
          })
          goToNextStep();
        } else {
          displayModalError()
          console.log('Erro na consulta do CEP')
        }
      }).catch((error) => {
        displayModalError()
        console.log('Erro na consulta do CEP')
      })
    }

    if(currentStep === 2) {
      goToNextStep();
    }
    
    if(currentStep === 3) {
      getOffers();
      goToNextStep();
    }

    if(currentStep === 4) {
      getSlots();
      goToNextStep();
    }

    if(currentStep === 5) {
      goToNextStep();
      hiddenButton();
    }
  }

  const displayModalError = () => {
    document.querySelector('#modalId')?.classList.remove('hidden-modal');
    document.querySelector('#modalId')?.classList.add('display-modal');
  }

  const hiddenModal = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
  }

  const goToNextStep = () => {
    changeStep(currentStep+1);
    disableButton();
    console.log('data>>>',data)
  }

  const getOffers = () => {
    products = [ 
      {
        productCode : 'BL_100MB',
        productName : 'Banda Larga 100 Megas',
        price       : '99.99'
      },
      {
        productCode : 'BL_200MB',
        productName : 'Banda Larga 200 Megas',
        price       : '129.99'
      },
      {
        productCode : 'BL_300MB',
        productName : 'Banda Larga 300 Megas',
        price       : '199.99'
      },
      {
        productCode : 'BL_400MB',
        productName : 'Banda Larga 400 Megas',
        price       : '259.99'
      },
      {
        productCode : 'BL_500MB',
        productName : 'Banda Larga 500 Megas',
        price       : '299.99'
      },
    ]
  }

  const getSlots = () => {
    slotsAvaiable = [
      {
        day  : "23-02-2023",
        hour : "08:00"
      },
      {
        day  : "23-02-2023",
        hour : "09:00"
      },
      {
        day  : "23-02-2023",
        hour : "09:30"
      },
      {
        day  : "24-02-2023",
        hour : "10:30"
      },
      {
        day  : "25-02-2023",
        hour : "08:30"
      },
    ]
  }

  const getAddressByCep = async (cep) => {
    const res = await apiCEP.get(cleanCep(cep)+"/json");
    return await res;
  }

  const cleanCep = (cep) => {
    return cep.replace(/\s/g, "");
  }

  return (
    <>
      <div className="title">
        <h2 className="green-text">PROGRAMA</h2><h2 className="simple-text">FIBRA</h2>
      </div>
      <div className = "container">
        <Header step = {currentStep}></Header>
        <form className="container-form">
          <div>{currentComponent}</div>
          <ModalErro></ModalErro>
        </form>
        
        
        <NextButton onClick={handleChangeStep} isDisabled = {buttonState}>{currentStep}</NextButton>
      </div>
    </>
  )
}

export default App;
