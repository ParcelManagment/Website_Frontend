import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'

import email_icon from '../Assests/Email.png'
import password_icon from '../Assests/Password.png'
import user_icon from '../Assests/Person.png'
import mobile_icon from '../Assests/Mobile.png'

const LoginSignup = () => {
    const [action, setAction] = useState('Login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const navigate = useNavigate();

// Validation functions
const validateUsername = (username) => {
    if (username.length < 5) {
        return "Username must be at least 5 characters long";
    }
    if (/\d/.test(username)) {
        return "Username cannot contain numbers";
    }
    return '';
};

const validateMobileNumber = (mobileNumber) => {
    if (mobileNumber.length !== 10) {
        return "Mobile number must be 10 characters long";
    }
    if (!mobileNumber.startsWith('0')) {
        return "Mobile number must start with 0";
    }
    return '';
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
        return "Enter a valid email address";
    }
    return '';
};

const validatePassword = (password) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least one number";
    }
    return '';
};

const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(validateUsername(value));
};

const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(validateEmail(value));
};

const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
};

const handleMobileNumberChange = (value) => {
    setMobileNumber(value);
    setMobileNumberError(validateMobileNumber(value));
};

    const handleSignup = async () => {
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const mobileNumberError = validateMobileNumber(mobileNumber);

        setUsernameError(usernameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setMobileNumberError(mobileNumberError);




        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch('/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    mobile_number: mobileNumber || null
                })
            });

            if (response.ok) {
                alert("User registered successfully");
                setAction('Login');
            } else {
                const data = await response.json();
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed");
        }
    };

    const handleLogin = async () => {
        const emailError = validateEmail(email);

        setEmailError(emailError);

        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("Login successful");
                // navigate('/home'); // Uncomment this to navigate to home page
            } else {
                const data = await response.json();
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed");
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
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input 
                            type="text" 
                            placeholder="Name"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                        />
                        {usernameError && <div className="error-message">{usernameError}</div>}
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div> 
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={mobile_icon} alt="" />
                        <input 
                            type="text" 
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => handleMobileNumberChange(e.target.value)}
                        />
                        {mobileNumberError && <div className="error-message">{mobileNumberError}</div>}
                    </div>
                )}
            </div>
            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Forgot Password? <span>Click Here !</span>
                </div>
            )}
            <div className="submit-container">
                {action === "Sign Up" ? (
                    <div 
                        className="submit" 
                        onClick={handleSignup}
                    >
                        Register
                    </div>
                ) : (
                    <div 
                        className="submit" 
                        onClick={handleLogin}
                    >
                        Login
                    </div>
                )}
                <div 
                    className="submit gray" 
                    onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}
                >
                    {action === 'Login' ? 'Sign Up' : 'Log In'}
                </div>
            </div>
            <div className="page-container">
                <div className="page" onClick={goToHome}>Home</div>
                <div className="page" onClick={goToInsertPage}>Insert-Page</div>
            </div>
        </div>
    );
};

export default LoginSignup;