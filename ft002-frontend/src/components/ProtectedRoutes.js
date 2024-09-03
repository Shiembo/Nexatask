// ProtectedRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './screens/Dashboard';
import Calender from './screens/Calender';
import Employeelist from './screens/Employee';
import Timesheet from './screens/Timesheet';
import View_Shift from './screens/View_Shift';
import Assign_Shift from './screens/Assign_Shift';
import Create_Shift from './screens/Create_Shift';
import View_Assigned_Shift from './screens/View_Assigned_Shift';
import Add_Staff from './screens/Add_Staff';
import View_Staff from './screens/View_Staff';
import Holiday from './screens/Holiday';

// Import other components

function ProtectedRoutes() {
    const { isLoggedIn, role } = useAuth();

    console.log(`isLoggedIn: ${isLoggedIn}, role: ${role}`); // Debugging line


  return (
    <Routes>
             
              <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path='/calender' element={isLoggedIn ? <Calender /> : <Navigate to="/login" />} />
              <Route path='/employee' element={isLoggedIn ? <Employeelist /> : <Navigate to="/login" />} />
              <Route path='/timesheet' element={isLoggedIn ? <Timesheet /> : <Navigate to="/login" />} />
              
              {/* Conditional Route: Only allow 'admin' role to access the 'Create Shift' page */}
              {role === 'admin' && <Route path='/create_shift' element={<Create_Shift />} />}
              {/* If not logged in or if the role does not match, navigate to the login page or an unauthorized page */}
              {!isLoggedIn && <Route path='*' element={<Navigate to="/login" />} />}
              


              <Route path='/view_shift' element={isLoggedIn ? <View_Shift /> : <Navigate to="/login" />} />
              <Route path='/assign_shift' element={isLoggedIn ? <Assign_Shift /> : <Navigate to="/login" />} />
              <Route path='/view_assigned_shift' element={isLoggedIn ? <View_Assigned_Shift /> : <Navigate to="/login" />} />
              <Route path='/add_staff' element={isLoggedIn ? <Add_Staff /> : <Navigate to="/login" />} />
              <Route path='/view_staff' element={isLoggedIn ? <View_Staff /> : <Navigate to="/login" />} />
              <Route path='/holiday' element={isLoggedIn ? <Holiday /> : <Navigate to="/login" />} />
             
              {/* Redirect users to the dashboard by default if logged in, else to login */}

            </Routes>
  );
}

export default ProtectedRoutes;
