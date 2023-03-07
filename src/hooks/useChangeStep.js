import { useState } from "react";

export function useChangeStep(steps) {
    
    const [currentStep, setCurrentStep] = useState(1);

    function changeStep(index) {
        if(index <=8) {
            setCurrentStep(index);  
        }
    }
    
    return {
        currentStep,
        changeStep,
        currentComponent: steps[currentStep-1],
    };
}