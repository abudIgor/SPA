import React, { useState } from "react";
import Header from "./components/Header";
import NextButton from "./components/NextButton"
import './App.css';

import {useChangeStep} from "./hooks/useChangeStep";

const App = () => {

  const stepsArr = [1,2,3,4,5];

  const {currentStep,changeStep} = useChangeStep(stepsArr);
  
  let isDisabledButton = false;

  const handleChangeStep = () => {
      changeStep(currentStep+1);
      setStateButton();
  }

  const setStateButton = () => {
    if(currentStep === stepsArr.length) {
      document.querySelector('button')?.classList.add('disabled');
      isDisabledButton = true;
    }
  }

  return (
    <>
      <div className="title">
        <h2 className="green-text">PROGRAMA</h2>
        <h2 className="simple-text">FIBRA</h2>
      </div>
      <div className = "container">
        <Header step = {currentStep}></Header>
        <NextButton onClick={handleChangeStep} isDisabled = {isDisabledButton}>Avançar</NextButton>
      </div>
    </>
  )
}

export default App;
