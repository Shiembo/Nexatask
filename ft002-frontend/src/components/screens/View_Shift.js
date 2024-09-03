


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/ScreensCss/View_Shift.css';
import Drawer from '@mui/material/Drawer'
import { useAuth } from '../../context/AuthContext';
import { useStyles } from '../Styles/View_Shift_Styles';
import BookShiftButton from '../BookShift'; // Adjust the path as necessary


function View_Shift() {
    const { isLoggedIn, role } = useAuth(); // Corrected access
    const { tenant_id } = useAuth(); // Use the tenant_id from the auth context
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editShiftData, setEditShiftData] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                // Include tenant_id in the request headers to fetch shifts specific to the tenant
                const response = await axios.get('http://localhost:8000/api/shift/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`, // Assuming the JWT token is stored in local storage
                        'X-Tenant-ID': tenant_id, // Pass the tenant_id from the auth context
                    },
                });
                console.log("Shifts fetched:", response.data); // Log the response data
                setShifts(response.data);
            } catch (error) {
                console.error('Error fetching shifts:', error.response ? error.response.data : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (tenant_id) {
            fetchShifts();
        }
    }, [tenant_id]); // Dependency array includes tenant_id to refetch shifts if it changes

    

    const handleEditClick = (shift) => {
        setEditShiftData({ ...shift });
        setIsDrawerOpen(true);
    };

    const handleEditChange = (e) => {
        setEditShiftData({ ...editShiftData, [e.target.name]: e.target.value });
    };

   //fetch function
    const fetchShifts = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get('http://localhost:8000/api/shift/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'X-Tenant-ID': tenant_id,
                },
            });
            setShifts(response.data); // Update state with fetched data
            console.log("Shifts fetched:", response.data);
        } catch (error) {
            console.error('Error fetching shifts:', error.response ? error.response.data : 'An unknown error occurred');
        } finally {
            setLoading(false); // End loading regardless of the outcome
        }
    };
    

    // Function to handle submitting the edit form
    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure all necessary fields are included in the payload
        const payload = {
            ...editShiftData,
            tenant: tenant_id, // Ensure tenant_id is correctly included from the context or state
            // Include any other fields that are not part of the form but need to be sent
        };
    
        console.log("Updating shift with data:", payload); // For debugging
    
        try {
            const response = await axios.put(`http://localhost:8000/api/shift/${editShiftData.shift_id}/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'X-Tenant-ID': tenant_id,
                },
            });
    
            console.log("Shift update response:", response.data); // For debugging
            alert('Shift updated successfully');
            setIsDrawerOpen(false);
    
            // Re-fetch the updated shift data to reflect changes in the UI
            await fetchShifts();
        } catch (error) {
            console.error('Error updating shift:', error.response ? error.response.data : 'An unknown error occurred');
            alert(`Error updating shift: ${error.response?.data?.message || 'An unknown error occurred'}`);
        }
    };
    

  // Function to handle deleting a shift
  const handleDelete = async (shiftId) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      const token = localStorage.getItem('access');
      if (!token) {
        console.error('No access token available.');
        alert('You are not logged in. Please log in again.');
        return;
      }
  
      try {
        console.log(`Attempting to delete shift with ID: ${shiftId}`);
        const response = await axios.delete(`http://localhost:8000/api/shift/${shiftId}/`, { // Ensure URL matches backend expectation
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-ID': tenant_id, // Ensure this header is sent as your backend requires
          },
        });
        console.log('Delete response:', response);
        setShifts(prevShifts => prevShifts.filter(shift => shift.shift_id !== shiftId));
        alert('Shift deleted successfully');
      } catch (error) {
        console.error('Error deleting shift:', error.response ? error.response.data : error);
        alert(`Error deleting shift: ${error.response?.data?.message || error.message || 'An unknown error occurred'}`);
      }
    }
  };
  
  

  const [searchQuery, setSearchQuery] = useState('');


  

    if (loading) {
        return <div>Loading shifts...</div>;
    }

    return (
        <div>
            <h2>Shifts</h2>
            <input 
                type="text" 
                placeholder="Search shifts..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="searchBar" // Add styling as needed
            />
            <table>
                <thead>
                    <tr>
                        <th>Shift Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Address</th>
                        <th>Postcode</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {shifts
                    .filter(shift => {
                      // Convert all fields and query to lowercase for case-insensitive comparison
                      const query = searchQuery.toLowerCase();
                      return (
                          shift.shift_name.toLowerCase().includes(query) ||
                          shift.date.toLowerCase().includes(query) ||
                          shift.start_time.toLowerCase().includes(query) ||
                          shift.end_time.toLowerCase().includes(query) ||
                          shift.address.toLowerCase().includes(query) ||
                          shift.postcode.toLowerCase().includes(query) ||
                          shift.status.toLowerCase().includes(query)
                          // Add more fields as needed
                      );
                  })
                    
                  .map(shift => (
                    <tr key={shift.shift_id}>
                        <td>{shift.shift_name}</td>
                        <td>{shift.date}</td>
                        <td>{shift.start_time}</td>
                        <td>{shift.end_time}</td>
                        <td>{shift.address}</td>
                        <td>{shift.postcode}</td>
                        <td>{shift.status}</td>
                        <td>
                        {isLoggedIn && role === 'admin' && (

                            <>
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleEditClick(shift)}
                                >
                                    Edit
                                </button>
                
                                <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete(shift.shift_id)}
                                    >
                                    Delete
                                </button>
                            </>
                        )}
                        {isLoggedIn && role === 'staff' && (
                            <BookShiftButton shiftId={shift.shift_id} onShiftBooked={() => {/* Optionally refresh shift list here */}} />
                        )}
                        </td>
                    </tr>
                ))
                  }
                </tbody>
            </table>


            <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            className={classes.drawer}
        >
            <div className={classes.drawerContent}>
                <form onSubmit={handleEditSubmit} className={classes.form}>
                    <div className={classes.formSection}>
                        <label htmlFor="shift_name" className={classes.label}>Shift Name</label>
                        <input
                            type="text"
                            id="shift_name"
                            name="shift_name"
                            value={editShiftData?.shift_name || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.formSection}>
                        <label htmlFor="shift_date" className={classes.label}>Shift Date</label>
                        <input
                            type="date"
                            id="shift_date"
                            name="date"
                            value={editShiftData?.date || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.formSection}>
                        <label htmlFor="shift_start_time" className={classes.label}>Start Time</label>
                        <input
                            type="time"
                            id="shift_start_time"
                            name="start_time"
                            value={editShiftData?.start_time || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.formSection}>
                        <label htmlFor="shift_end_time" className={classes.label}>End Time</label>
                        <input
                            type="time"
                            id="shift_end_time"
                            name="end_time"
                            value={editShiftData?.end_time || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.formSection}>
                        <label htmlFor="shift_address" className={classes.label}>Address</label>
                        <input
                            type="text"
                            id="shift_address"
                            name="address"
                            value={editShiftData?.address || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.formSection}>
                        <label htmlFor="shift_postcode" className={classes.label}>Postcode</label>
                        <input
                            type="text"
                            id="shift_postcode"
                            name="postcode"
                            value={editShiftData?.postcode || ''}
                            onChange={handleEditChange}
                            className={classes.input}
                            autoComplete="off" 
                        />
                    </div>

                    <div className={classes.buttonContainer}>
                        <button type="submit" className={`${classes.button} ${classes.saveButton}`}>
                            Save
                        </button>
                        <button type="button" onClick={() => setIsDrawerOpen(false)} className={`${classes.button} ${classes.cancelButton}`}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Drawer>
    </div>
);
}

export default View_Shift;
