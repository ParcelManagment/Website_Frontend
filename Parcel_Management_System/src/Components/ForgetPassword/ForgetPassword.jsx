import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import './ForgetPassword.css';

import employee_id_icon from '../Assests/EmployeeID.png';
import password_icon from '../Assests/Password.png';
import new_password_icon from '../Assests/NewPassword.png'; // Placeholder for new password icon

const ForgetPassword = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypeNewPassword, setRetypeNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Reset message and loading
        setLoading(true);
        setMessage('');

        // Validation
        const errors = {};
        if (employeeId.length !== 5) errors.employeeId = 'Employee ID must be 5 digits';
        if (!password) errors.password = 'Current password is required';
        if (newPassword.length < 6) errors.newPassword = 'New password must be at least 6 characters';
        if (newPassword !== retypeNewPassword) errors.retypeNewPassword = 'Passwords do not match';

        setErrors(errors);
        if (Object.keys(errors).length !== 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/staff/changepass', {
                employee_id: employeeId,
                password: password,
                new_password: newPassword
            });
            setMessage('Password successfully updated!');
            setTimeout(() => {
                navigate('/'); // Redirect to login after success
            }, 2000);
        } catch (error) {
            setMessage('Password reset failed: ' + (error.response ? error.response.data.Error : 'Server Error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="containerFP">
            <div className="header">
                <div className="text">Reset Password</div>
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
                    />
                </div>
                {errors.employeeId && <div className="validation-message">{errors.employeeId}</div>}

                <div className="input">
                    <img src={password_icon} alt="Current Password" />
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errors.password && <div className="validation-message">{errors.password}</div>}

                <div className="input">
                    <img src={new_password_icon} alt="New Password" />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                {errors.newPassword && <div className="validation-message">{errors.newPassword}</div>}

                <div className="input">
                    <img src={new_password_icon} alt="Retype New Password" />
                    <input
                        type="password"
                        placeholder="Retype New Password"
                        value={retypeNewPassword}
                        onChange={(e) => setRetypeNewPassword(e.target.value)}
                    />
                </div>
                {errors.retypeNewPassword && <div className="validation-message">{errors.retypeNewPassword}</div>}
            </div>

            <div className="submit-container">
                <div
                    className="submit"
                    onClick={() => {
                        if (!loading) {
                            handleSubmit();
                        }
                    }}
                >
                    {loading ? <ClipLoader color={"#87d094 "} loading={loading} size={30} /> : 'Submit'}
                </div>
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default ForgetPassword;
