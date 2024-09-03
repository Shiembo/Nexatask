import React, { useState } from 'react';
import axios from 'axios';
import '../../css/ScreensCss/Create_Shift.css';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path according to your file structure




function CreateShift() {

  const { tenant_id } = useAuth();

  const [shiftData, setShiftData] = useState({
    shift_name: '',
    date: '',
    start_time: '',
    end_time: '',
    address: '',
    postcode: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    setShiftData({ ...shiftData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validate shift_name
    if (!shiftData.shift_name) {
      newErrors.shift_name = 'Shift name is required';
      isValid = false;
    }

    // Validate date
    if (!shiftData.date) {
      newErrors.date = 'Shift date is required';
      isValid = false;
    }

    // Validate start_time
    if (!shiftData.start_time) {
      newErrors.start_time = 'Start time is required';
      isValid = false;
    }

    // Validate end_time
    if (!shiftData.end_time) {
      newErrors.end_time = 'End time is required';
      isValid = false;
    } else if (shiftData.start_time && shiftData.end_time <= shiftData.start_time) {
      newErrors.end_time = 'End time must be after start time';
      isValid = false;
    }

    // Validate address
    if (!shiftData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate postcode
    if (!shiftData.postcode) {
      newErrors.postcode = 'Postcode is required';
      isValid = false;
    } else if (shiftData.postcode.length > 10) {
      newErrors.postcode = 'Postcode must be 7 characters or less';
      isValid = false;
    }

    

    // Add more validations as necessary

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const authToken = localStorage.getItem('access');

    const requestData = {
      ...shiftData,
      tenant: tenant_id, // Include the tenant_id in the request body
    };

    try {
      const response = await axios.post('http://localhost:8000/api/shift/', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`, // Assuming the token is stored in local storage
          'X-Tenant-ID': tenant_id, // Ensure tenant_id is correctly retrieved
        },
      });

      console.log(response.data);
      alert('Shift created successfully');
      resetForm();
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Error creating shift: ' + JSON.stringify(error.response?.data));
    } finally {
      setLoading(false);
    }
};

  const resetForm = () => {
    setShiftData({
      shift_name: '',
      date: '',
      start_time: '',
      end_time: '',
      address: '',
      postcode: '',
      status: 'pending'
    });
    setErrors({});
  };

  return (
    <div className="create-shift-container">
      <h2>Create Shift</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="shift_name">Shift Name</label>
        <input
          type="text"
          id="shift_name"
          name="shift_name"
          value={shiftData.shift_name}
          onChange={handleInputChange}
          className={errors.shift_name ? 'error' : ''}
          placeholder="Shift Name"
        />
        {errors.shift_name && <span className="error-message">{errors.shift_name}</span>}

        <label htmlFor="date">Shift Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={shiftData.date}
          onChange={handleInputChange}
          min={today}
          className={errors.date ? 'error' : ''}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}

        <label htmlFor="start_time">Start Time</label>
        <input
          type="time"
          id="start_time"
          name="start_time"
          value={shiftData.start_time}
          onChange={handleInputChange}
          className={errors.start_time ? 'error' : ''}
        />
        {errors.start_time && <span className="error-message">{errors.start_time}</span>}

        <label htmlFor="end_time">End Time</label>
        <input
          type="time"
          id="end_time"
          name="end_time"
          value={shiftData.end_time}
          onChange={handleInputChange}
          className={errors.end_time ? 'error' : ''}
        />
        {errors.end_time && <span className="error-message">{errors.end_time}</span>}

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={shiftData.address}
          onChange={handleInputChange}
          className={errors.address ? 'error' : ''}
          placeholder="Address"
        />
        {errors.address && <span className="error-message">{errors.address}</span>}

        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          value={shiftData.postcode}
          onChange={handleInputChange}
          className={errors.postcode ? 'error' : ''}
          placeholder="Postcode"
        />
        {errors.postcode && <span className="error-message">{errors.postcode}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Shift'}
        </button>
      </form>
    </div>
  );
}

export default CreateShift;
