import { useState } from "react";

export function useChangeStep(steps) {
    const [currentStep, setCurrentStep] = useState(1);

    function changeStep(index) {
        if(index <=5) {
            setCurrentStep(index);  
        }
    }
    
    return {
        currentStep,
        changeStep,
    };
}