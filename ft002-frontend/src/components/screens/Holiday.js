import React from 'react';
import '../../css/ScreensCss/Holiday.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUmbrellaBeach,
  faHeartBroken,
  faCalendarDay,
  faBriefcaseMedical,
  faBaby,
  faThermometerThreeQuarters,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

function Holiday() {
  const leaves = [
    { type: 'Annual Leave', icon: faUmbrellaBeach, color: '#2ECC71', available: 25, booked: 3 },
    { type: 'Compassionate Leave', icon: faHeartBroken, color: '#E74C3C', available: 0, booked: 0 },
    { type: 'Compensatory Off', icon: faCalendarDay, color: '#3498DB', available: 0, booked: 0 },
    { type: 'Medical Leave', icon: faBriefcaseMedical, color: '#9B59B6', available: 0, booked: 0 },
    { type: 'Paternity Leave', icon: faBaby, color: '#F1C40F', available: 0, booked: 0 },
    { type: 'Sick Leave', icon: faThermometerThreeQuarters, color: '#1ABC9C', available: 0, booked: 0 },
  ];

  const holidays = [
    { date: '29 Mar, Fri', name: 'Good Friday' },
    { date: '01 Apr, Mon', name: 'Easter Monday' },
    { date: '06 May, Mon', name: 'Early May bank holiday' },
    { date: '27 May, Mon', name: 'Spring bank holiday' },
    { date: '26 Aug, Mon', name: 'Summer bank holiday' },
    { date: '25 Dec, Wed', name: 'Christmas Day' },
    { date: '26 Dec, Thu', name: 'Boxing Day' }
  ];
  

  return (
    <div>
      <div className="leave-cards-container">
        {leaves.map((leave, index) => (
          <div key={index} className="card">
            <div className="icon" style={{ color: leave.color }}>
              <FontAwesomeIcon icon={leave.icon} />
            </div>
            <div className="type">{leave.type}</div>
            <div className="status">
              <div className="available">Available : {leave.available}</div>
              <div className="booked">Booked : {leave.booked}</div>
            </div>
          </div>
        ))}
      </div>
  
      <div className="holiday-list-container">
        <h2>All Time Off and Bank Holidays</h2>
        <div className="holiday-tabs">
          <button className="tab">Upcoming</button>
          <button className="tab">History</button>
        </div>
        {holidays.map((holiday, index) => (
          <div key={index} className="holiday-card">
            <div className="holiday-icon">
              <FontAwesomeIcon icon={faCalendarCheck} />
            </div>
            <div className="holiday-info">
              <div className="holiday-date">{holiday.date}</div>
              <div className="holiday-name">{holiday.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default Holiday;
