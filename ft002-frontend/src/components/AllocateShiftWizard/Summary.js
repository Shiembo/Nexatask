
import React, { useState, useEffect } from 'react';
import View_Assigned_Shift from '../screens/View_Assigned_Shift'; // Adjust the relative path as needed

import '../../css/AllocateShiftWizardCss/Summary.css';
// Inside the Summary component:

const Summary = ({ selectedStaff, selectedShift, shiftDate, onFinish }) => {
    // Format the date for display
    const formattedDate = shiftDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const formattedTime = shiftDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });

    return (
        <div className="summary-wrapper">
            <h3 className="summary-heading">Summary</h3>
            <div className="summary-content">
                <div className="summary-section">
                    <h4>Selected Staff</h4>
                    <ul>
                        {selectedStaff.map(staff => <li key={staff.value}>{staff.label}</li>)}
                    </ul>
                </div>
                <div className="summary-section">
                    <h4>Selected Shifts</h4>
                    <ul>
                        {selectedShift.map(shift => <li key={shift.value}>{shift.label}</li>)}
                    </ul>
                </div>
                <div className="summary-section">
                    <h4>Selected Date and Time</h4>
                    <p>{formattedDate} at {formattedTime}</p>
                </div>
            </div>
            
        </div>
    );
};


export default Summary;
