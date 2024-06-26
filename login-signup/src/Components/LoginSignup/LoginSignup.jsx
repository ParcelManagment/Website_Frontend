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
    const [first_name,setInputFirstName] = useState('');
    const [last_name,setInputLastName] = useState('');
    const [role, setRole] = useState(''); // Added state for role
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State for message
    const [signupEmployeeIdError, setSignupEmployeeIdError] = useState('');
    const [loginEmployeeIdError, setLoginEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('/staff/signup', {
                employee_id: employeeId,
                first_name: first_name,
                last_name: last_name,
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
            localStorage.setItem('employee_id', employeeId); // Store employee_id in local storage
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

    // Validation functions for Sign Up
    const validateSignupEmployeeId = () => {
        if (employeeId.length !== 5) {
            setSignupEmployeeIdError('Employee ID must be 5 digits');
        } else if (!/^\d+$/.test(employeeId)) {
            setSignupEmployeeIdError('Only integers are allowed');
        } else {
            setSignupEmployeeIdError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be longer than 6 characters');
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase and one uppercase letter');
        } else if (!/\d/.test(password) && !/[^\w\s]/.test(password)) {
            setPasswordError('Password must contain at least one symbol');
        } else if (password.length < 9) {
            setPasswordError('Password is weak');
        } else {
            setPasswordError('');
        }
    };

    // Validation functions for Log In
    const validateLoginEmployeeId = () => {
        if (employeeId.length !== 5) {
            setLoginEmployeeIdError('Employee ID must be 5 digits');
        } else {
            setLoginEmployeeIdError('');
        }
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
                    <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} onBlur={action === 'Sign Up' ? validateSignupEmployeeId : validateLoginEmployeeId} />
                </div>
                {action === 'Sign Up' && signupEmployeeIdError && <div className="validation-message">{signupEmployeeIdError}</div>}
                {action === 'Login' && loginEmployeeIdError && <div className="validation-message">{loginEmployeeIdError}</div>}
                {action === "Sign Up" && (
                    <>
                        <div className="input">
                            <img src={name_icon} alt="Name" />
                            <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setInputFirstName(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={name_icon} alt="Name" />
                            <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setInputLastName(e.target.value)} />
                        </div>
                        <div className="input">
                            <img src={role_icon} alt="Role" />
                            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                    </>
                )}
                <div className="input">
                    <img src={password_icon} alt="Password" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
                </div>
                {passwordError && <div className="validation-message">{passwordError}</div>}
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
                <div className="message">{message}</div>
            )}
            <div className="page-container">
                <div className="page" onClick={goToHome}>Home</div>
                <div className="page" onClick={goToInsertPage}>Insert Page</div>
            </div>
        </div>
    );
};

export default LoginSignup;