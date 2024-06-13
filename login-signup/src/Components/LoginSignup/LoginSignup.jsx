import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'

import email_icon from '../Assests/Email.png'
import password_icon from '../Assests/Password.png'
import user_icon from '../Assests/Person.png'

const LoginSignup = () => {

    const [action,setAction] = useState('Login');
    const navigate = useNavigate();

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
            {action==="Login"?<div></div>:<div className="input">
                <img src={user_icon} alt=""/>
                <input type="text" placeholder="Name"/>
            </div> }

            <div className="input">
                <img src={email_icon} alt=""/>
                <input type="email" placeholder="Email" />
            </div> 
            <div className="input">
                <img src={password_icon} alt=""/>
                <input type="password" placeholder="Password"/>
            </div> 
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here !</span></div>}
        
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={() => setAction('Sign Up')}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() => setAction('Login')}>Log In</div>
        </div>

        <div className="page-container">
            <div className="page" onClick={goToHome}>Home</div>
            <div className="page" onClick={goToInsertPage}>Insert-Page</div>
        </div>
    </div>
    )
}

export default LoginSignup


/* This is a way to size down the image */
/*
email_icon.style.width = '25px';
email_icon.style.height = '25px';
.
*/
