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
                const response = await axios.get(`/staff/profile`);
                const { employee } = response.data; // Destructure the employee object from the response
                setProfile(employee);
                setLoading(false);
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

    const handleLogout = async () => {
        try {
            await axios.get('/staff/logout');
            localStorage.removeItem('employee_id');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profile-page">
            <h1>User Details</h1>
            <div className="profile-photo-container">
                <div className="profile-photo">
                    <img src={profile && profile.profile_picture ? profile.profile_picture : defaultProfilePic} alt="Profile" />
                </div>
            </div>
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


            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
