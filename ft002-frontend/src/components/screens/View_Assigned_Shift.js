import React from 'react';
import '../../css/ScreensCss/View_Assigned_Shifts.css';

const View_Assigned_Shift = ({ assignedShifts }) => {

    if (!Array.isArray(assignedShifts)) {
        console.error('assignedShifts is not an array', assignedShifts);
        return <div>No shifts assigned yet.</div>;
      }
      
  return (
    <div>
        <h2>Assigned Shifts</h2>
        <table>
            <thead>
                <tr>
                    <th>Staff Name</th>
                    <th>Shift Name</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {assignedShifts.map((shift, index) => (
                    <tr key={index}>
                        <td>{shift.staffName}</td>
                        <td>{shift.shiftName}</td>
                        <td>{shift.date}</td>
                        <td>{shift.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default View_Assigned_Shift;
