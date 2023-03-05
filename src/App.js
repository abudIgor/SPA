import React, {useState } from "react";

/*Import APIs*/
import apiCEP from "./api/apiCEP";

/*Import React Components*/
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import Cep from "./components/Cep";
import LeadData from "./components/LeadData";
import Products from "./components/Products";
import Slots from "./components/Slots";
import Address from "./components/Address";
import Order from "./components/Order";
import ModalErro from "./components/ModalErro";
import PersonalData from "./components/PersonsalData";

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
  productInfo : "",
  selectedSlot: "",
  bairro: "",
  numero : "",
  ddd : "",
  gia : "",
  ibge : "",
  localidade: "",
  logradouro: "",
  siafi : "",
  uf : "",
  addressWithoutNumber : "",
  cpf : ""
}

let products = []

let slotsAvaiable = []

let hasSelectedProduct = '';

let hasNumber = false;

const App = () => {

  const [buttonState, setButtonState] = useState(true);
  const [data, setData] = useState(formTemplate);
  const [productCode, setProductCode] = useState('');

  const updateFieldHandler = (key,value) => {
    if(key === "addressWithoutNumber") {
      handleNoNumber(value)
    }

    if(value?.nativeEvent?.srcElement?.id) {
      handleSelectedProduct(value.nativeEvent.srcElement.id);
      value = value.nativeEvent.srcElement.id;
      hasSelectedProduct = value
      if(key === 'selectedProductCode') {
        saveProductInfo(value)
      }
    }

    setData((prev) => {
      return {...prev, [key]: value};
    })
   
    handleChangeStateButton();
  }

  const saveProductInfo = (productCode) => {
    let productsCopy = JSON.parse(JSON.stringify(products))
    let productSelected = productsCopy.find(elem=> elem.productCode === productCode);
    setData((prev) => {
      return {...prev, productInfo: JSON.stringify(productSelected)};
    })
  }

  const handleNoNumber = (checkBoxValue) => {
    if(checkBoxValue) {
      document.querySelector('#number').classList.add("addres-without-number");
      document.querySelector('#number').value = ""
    } else {
      document.querySelector('#number').classList.remove("addres-without-number")
    }
    hasNumber = checkBoxValue;
    setData((prev) => {
      return {...prev, number: 'S/N'};
    })
  }

  const handleSelectedProduct = (selectedProduct) => {
    console.log('selectedProduct ->',selectedProduct)
    console.log('productCode ->',productCode)
    document.getElementById(productCode)?.classList.remove("selected-product");
    setProductCode(selectedProduct);
    document.getElementById(selectedProduct).classList.add("selected-product");
  }

  const handleChangeStateButton = () => {
    if      (currentStep === 1 && data.cep) enableButton()
    else if (currentStep === 2 && data.logradouro && (data.numero || hasNumber) && data.bairro && data.uf) enableButton()
    else if (currentStep === 3 && data.email && data.name && data.phone) enableButton()
    else if (currentStep === 4 && hasSelectedProduct) enableButton()
    else if (currentStep === 5 && data.cpf) enableButton()
    else if (currentStep === 6 && hasSelectedProduct) enableButton()
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
                          <Address hasNumber = {hasNumber} data={data} updateFieldHandler={updateFieldHandler}/>,
                          <LeadData data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Products data={data} updateFieldHandler={updateFieldHandler} products={products}/>,
                          <PersonalData data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Slots data={data} updateFieldHandler={updateFieldHandler} slotsAvaiable={slotsAvaiable}/>,
                          <Order data={data}/>];

  const {currentStep,changeStep,currentComponent} = useChangeStep(formComponents);

  const handleChangeStep = () => {

    if(currentStep === 1) {
      getAddressByCep(data.cep).then((resp) => {
        console.log('resp',resp.data)
        if(resp.data && resp.data.cep) {
          hiddenModal()
          Object.keys(resp.data).forEach(elem => {
            if(elem === "complemento") {
              updateFieldHandler("numero",resp.data[elem])
            } else {
              updateFieldHandler(elem,resp.data[elem])
            }
          }) 
          goToNextStep();
        } else {
          displayModalError()
        }
      }).catch((error) => {
        displayModalError()
      })
    }

    if(currentStep === 2) {
      goToNextStep();
    }
    
    if(currentStep === 3) {
      //TODO Save lead information
      getOffers();
      goToNextStep();
    }

    if(currentStep === 4) {
      goToNextStep();
    }

    if(currentStep === 5) {
      //Save Contact Information
      getSlots();
      goToNextStep();
    }

    if(currentStep === 6) {
      goToNextStep();
      hiddenButton();
    }

    if(currentStep === 7) {
      goToNextStep();
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
    console.log('currentStep',currentStep)
    if(currentStep === 5 && slotsAvaiable.length === 0) {
      enableButton()
    } else {
      disableButton();
    }
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
    if(parseInt(Math.random() * 3) === 0) return;
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
