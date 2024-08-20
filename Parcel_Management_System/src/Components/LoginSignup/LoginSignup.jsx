import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './LoginSignup.css'

import employee_id_icon from '../Assests/EmployeeID.png';
import name_icon from '../Assests/Name.png';
import role_icon from '../Assests/Role.png';
import password_icon from '../Assests/Password.png';
import website_logo from '../Assests/logo.jpg'; 

// Set the base URL for Axios
//axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = '/api';

const LoginSignup = () => {
    const [action, setAction] = useState('Login');
    const [employeeId, setEmployeeId] = useState('');
    const [fname, setInputFirstName] = useState('');
    const [lname, setInputLastName] = useState('');
    const [role, setRole] = useState(''); // Added state for role
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); // State for message
    const [signupEmployeeIdError, setSignupEmployeeIdError] = useState('');
    const [loginEmployeeIdError, setLoginEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoginEmployeeIdValid, setIsLoginEmployeeIdValid] = useState(false);
    const [isLoginPasswordValid, setIsLoginPasswordValid] = useState(false);
    const [touched, setTouched] = useState({
        employeeId: false,
        fname: false,
        lname: false,
        role: false,
        password: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        validateLoginEmployeeId();
        validatePassword();
    }, [employeeId, password]);

    const handleSignup = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/staff/signup', {
                employee_id: employeeId,
                fname: fname,
                lname: lname,
                role: role, // Pass role to backend if needed
                password: password
            });
            setMessage('Registration Successful'); // Set success message
            // Navigate to home page or show success message
            setAction('Login');
            //navigate('/');
        } catch (error) {
            console.log(error);
            setMessage('Registration Failed: ' + (error.response ? error.response.data.Error : 'Server Error')); // Set error message
        } finally {
            setLoading(false);
        }
    };

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
            setMessage('Login Successful'); // Set success message
            localStorage.setItem('employee_id', employeeId); // Store employee_id in local storage
            // Navigate to home page or show success message
            navigate('/home');
        } catch (error) {
            setMessage('Login Failed: ' + (error.response ? error.response.data.Error : 'Server Error')); // Set error message
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = () => {
        setMessage('');
        setSignupEmployeeIdError('');
        setLoginEmployeeIdError('');
        setPasswordError('');
    };

    // Validation functions for Sign Up
    const validateSignupEmployeeId = () => {
        if (employeeId.length !== 5) {
            setSignupEmployeeIdError('Employee ID must be 5 digits');
            return false;
        } else if (!/^\d+$/.test(employeeId)) {
            setSignupEmployeeIdError('Only integers are allowed');
            return false;
        } else {
            setSignupEmployeeIdError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be longer than 6 characters');
            setIsLoginPasswordValid(false);
            return false;
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase and one uppercase letter');
            setIsLoginPasswordValid(false);
            return false;
        } else if (!/\d/.test(password) && !/[^\w\s]/.test(password)) {
            setPasswordError('Password must contain at least one symbol');
            setIsLoginPasswordValid(false);
            return false;
        } else if (password.length < 9) {
            setPasswordError('Password is weak');
            setIsLoginPasswordValid(false);
            return false;
        } else {
            setPasswordError('');
            setIsLoginPasswordValid(true);
            return true;
        }
    };

    const validateSignupFields = () => {
        const isEmployeeIdValid = validateSignupEmployeeId();
        const isPasswordValid = validatePassword();
        return isEmployeeIdValid && isPasswordValid && fname !== '' && lname !== '' && role !== '';
    };

    // Validation functions for Log In
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
        } else if (field === 'password') {
            validatePassword();
        } else if (field === 'signupEmployeeId') {
            validateSignupEmployeeId();
        }
    };

    return (
        <div>
            <div className="container">
                {action === 'Login' && (
                    <div classname="logo-container">    
                        <img src={website_logo} alt="Website Logo"  className="website-logo"/>
                    </div>
                )}
                <div className="header">
                    <div className="text">{action}</div>
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
                            onBlur={() => handleBlur(action === 'Sign Up' ? 'signupEmployeeId' : 'employeeId')}
                        />
                    </div>
                    {action === 'Sign Up' && signupEmployeeIdError && touched.signupEmployeeId && <div className="validation-message">{signupEmployeeIdError}</div>}
                    {action === 'Login' && loginEmployeeIdError && touched.employeeId && <div className="validation-message">{loginEmployeeIdError}</div>}
                    {action === "Sign Up" && (
                        <>
                            <div className="input">
                                <img src={name_icon} alt="Name" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={fname}
                                    onChange={(e) => setInputFirstName(e.target.value)}
                                    onBlur={() => handleBlur('fname')}
                                />
                            </div>
                            <div className="input">
                                <img src={name_icon} alt="Name" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lname}
                                    onChange={(e) => setInputLastName(e.target.value)}
                                    onBlur={() => handleBlur('lname')}
                                />
                            </div>
                            <div className="input">
                                <img src={role_icon} alt="Role" />
                                <input
                                    type="text"
                                    placeholder="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    onBlur={() => handleBlur('role')}
                                />
                            </div>
                        </>
                    )}
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
                    {passwordError && touched.password && <div className="validation-message">{passwordError}</div>}
                </div>
                {action === "Login" && (
                    <div className="forgot-password">
                        Forgot Password? <span onClick={() => navigate('/forgetpassword')}>Click Here!</span>
                    </div>
                )}
                <div className="submit-container">
                    <div
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={() => {
                            if (!loading) {
                                if (action === 'Sign Up') {
                                    if (validateSignupFields()) {
                                        handleSignup();
                                    } else {
                                        setMessage('Please fill in all fields');
                                    }
                                } else {
                                    setAction('Sign Up');
                                    clearMessages();
                                }
                            }
                        }}
                        disabled={loading} // Disable the button while loading
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => {
                            if (!loading) {
                                if (action === 'Login' && isLoginEmployeeIdValid && isLoginPasswordValid) {
                                    handleLogin();
                                } else if (action === 'Login') {
                                    setMessage('Please enter valid employee ID and password');
                                } else {
                                    setAction('Login');
                                    clearMessages();
                                }
                            }
                        }}
                        disabled={loading || !isLoginEmployeeIdValid || !isLoginPasswordValid} // Disable the button while loading or if validation fails
                    >
                        Log In
                    </div>
                </div>
                {loading ? (
                    <div className="message">
                        <ClipLoader color={"#f00"} loading={loading} size={30} /> {/* Reduced size from 50 to 30 */}
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
