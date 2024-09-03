import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        user: null,
        role: null,
        tenant_id: null,
        tenant: null,
    });
    const [showSessionWarning, setShowSessionWarning] = useState(false);
    const [countdown, setCountdown] = useState(60); // New state for countdown

    
    // Adjust the session timeout and warning timeout durations as needed
    const sessionTimeoutDuration = 20* 60 * 1000; // 2 minutes in milliseconds
    const warningTimeoutDuration = (20-2) * 60 * 1000; // 1 minute in milliseconds

    useEffect(() => {
        if (authState.isLoggedIn) {
            // Print user details to the console
            console.log("User Name:", authState.user);
            console.log("User Role:", authState.role);
            console.log("User Tenant ID:", authState.tenant_id)
            console.log("User Tenant:", authState.tenant);
        }
    }, [authState]); 

    const startSessionTimer = () => {
        setTimeout(() => {
            logout();
        }, sessionTimeoutDuration);

        const warningTimeout = setTimeout(() => {
            setShowSessionWarning(true);
            let secondsLeft = 60; // 60 seconds countdown
            const interval = setInterval(() => {
                secondsLeft--;
                setCountdown(secondsLeft);
                if (secondsLeft <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        }, warningTimeoutDuration);

        return () => clearTimeout(warningTimeout); // Cleanup on unmount
    };

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            const decoded = decodeJWT(token);
            const currentTime = new Date().getTime();
            const expTime = decoded.exp * 1000;
            if (expTime > currentTime) {
                setAuthState({
                    isLoggedIn: true,
                    user: decoded.name,
                    role: decoded.role,
                    tenant_id: decoded.tenant_id,
                    tenant: decoded.tenant,
                });
                startSessionTimer();
            } else {
                logout();
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', { username, password });
            const { access } = response.data;
            localStorage.setItem('access', access);
            const decoded = decodeJWT(access);
            setAuthState({
                isLoggedIn: true,
                user: decoded.name,
                role: decoded.role,
                tenant_id: decoded.tenant_id,
                tenant: decoded.tenant,
            });
            startSessionTimer();
        } catch (error) {
            console.error("Login failed:", error.response.data);
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        setAuthState({
            isLoggedIn: false,
            user: null,
            role: null,
            tenant_id: null,
            tenant: null,
        });
        setShowSessionWarning(false);
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
            {showSessionWarning && (
                <Modal show onHide={() => setShowSessionWarning(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Session Expiring Soon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {`Your session will expire in ${countdown} seconds. Do you want to stay logged in?`}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={logout}>
                            Log Out
                        </Button>
                        <Button variant="primary" onClick={() => {
                            localStorage.setItem('access', localStorage.getItem('access')); // This is a placeholder for actual token refresh logic
                            setShowSessionWarning(false);
                            startSessionTimer();
                        }}>
                            Stay Logged In
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
