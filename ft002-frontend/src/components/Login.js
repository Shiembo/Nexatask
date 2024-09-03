import React, { useState } from "react";
import "../css/Login.css"; // Ensure the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as per your project structure

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure the login function from context
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading indicator

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Resetting error on new submission
        setLoading(true); // Start loading

        try {
            await login(username, password);
            navigate('/dashboard'); // Redirect to dashboard upon successful login
        } catch (error) {
            setError('Login failed. Please check your credentials.'); // Set error message on failure
            console.error('Login failed:', error);
        } finally {
            setLoading(false); // Reset loading indicator
        }
    };

    return (
        <div className="login-page"> {/* Add this wrapper */}
            <div className="cover">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="login-failed-popup"><h3>Login Failed</h3><p>{error}</p></div>}
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
    
};

export default LoginForm;
