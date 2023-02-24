import React, { useState } from "react";

/*Import React Components*/
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import Address from "./components/Address";
import PersonalData from "./components/PersonalData";
import Products from "./components/Products";
import Slots from "./components/Slots";

/*Import Css*/
import './App.css';

/*Import Hooks*/
import {useChangeStep} from "./hooks/useChangeStep";

const formTemplate = {
  name : "",
  email: "",
  phone: "",
  address : "",
  selectedProductCode : "",
  selectedSlot: ""
}

let products = [
]

const slotsAvaiable = [
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

let hasSelectedProduct = ''

const App = () => {

  const [buttonState, setButtonState] = useState(true);
  const [data, setData] = useState(formTemplate);
  const [productCode, setProductCode] = useState();

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
    if      (currentStep === 1 && data.address) enableButton()
    else if (currentStep === 2 && data.email && data.name && data.phone) enableButton()
    else if (currentStep === 3 && hasSelectedProduct) enableButton()
    else if (currentStep === 4 && hasSelectedProduct) enableButton()
    else     disableButton()
  }

  const enableButton = () => {
    document.querySelector('button')?.classList.add('enabled');
    setButtonState(false);
  }

  const disableButton = () => {
    document.querySelector('button')?.classList.remove('enabled');
    setButtonState(true);
  }

  const formComponents = [<Address data={data} updateFieldHandler={updateFieldHandler}/>,
                          <PersonalData data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Products data={data} updateFieldHandler={updateFieldHandler} products={products}/>,
                          <Slots data={data} updateFieldHandler={updateFieldHandler} slotsAvaiable={slotsAvaiable}/>,
                          <Address/>];

  const {currentStep,changeStep,currentComponent,isFinalStep} = useChangeStep(formComponents);

  const handleChangeStep = () => {
    
    if(currentStep === 2) {
      getOffers();
    }
    
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

  return (
    <>
      <div className="title">
        <h2 className="green-text">PROGRAMA</h2><h2 className="simple-text">FIBRA</h2>
      </div>
      <div className = "container">
        <Header step = {currentStep}></Header>
        <form className="container-form">
          <div>{currentComponent}</div>
        </form>
        <NextButton onClick={handleChangeStep} isDisabled = {buttonState}>{currentStep}</NextButton>
      </div>
    </>
  )
}

export default App;
