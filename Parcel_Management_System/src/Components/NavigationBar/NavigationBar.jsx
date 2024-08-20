import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavigationBar.css';

const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                await axios.get('/staff/profile');
                setIsLoggedIn(true);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsLoggedIn(false);
                    //navigate('/'); // Redirect to the login page if unauthorized
                }
            }
        };

        checkAuthorization();
    }, [navigate]);

    const handleLoginLogout = async () => {
        if (isLoggedIn) {
            try {
                await axios.get('/staff/logout');
                localStorage.removeItem('employee_id');
                setIsLoggedIn(false);
                //navigate('/'); // Redirect to the login page
            } catch (error) {
                console.error('Logout failed:', error);
            }
        } else {
            //navigate('/'); // Redirect to the login page
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
                <button onClick={handleLoginLogout} className="logout-button">
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;
