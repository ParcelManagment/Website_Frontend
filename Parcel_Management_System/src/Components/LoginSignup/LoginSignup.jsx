import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './LoginSignup.css'

import employee_id_icon from '../Assests/EmployeeID.png';
import name_icon from '../Assests/Name.png';
import role_icon from '../Assests/Role.png';
import password_icon from '../Assests/Password.png';

// Set the base URL for Axios
//axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'http://ec2-13-60-83-24.eu-north-1.compute.amazonaws.com:3000';

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
    const navigate = useNavigate();

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
        if (!employeeId || !password || !fname || !lname || !role) {
            setMessage('Please fill in all fields');
            setLoading(false);
            return;
            
        }
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
            return false;
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase and one uppercase letter');
            return false;
        } else if (!/\d/.test(password) && !/[^\w\s]/.test(password)) {
            setPasswordError('Password must contain at least one symbol');
            return false;
        } else if (password.length < 9) {
            setPasswordError('Password is weak');
            return false;
        } else {
            setPasswordError('');
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
            return false;
        } else {
            setLoginEmployeeIdError('');
            return true;
        }
    };

    return (
        <div>
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
                                <input type="text" placeholder="First Name" value={fname} onChange={(e) => setInputFirstName(e.target.value)} />
                            </div>
                            <div className="input">
                                <img src={name_icon} alt="Name" />
                                <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setInputLastName(e.target.value)} />
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
                            if (!loading && action === 'Sign Up' && validateSignupFields()) {
                                handleSignup();
                            } else if (!loading) {
                                setAction('Sign Up');
                                clearMessages();
                            }
                        }}
                        disabled={loading} // Disable the button while loading
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => {
                            if (!loading && action === 'Login') {
                                handleLogin();
                            } else if (!loading) {
                                setAction('Login');
                                clearMessages();
                            }
                        }}
                        disabled={loading} // Disable the button while loading
                    >
                        Log In
                    </div>
                </div>
                {loading ? (
                    <div className="message">
                        <ClipLoader color={"#4c004c"} loading={loading} size={30} /> {/* Reduced size from 50 to 30 */}
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
