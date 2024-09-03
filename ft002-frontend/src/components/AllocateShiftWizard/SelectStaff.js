import React from 'react';
import Select, { components } from 'react-select';
import '../../css/AllocateShiftWizardCss/SelectStaff.css';

const SelectStaff = ({ staffOptions, selectedStaff, onStaffChange }) => {
    // Custom styles for the select component
    const customStyles = {
        // Function to apply style to the Dropdown Indicator
        dropdownIndicator: (base) => ({
            ...base,
            color: 'blue', // Set the color of the indicator you want here
        }),
    };

    // Function to handle the removal of a selected staff
    const handleRemoveStaff = (staffToRemove) => () => {
        onStaffChange(selectedStaff.filter(staff => staff.value !== staffToRemove.value));
    };

    return (
        <div className="select-staff-wrapper">
            <div>
                <div className="select-staff-notification">You can select more than one staff at a time</div>
                <Select
                    className="staff-select"
                    classNamePrefix="select"
                    isMulti
                    isSearchable
                    name="staff"
                    options={staffOptions}
                    value={selectedStaff}
                    onChange={onStaffChange}
                    placeholder="Select Staff"
                    components={{ MultiValue: () => null }} // Hide the selected values
                    styles={customStyles} // Apply custom styles
                />
            </div>
            <div className="selected-staff-list">
                <h3 className="selected-staff-heading">Selected Staff</h3>
                <div className="selected-staff-display">
                    {selectedStaff.map((staff) => (
                        <div className="selected-staff-entry" key={staff.value}>
                            <span className="selected-staff-name">{staff.label}</span>
                            <button 
                                className="remove-staff-button"
                                onClick={handleRemoveStaff(staff)}
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

export default SelectStaff;