import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavigationBar.css';

const NavigationBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('api/staff/logout');
            // Clear any user data in local storage if needed
            localStorage.removeItem('employee_id');
            navigate('/'); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally, display a message to the user
        }
    };

    return (
        <nav className="navigation-bar">
            <div className="logo">Parcel Management</div>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/insert">Insert</Link>
                <Link to="/view">View</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/auth">Authentication</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default NavigationBar;
