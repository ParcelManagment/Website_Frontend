import React, { useEffect, useState } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [showBox, setShowBox] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                await axios.get('/staff/profile');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/');
                }
            }
        };

        checkAuthorization();

        setTimeout(() => setShowBox(true), 100); // Trigger animation after 100ms
    }, [navigate]);

    return (
        <div className="home">
            <div className="containerhome">
            <div className={`details-box ${showBox ? 'show' : ''}`}>

                    <h2>Welcome to the Parcel Management System!</h2>
                    <p>
                        Our platform streamlines the process of managing packages for train-based transfers, ensuring safe and efficient delivery. Officers can easily input parcel details, track shipments, and manage package conditions, all in one place.
                    </p>
                    <h3>Features</h3>
                    <ul>
                        <li>Efficient Parcel Management</li>
                        <li>Real-time Tracking Integration</li>
                        <li>Easy Insert and Search Functions</li>
                        <li>Comprehensive Data Management</li>
                        <li>Security and Privacy</li>
                    </ul>
                    <p>
                        Easily manage package entries, update information, and track the progress of parcels in transit with our intuitive system. Whether you're entering new data or searching for an existing package, our platform provides all the tools you need to ensure smooth operations.
                    </p>
                </div>
                <div className="side-boxes">
                    <button onClick={() => navigate('/insert')}>Insert Package Details</button>
                    <button onClick={() => navigate('/view')}>Search and Manage Packages</button>
                </div>
            </div>
        </div>
    );
}

export default Home;