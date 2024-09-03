// Header.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../css/TopNavBar.css';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isLoggedIn, user, role, tenant, logout } = useAuth();
  const theme = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    logout();
    // Optionally, redirect to login page or home page after logout
    // window.location.href = '/login';
  };

  const headerStyle = {
    backgroundColor: theme.primaryColor || '#007bff',
    color: theme.textColor || 'white',
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={headerStyle}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img src={theme.logo || 'path/to/default/logo.png'} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            NexaTask
          </Link>
          <div className="search-container">
            <input type="text" placeholder="Search..." />
            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBell} size="lg" className="mx-2" />
            <FontAwesomeIcon icon={faUserCircle} size="lg" onClick={toggleSidebar} className="profile-icon" />
          </div>
        </div>
      </nav>
      <div className={`slide-out-sidebar ${showSidebar ? 'active' : ''}`}>
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faTimes} className="sidebar-close" onClick={toggleSidebar} />
          <img src={user.photoURL || 'path/to/default/avatar.jpg'} alt="User" className="sidebar-user-photo" />
          <h5>{user.DisplayName || user.email}</h5>
          <p>{`user: ${user}`}</p>
          <p>{`Tenant: ${tenant}`}</p>
          <p>{`Role: ${role}`}</p>
          <div className="sidebar-actions">
            <Link to="/my-account" className="sidebar-action">My Account</Link>
            <button onClick={handleLogout} className="sidebar-action">Sign Out</button>
          </div>
        </div>
        {/* Additional sidebar content can be added here */}
      </div>

      {/* Overlay div to darken the screen when the sidebar is active */}
  {showSidebar && (
    <div className="overlay" onClick={toggleSidebar}></div>
  )}
    </>
  );
};

export default Header;