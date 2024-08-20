import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css'; // Import the same CSS file for consistent styling
import website_logo from '../Assests/logo.jpg';
const ForgetPassword = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Handle the submit action, e.g., sending request to server
        console.log("Submit", userId);
    };

    return (
        <div className="container">
            <div className="logo-container">
                <img src={website_logo} alt="Website Logo" className="website-logo" />
            </div>
            <div className="header">
                <div className="text1">Forgot Password</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input
                        
                        type="text"
                        placeholder="Employee ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="message">
                    Request a New Password
                </div>
            </div>
            <div className="submit-container">
                <div
                    className="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Submit
                </div>
                <div
                    className="submit gray"
                    onClick={() => navigate('/')}
                    disabled={loading}
                >
                    Cancel
                </div>
            </div>
            {loading && (
                <div className="message">
                    Loading...
                </div>
            )}
            {message && (
                <div className="message">
                    {message}
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
