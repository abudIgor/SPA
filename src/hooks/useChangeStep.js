import { useState } from "react";

export function useChangeStep(steps) {
    
    const [currentStep, setCurrentStep] = useState(1);

    function changeStep(index) {
        if(index <=6) {
            setCurrentStep(index);  
        }
    }
    
    return {
        currentStep,
        changeStep,
        currentComponent: steps[currentStep-1],
        isFinalStep: currentStep + 1 === steps.length ? true : false
    };
}