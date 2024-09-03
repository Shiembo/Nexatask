import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const StaffForm = () => {
    const [staff, setStaff] = useState({
      staff_id: '',
      user: '', // Assuming you'll enter the UserProfile ID here
      first_name: '',
      last_name: '',
      email: '',
      dob: '',
      telephone: '',
      address: '',
      postcode: '',
    });
  
    const handleChange = (e) => {
      setStaff({ ...staff, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/staff', staff);
        alert('Staff added successfully!');
        console.log(response.data);
        // Optionally reset the form or redirect the user
      } catch (error) {
        alert('An error occurred while adding the staff.');
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add New Staff Member</h2>
        {/* Repeat similar structure for each field */}
        <div>
          <label>Staff ID</label>
          <input
            type="text"
            name="staff_id"
            value={staff.staff_id}
            onChange={handleChange}
            required
          />
        </div>
        {/* Include input fields for other attributes */}
        <div>
          <label>User ID (UserProfile ID)</label>
          <input
            type="text"
            name="user"
            value={staff.user}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add inputs for first_name, last_name, email, etc. */}
        {/* Example for first_name */}
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={staff.first_name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Continue for other fields */}
        
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default StaffForm;