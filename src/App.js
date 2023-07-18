import React, {useState } from "react";

/*Import Static Files*/
import catalog from "./staticFiles/offers";
import slots from "./staticFiles/slots";

/*Import APIs*/
import apiCEP from "./api/apiCEP";
import apiLead from "./api/apiLead";

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
import Payment from "./components/Payment";
import LoadingSpinner from "./components/Spinner";
import ModalExistingLead from "./components/ModalExistingLead";


/*Import Css*/
import './App.css';

/*Import Hooks*/
import {useChangeStep} from "./hooks/useChangeStep";

/*Import Utils*/
import helpers from "./utils/helpers";

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
  cpf : "",
  paymentType : "BoletoBancario",
  dueDate: "",
  agreementSharingData: "",
}

let products = []

let slotsAvaiable = []

let hasSelectedProduct = '';

let hasNumber = false;

let paymentInfo = {
  paymentType : "BoletoBancario",
  dueDate : "",
}

let agreementShareData = false;

const App = () => {

  const [msgError, setMsgError] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [data, setData] = useState(formTemplate);
  const [productCode, setProductCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateFieldHandler = (key,value) => {
    if(key === "addressWithoutNumber") handleNoNumber(value)

    if(key === "agreementSharingData") agreementShareData = value;

    if(key === "paymentType") paymentInfo.paymentType = value;

    if(key === "dueDate") paymentInfo.dueDate = value;

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
    document.getElementById(productCode)?.classList.remove("selected-product");
    setProductCode(selectedProduct);
    document.getElementById(selectedProduct).classList.add("selected-product");
  }

  const handleChangeStateButton = () => {
    if      (currentStep === 1 && data.cep) enableButton()
    else if (currentStep === 2 && data.logradouro && (data.numero || hasNumber) && data.bairro && data.uf) enableButton()
    else if (currentStep === 3 && data.email && data.name && data.phone && agreementShareData) enableButton()
    else if (currentStep === 4 && hasSelectedProduct) enableButton()
    else if (currentStep === 5 && data.cpf) enableButton()
    else if (currentStep === 6 && hasSelectedProduct) enableButton()
    else if (currentStep === 7 && paymentInfo.dueDate && paymentInfo.paymentType) enableButton()
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
                          <Payment data={data} updateFieldHandler={updateFieldHandler}/>,
                          <Order data={data}/>];

  const {currentStep,changeStep,currentComponent} = useChangeStep(formComponents);

  const handleChangeStep = () => {

    if(currentStep === 1) {
      getAddressByCep(data.cep).then((resp) => {
        if(resp.data && resp.data.cep) {
          setIsLoading(false)
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
          setMsgError('Não foi possível consultar o CEP desejado. Tente novamente.')
          displayModalError()
          setIsLoading(false)
        }
      }).catch((error) => {
        setMsgError('Não foi possível consultar o CEP desejado. Tente novamente.')
        setIsLoading(false)
        displayModalError()
      })
    }

    if(currentStep === 2) {
      goToNextStep();
    }
    
    if(currentStep === 3) {
      if(!helpers.checkRegexPhone(data.phone)) {
        setMsgError('Verifique o número do Telefone e tente novamente.')
        displayModalError()
        return 
      }

      if(!helpers.checkRegexName(data.name)) {
        setMsgError('Verifique o Nome Completo e tente novamente.')
        displayModalError()
        return 
      }
      
      getLeadByPhone().then((resp) => {
          if(resp.data.length) {
            updateLead(resp.data[0]._id).then((resp) => {
              setIsLoading(false);
              showExistingLeadModal();
              getOffers();
              setTimeout(() => {
                goToNextStep()
              },2000)
            })
          } else {
            createLead().then((resp) => {
              setIsLoading(false)
              getOffers();
              goToNextStep();
            });
          }
      });
    }

    if(currentStep === 4) {
      goToNextStep();
    }

    if(currentStep === 5) {
      if(helpers.checkCPFRules(data.cpf)) {
        getSlots();
        goToNextStep();
      } else {
        setMsgError('Verifique o CPF e tente novamente.')
        displayModalError()
      }
    }

    if(currentStep === 6) {
      goToNextStep();
    }

    if(currentStep === 7) {
      goToNextStep();
      hiddenButton();
    }

    if(currentStep === 8) {
      goToNextStep();
    }
  }

  const displayModalError = () => {
    document.querySelector('#modalId')?.classList.remove('hidden-modal');
    document.querySelector('#modalId')?.classList.add('display-modal');
  }

  const showExistingLeadModal = () => {
    document.querySelector('#modalIdLead')?.classList.add('display-modal');
    document.querySelector('#modalIdLead')?.classList.remove('hidden-modal');
    setTimeout(() => {
      hiddenModal()
    },2000)
  }

  const hiddenModal = () => {
    document.querySelector('#modalId')?.classList.add('hidden-modal');
    document.querySelector('#modalIdLead')?.classList.add('hidden-modal');
  }

  const goToNextStep = () => {
    changeStep(currentStep+1);
    if(currentStep === 5 && slotsAvaiable.length === 0) {
      enableButton()
    } else {
      disableButton();
    }
  }

  const createLead = async () => {
    setIsLoading(true)
    const lead = {
      name  : data.name,
      phone : data.phone,
      email : data.email
    }
    const res = await apiLead.post('/lead',lead);
    return await res;
  }

  const updateLead = async (leadId) => {
    setIsLoading(true)
    const lead = {
      name  : data.name,
      phone : data.phone,
      email : data.email,
    }
    const res = await apiLead.put('/lead/'+leadId,lead);
    return await res;
  }

  const getLeadByPhone = async () => {
    setIsLoading(true)
    const res = await apiLead.get('/lead/users/'+data.phone);
    return await res;
  }

  const getOffers = () => {
    products = catalog;
  }

  const getSlots = () => {
    if(parseInt(Math.random() * 3) === 0) return;
    slotsAvaiable = slots;
  }

  const getAddressByCep = async (cep) => {
    setIsLoading(true)
    const res = await apiCEP.get(helpers.cleanCep(cep)+"/json");
    return await res;
  }

  return (
    <>
      {isLoading ? <LoadingSpinner /> : <div></div>}
      <div className="title">
        <h2 className="green-text">PROGRAMA</h2><h2 className="simple-text">FIBRA</h2>
      </div>
      <div className = "container">
        <Header step = {currentStep}></Header>
        <form className="container-form">
          <div>{currentComponent}</div>
          <ModalErro msg = {msgError}></ModalErro>
          <ModalExistingLead></ModalExistingLead>
        </form>
        <NextButton onClick={handleChangeStep} isDisabled = {buttonState}>{currentStep}</NextButton>
      </div>
      <div className="icon-container">
        <div className="wpp-image" onClick={helpers.goToWpp} data-hover="Dúvidas? Entre em contato!">
        </div>
      </div>
    </>
  )
}

export default App;
