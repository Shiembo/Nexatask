// BookShiftButton.js
import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust import path as necessary

const BookShiftButton = ({ shiftId, className, onShiftBooked }) => {
    const { isLoggedIn, tenant_id } = useAuth(); // Destructure tenant_id from useAuth

    const handleBookShift = async () => {
        if (!isLoggedIn) {
            alert("Please log in to book a shift.");
            return;
        }

        const confirmBooking = window.confirm("Are you sure you want to book this shift?");
        if (!confirmBooking) return;

        try {
            console.log("Tenant ID:", tenant_id); // Add this line for debugging
            // Include tenant_id in the request body
            await axios.post(`http://localhost:8000/api/shift/${shiftId}/book/`, {
                tenant_id: tenant_id // Include the tenant ID
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`, // Make sure this aligns with how you manage tokens
                    'Content-Type': 'application/json',
                },
            });

            alert('Shift booked successfully.');
            if(onShiftBooked) onShiftBooked();
        } catch (error) {
            console.error('Error booking shift:', error.response ? error.response.data : 'An unknown error occurred');
            alert('Error booking shift. Please try again.');
        }
    };

    return (
        <button className={className} onClick={handleBookShift}>
            Book Shift
        </button>
    );
};

export default BookShiftButton;
