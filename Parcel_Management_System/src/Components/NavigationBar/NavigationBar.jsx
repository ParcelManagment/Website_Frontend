import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import LoginSignup from '../LoginSignup/LoginSignup';  // Import the login component
import './NavigationBar.css';

const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);  // State to control the modal
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
            } catch (error) {
                console.error('Logout failed:', error);
            }
        } else {
            setShowLoginModal(true);  // Show login modal if not logged in
        }
    };

    const handleCloseModal = () => setShowLoginModal(false);  // Close modal

    const getLinkClass = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <nav className="navigation-bar">
            <div className="logo">RailExpress</div>
            <div className="links">
                <Link to="/home" className={getLinkClass('/home')}>Home</Link>
                <Link to="/insert" className={getLinkClass('/insert')}>Insert</Link>
                <Link to="/view" className={getLinkClass('/view')}>View</Link>
                <Link to="/profile" className={getLinkClass('/profile')}>Profile</Link>
                
                <button onClick={handleLoginLogout} className="logout-button">
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginSignup closeModal={handleCloseModal} />
                </Modal.Body>
            </Modal>
        </nav>
    );
};

export default NavigationBar;

