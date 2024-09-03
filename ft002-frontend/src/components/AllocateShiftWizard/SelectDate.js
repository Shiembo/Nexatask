import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/AllocateShiftWizardCss/SelectDate.css';

const SelectDate = () => {
    const currentDate = new Date(); // Current date and time

    return (
        <div className="select-date-wrapper">
            <div className="select-date-header">Shift Date and Time (automatically set to now):</div>
            <div className="select-date-content">
                <DatePicker
                    inline
                    selected={currentDate}
                    onChange={() => {}} // No-op function
                    dateFormat="MMMM d, yyyy"
                    minDate={currentDate}
                    maxDate={currentDate}
                />
                <div className="time-display">
                    <div className="time-display-header">Time</div>
                    <div className="time-display-value">
                        {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectDate;
