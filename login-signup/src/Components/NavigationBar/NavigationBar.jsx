import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <div className="logo">Parcel Management</div>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/insert">Insert</Link>
                <Link to="/view">View</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/auth">Authentication</Link>
                <Link to="/">Logout</Link>
                
            </div>
        </nav>
    );
}

export default NavigationBar;
