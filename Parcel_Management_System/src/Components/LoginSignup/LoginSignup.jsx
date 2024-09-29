import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './LoginSignup.css';

import employee_id_icon from '../Assests/EmployeeID.png';
import password_icon from '../Assests/Password.png';
import website_logo from '../Assests/logo.jpg'; 

// Set the base URL for Axios
axios.defaults.baseURL = '/api';

const LoginSignup = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [loginEmployeeIdError, setLoginEmployeeIdError] = useState('');
    const [isLoginEmployeeIdValid, setIsLoginEmployeeIdValid] = useState(false);
    const [touched, setTouched] = useState({
        employeeId: false,
        password: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        validateLoginEmployeeId();
    }, [employeeId, password]);

    const handleLogin = async () => {
        setLoading(true);
        setMessage('');
        if (!employeeId || !password) {
            setMessage('Please enter employee ID and password');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post('/staff/login', {
                employee_id: employeeId,
                password: password
            });
            setMessage('Login Successful');
            localStorage.setItem('employee_id', employeeId); // Store employee_id in local storage
            navigate('/home');
        } catch (error) {
            setMessage('Login Failed: ' + (error.response ? error.response.data.Error : 'Server Error'));
        } finally {
            setLoading(false);
        }
    };

    const validateLoginEmployeeId = () => {
        if (employeeId.length !== 5) {
            setLoginEmployeeIdError('Employee ID must be 5 digits');
            setIsLoginEmployeeIdValid(false);
            return false;
        } else {
            setLoginEmployeeIdError('');
            setIsLoginEmployeeIdValid(true);
            return true;
        }
    };

    const handleBlur = (field) => {
        setTouched({
            ...touched,
            [field]: true,
        });

        if (field === 'employeeId') {
            validateLoginEmployeeId();
        }
    };

    return (
        <div>
            <div className="container">


                <div className="logo-container">    
                    <img src={website_logo} alt="Website Logo" className="website-logo" />
                </div>


                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={employee_id_icon} alt="Employee ID" />
                        <input
                            type="text"
                            placeholder="Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            onBlur={() => handleBlur('employeeId')}
                        />
                    </div>
                    {loginEmployeeIdError && touched.employeeId && <div className="validation-message">{loginEmployeeIdError}</div>}
                    <div className="input">
                        <img src={password_icon} alt="Password" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleBlur('password')}
                        />
                    </div>
                </div>
                <div className="forgot-password">
                    Admin Login? 
                    <a 
                    href="http://ec2-13-53-200-229.eu-north-1.compute.amazonaws.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="admin-login-link"
                    >
                    Click Here!
                    </a>
                </div>
                <div className="submit-container">
                    <div
                        className="submit"
                        onClick={() => {
                            if (!loading) {
                                if (isLoginEmployeeIdValid) {
                                    handleLogin();
                                } else {
                                    setMessage('Please enter valid employee ID and password');
                                }
                            }
                        }}
                        disabled={loading || !isLoginEmployeeIdValid} // Disable the button while loading or if validation fails
                    >
                        Log In
                    </div>
                </div>
                {loading ? (
                    <div className="message">
                        <ClipLoader color={"#f00"} loading={loading} size={30} />
                    </div>
                ) : (
                    message && (
                        <div className="message">{message}</div>
                    )
                )}
            </div>
        </div>
    );
};

export default LoginSignup;

