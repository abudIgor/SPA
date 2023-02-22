import React, { useState } from "react";
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import Address from "./components/Address";
import PersonalData from "./components/PersonalData";

import './App.css';

import {useChangeStep} from "./hooks/useChangeStep";

const formTemplate = {
  name : "",
  email: "",
  phone: "",
  address : "",
}

const App = () => {

  const [buttonState, setButtonState] = useState(true);

  const [data, setData] = useState(formTemplate);

  const updateFieldHandler = (key,value) => {

    if(data.address) {
      document.querySelector('button')?.classList.add('enabled');
      setButtonState(false);
    } else {
      document.querySelector('button')?.classList.remove('enabled');
      setButtonState(true);
    }

    setData((prev) => {
      return {...prev, [key]: value};
    })

    console.log(data)
  }

  const formComponents = [<Address data={data} updateFieldHandler={updateFieldHandler}/>,
                          <PersonalData/>,
                          <Address/>,
                          <Address/>,
                          <Address/>];

  const {currentStep,changeStep,currentComponent,isFinalStep} = useChangeStep(formComponents);

  

  const handleChangeStep = () => {
      changeStep(currentStep+1);
      setStateButton();
  }

  const setStateButton = () => {
    if(isFinalStep) {
      document.querySelector('button')?.classList.add('disabled');
    }
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
