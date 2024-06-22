import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css'

import employee_id_icon from '../Assests/EmployeeID.png';
import name_icon from '../Assests/Name.png';
import role_icon from '../Assests/Role.png';
import password_icon from '../Assests/Password.png';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:3001';

const LoginSignup = () => {
    const [action, setAction] = useState('Login');
    const [employeeId, setEmployeeId] = useState('');
    const [inputName, setInputName] = useState('');
    const [role, setRole] = useState(''); // Added state for role
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for message
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('/staff/signup', {
                employee_id: employeeId,
                name: inputName,
                role: role, // Pass role to backend if needed
                password: password
            });
            setMessage('Registration Successful'); // Set success message
            // Navigate to home page or show success message
            navigate('/home');
        } catch (error) {
            setMessage('Registration Failed: ' + (error.response ? error.response.data.Error : 'Server Error')); // Set error message
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/staff/login', {
                employee_id: employeeId,
                password: password
            });
            setMessage('Login Successful'); // Set success message
            // Navigate to home page or show success message
            navigate('/home');
        } catch (error) {
            setMessage('Login Failed: ' + (error.response ? error.response.data.Error : 'Server Error')); // Set error message
        }
    };

    const goToHome = () => {
        navigate('/home');
    };

    const goToInsertPage = () => {
        navigate('/insert');
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={employee_id_icon} alt="Employee ID" />
                    <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </div>
                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <img src={name_icon} alt="Name" />
                            <input type="text" placeholder="Name" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={role_icon} alt="Role" />
                            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={password_icon} alt="Password" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Login" && (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here!</span>
                </div>
            )}
            <div className="submit-container">
                <div 
                    className={action === "Login" ? "submit gray" : "submit"} 
                    onClick={() => { 
                        setAction('Sign Up');
                        if (action === 'Sign Up') {
                            handleSignup();
                        }
                    }}
                >
                    Sign Up
                </div>
                <div 
                    className={action === "Sign Up" ? "submit gray" : "submit"} 
                    onClick={() => { 
                        setAction('Login');
                        if (action === 'Login') {
                            handleLogin();
                        }
                    }}
                >
                    Log In
                </div>
            </div>
            {message && (
                <div className="message">{message}</div> // Display the message
            )}
            <div className="page-container">
                <div className="page" onClick={goToHome}>Home</div>
                <div className="page" onClick={goToInsertPage}>Insert Page</div>
            </div>
        </div>
    );
};

export default LoginSignup;
