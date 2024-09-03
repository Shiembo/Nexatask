import React, { useState } from 'react';
import SelectStaff from './AllocateShiftWizard/SelectStaff';
import SelectShift from './AllocateShiftWizard/SelectShift';
import SelectDate from './AllocateShiftWizard/SelectDate';
import Summary from './AllocateShiftWizard/Summary';
import View_Assigned_Shift from './screens/View_Assigned_Shift'; // Adjust the relative path as needed

// Stylesheets, if any
import '../css/Allocate_Shift_Wizard.css';
import { useNavigate } from 'react-router-dom';





const Wizard = () => {
    const totalSteps = 4;
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const [selectedShift, setSelectedShift] = useState([]);
    const [shiftDate, setShiftDate] = useState(new Date());
    const [assignedShifts, setAssignedShifts] = useState([]);

    const staffOptions = [
        { value: 'staff1', label: 'John Doe' },
        { value: 'staff2', label: 'Banks Feezy' },
        { value: 'staff3', label: 'Elvira Mani' },
        { value: 'staff4', label: 'Van Dijk' },
        // ... more staff options
    ];
    
    const shiftOptions = [
        { value: 'shift1', label: 'West Brom' },
        { value: 'shift2', label: 'Wolvs' },
        { value: 'shift3', label: 'Birms' },
        { value: 'shift4', label: 'Shews' },
        // ... more shift options
    ];

    const [isWizardCompleted, setIsWizardCompleted] = useState(false);

    // Logic to determine if next button should be enabled
    const isNextButtonDisabled = () => {
        switch (currentStep) {
          case 1:
            return selectedStaff.length === 0;
          case 2:
            return selectedShift.length === 0;
          case 3:
            
            return false;
          default:
            return currentStep >= totalSteps;
        }
      };


    // Function to check if the user can proceed to the next step
    const canProceedToNextStep = () => {
        if (currentStep === 1 && selectedStaff.length > 0) return true;
        if (currentStep === 2 && selectedShift.length > 0) return true;
        if (currentStep === 3 && shiftDate) return true;
        return currentStep < 4;
    };

    const nextStep = () => {
        if (canProceedToNextStep()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const navigate = useNavigate(); // Hook to get the navigate function

    const handleFinish = (shifts) => {
        setAssignedShifts(shifts);
        setIsWizardCompleted(true); // Mark the wizard as completed

        // Show notification to the user
        alert('Shift assigned successfully!');

        // Redirect to the "Assigned Shifts" page
        navigate('/view_assigned_shift'); // Use the navigate function to change the route
    };

    

    const progressBarWidth = `${(currentStep / totalSteps) * 100}%`;
    
    // If the wizard is completed, show the View_Assigned_Shift component
    if (isWizardCompleted) {
        return <View_Assigned_Shift assignedShifts={assignedShifts} />;
    }

    const stepIndicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      stepIndicators.push(
        <div key={i} className={`step-indicator ${currentStep === i ? 'active' : ''}`}>
          {i}
        </div>
      );
    }

    


    return (
        <div className="wizard-container">
            <div className="wizard-header">
                <div className="progress-bar-background">
                    <div className="progress-bar" style={{ width: progressBarWidth }}></div>
                </div>
                <div className="step-indicators">
                    {stepIndicators}
                </div>
            </div>

            <div className="wizard-content">
                {currentStep === 1 && (
                    <SelectStaff
                        staffOptions={staffOptions}
                        selectedStaff={selectedStaff}
                        onStaffChange={setSelectedStaff}
                    />
                )}
                {currentStep === 2 && (
                    <SelectShift
                        shiftOptions={shiftOptions}
                        selectedShift={selectedShift}
                        onShiftChange={setSelectedShift}
                    />
                )}
                {currentStep === 3 && (
                    <SelectDate
                        shiftDate={shiftDate}
                        onDateChange={setShiftDate}
                    />
                )}
                {currentStep === 4 && (
                    <Summary
                        selectedStaff={selectedStaff}
                        selectedShift={selectedShift}
                        shiftDate={shiftDate}
                        onFinish={handleFinish}
                    />
                )}
            </div>

            <div className="wizard-buttons">
                {currentStep > 1 && <button onClick={prevStep} className="wizard-button">Back</button>}
                {currentStep === 1 && <div className="wizard-button-spacer"></div>}
                {currentStep < totalSteps && (
                    <button onClick={nextStep} className="wizard-button" disabled={isNextButtonDisabled()}>
                        Next
                    </button>
                )}
                {currentStep === totalSteps && (
                    <button onClick={handleFinish} className="wizard-button">Finish</button>
                )}
            </div>

        </div>
    );
};

export default Wizard;   