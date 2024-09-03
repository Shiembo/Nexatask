import React from 'react';
import Select from 'react-select';
import '../../css/AllocateShiftWizardCss/SelectShift.css';

const SelectShift = ({ shiftOptions, selectedShift, onShiftChange }) => {
    // Function to handle the removal of a selected shift
    const handleRemoveShift = (shiftToRemove) => () => {
        onShiftChange(selectedShift.filter(shift => shift.value !== shiftToRemove.value));
    };

    // Custom styles for the select component
    const customStyles = {
        // Function to apply style to the Dropdown Indicator
        dropdownIndicator: (base) => ({
            ...base,
            color: 'blue', // Set the color of the indicator you want here
        }),
    };

    // Custom component to override the default selected values component
    const MultiValue = () => null;


    return (
        <div className="select-shift-wrapper">
            <div>
                <div className="select-shift-notification">You can select more than one shift at a time</div>
                <Select
                    className="shift-select"
                    classNamePrefix="select"
                    isMulti
                    isSearchable
                    name="shifts"
                    options={shiftOptions}
                    value={selectedShift}
                    onChange={onShiftChange}
                    placeholder="Select Shift"
                    components={{ MultiValue }} // Pass the custom component here
                    styles={customStyles} // Apply custom styles
                />
            </div>
            <div className="selected-shift-list">
                <h3 className="selected-shift-heading">Selected Shifts</h3>
                <div className="selected-shift-display">
                    {selectedShift.map((shift) => (
                        <div className="selected-shift-entry" key={shift.value}>
                            <span className="selected-shift-name">{shift.label}</span>
                            <button 
                                className="remove-shift-button"
                                onClick={handleRemoveShift(shift)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectShift;
