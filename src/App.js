import React, { useState } from "react";

/*Import React Components*/
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import Address from "./components/Address";
import PersonalData from "./components/PersonalData";
import Products from "./components/Products";

/*Import Css*/
import './App.css';

/*Import Hooks*/
import {useChangeStep} from "./hooks/useChangeStep";

const formTemplate = {
  name : "",
  email: "",
  phone: "",
  address : "",
  productCode : "",
}

const products = [
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
    productName : 'Banda Larga 400 Megas',
    price       : '299.99'
  },
]

const App = () => {

  const [buttonState, setButtonState] = useState(true);
  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key,value) => {
    handleChangeStateButton();
    setData((prev) => {
      return {...prev, [key]: value};
    })
  }

  const handleChangeStateButton = () => {
    if      (currentStep === 1 && data.address) enableButton()
    else if (currentStep === 2 && data.email && data.name && data.phone) enableButton()
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
                          <Products data={data} updateFieldHandler={updateFieldHandler} products={products} />,
                          <Address/>,
                          <Address/>];

  const {currentStep,changeStep,currentComponent,isFinalStep} = useChangeStep(formComponents);

  const handleChangeStep = () => {
    console.log(currentStep)
    if(currentStep === 2) {
      getAdrress()
    }
    
    changeStep(currentStep+1);
    disableButton();
  }

  const getAdrress = () => {
    console.log('getAdress')
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
