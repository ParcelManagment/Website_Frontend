import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <Link to="/home">Home Page</Link>
            <Link to="/insert">Insert Page</Link>
            <Link to="/view">View Page</Link>
            <Link to="/profile">Profile Page</Link>
        </nav>
    );
}

export default NavigationBar;
