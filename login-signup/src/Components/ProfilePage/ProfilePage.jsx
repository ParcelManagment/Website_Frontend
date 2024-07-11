import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ProfilePage.css';
import defaultProfilePic from '../Assests/defaultProfilePhoto.png';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const employee_id = localStorage.getItem('employee_id'); // Get employee_id from localStorage or context
            if (!employee_id) {
                setError('Employee ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/employee/profile/${employee_id}`);
                setProfile(response.data.employee);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch profile data');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

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
                <p><strong>Employee ID:</strong> {profile.employee_id}</p>
                <p><strong>First Name:</strong> {profile.first_name}</p>
                <p><strong>Last Name:</strong> {profile.last_name}</p>
                <p><strong>Role:</strong> {profile.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
