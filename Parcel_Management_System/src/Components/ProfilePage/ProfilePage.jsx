import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Mocking the response locally for development
                const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

                if (isDevelopment) {
                    // Simulate a delay for development environment
                    setTimeout(() => {
                        const mockProfile = {
                            employee_id: 'null',
                            first_name: 'null',
                            last_name: 'null',
                            role: 'null',
                        };
                        setProfile(mockProfile);
                        setLoading(false);
                    }, 1000); // 1-second delay to simulate API call
                } else {
                    // Use real API call in production or when backend is available
                    const response = await axios.get(`/staff/profile`);
                    const { employee } = response.data; // Destructure the employee object from the response
                    setProfile(employee);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/');
                } else {
                    setError('Failed to fetch profile data');
                }
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChangePassword = () => {
        // Navigate to the Change Password page
        navigate('/ForgetPassword');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profile-page1">
            <h1>User Details</h1>
            <div className="profile-details">
    <div className="detail-row">
        <strong className="label">Employee ID</strong>
        <span className="colon">:</span>
        <span className="value">{profile.employee_id}</span>
    </div>
    <div className="detail-row">
        <strong className="label">First Name</strong>
        <span className="colon">:</span>
        <span className="value">{profile.first_name}</span>
    </div>
    <div className="detail-row">
        <strong className="label">Last Name</strong>
        <span className="colon">:</span>
        <span className="value">{profile.last_name}</span>
    </div>
    <div className="detail-row">
        <strong className="label">Role</strong>
        <span className="colon">:</span>
        <span className="value">{profile.role} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

</div>


            <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default ProfilePage;