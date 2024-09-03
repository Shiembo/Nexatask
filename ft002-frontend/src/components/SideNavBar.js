import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faStopwatch, 
  faUser, 
  faCalendarAlt, 
  faClock, 
  faCalendarPlus, 
  faTasks, 
  faUserPlus, 
  faUsers,
  faArrowLeft, // Import faArrowLeft
  faBars, // Import faBars
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons'; // Import the icons you need

import '../css/SideNavBar.css';
import { useAuth } from '../context/AuthContext'; // Make sure the path is correct

const SideNavBar = () => {

  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar view
  const { role } = useAuth(); // Use role from the AuthContext

  return (
    <div className={`side-nav-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>

      {/* Toggle Button at the top of the sidebar for better visibility */}
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        <FontAwesomeIcon icon={isExpanded ? faArrowLeft : faBars} />
      </button>

      {/* Home Menu Item */}
      <Link to="/dashboard" className="menu-item">
        <FontAwesomeIcon icon={faHome} className="icon icon-home" />
        <span className="title">Home</span>
      </Link>

      {/* Manage Employees Menu Item */}
      <Link to="/employee" className="menu-item">
        <FontAwesomeIcon icon={faUser} className="icon icon-user" />
        <span className="title">Manage Employees</span>
      </Link>

      {role === 'admin' && (
        <Link to="/create_shift" className="menu-item">
          <FontAwesomeIcon icon={faClock} className="icon icon-clock" />
          <span className="title">Create Shifts</span>
        </Link>
      )}

      {/* View Shifts Menu Item */}
      <Link to="/view_shift" className="menu-item">
        <FontAwesomeIcon icon={faCalendarAlt} className="icon icon-calendar-alt" />
        <span className="title">View Shifts</span>
      </Link>

      {/* Assign Shift Menu Item */}
      <Link to="/assign_shift" className="menu-item">
        <FontAwesomeIcon icon={faCalendarPlus} className="icon icon-calendar-plus" /> {/* Add the clock icon */}
        <span className="title">Assign Shift</span>
      </Link>

      <Link to="/view_assigned_shift" className="menu-item">
        <FontAwesomeIcon icon={faTasks} className="icon icon-tasks" /> {/* Add the clock icon */}
        <span className="title">View Assigned Shift</span>
      </Link>

      


      {/* Time Tracker Menu Item */}
      <Link to="/timesheet" className="menu-item">
        <FontAwesomeIcon icon={faStopwatch} className="icon icon-stopwatch" />
        <span className="title">Time Tracker</span>
      </Link>

      <Link to="/add_staff" className="menu-item">
        <FontAwesomeIcon icon={faUserPlus} className="icon icon-user-plus" /> {/* Add the clock icon */}
        <span className="title">Add New Staff</span>
      </Link>

      <Link to="/view_staff" className="menu-item">
        <FontAwesomeIcon icon={faUsers} className="icon icon-users" /> {/* Add the clock icon */}
        <span className="title">View Staffs</span>
      </Link>

      <Link to="/Holiday" className="menu-item">
        <FontAwesomeIcon icon={faCalendarDay} className="icon icon-calendar-day" /> {/* Add the clock icon */}
        <span className="title">Time off</span>
      </Link>



      
    </div>
  );
};

export default SideNavBar;
