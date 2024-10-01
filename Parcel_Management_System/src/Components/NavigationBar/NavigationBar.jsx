import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NavigationBar.css';

const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                await axios.get('/staff/profile');
                setIsLoggedIn(true);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsLoggedIn(false);
                    // navigate('/'); // Redirect to the login page if unauthorized
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
            navigate('/');  // Redirect to the login page
        }
    };

    const getLinkClass = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <nav className="navigation-bar">
            <div className="logo">RailExpress</div>
            <div className="links">
                <Link to="/home" className={getLinkClass('/home')}>Home</Link>
                <Link to="/insert" className={getLinkClass('/insert')}>Insert</Link>
                <Link to="/viewAll" className={getLinkClass('/viewAll')}>View</Link>
                <Link to="/profile" className={getLinkClass('/profile')}>Profile</Link>
                
                <button onClick={handleLoginLogout} className="logout-button">
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </nav>
    );
};

// <Link to="/auth" className={getLinkClass('/auth')}>Authentication</Link>

export default NavigationBar;
