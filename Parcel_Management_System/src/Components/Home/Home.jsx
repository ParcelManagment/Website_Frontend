import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShippingFast, FaMapMarkedAlt, FaUserPlus, FaDatabase, FaLock } from 'react-icons/fa';

const Home = () => {
    const [showBox, setShowBox] = useState(false);
    const [expandedFeature, setExpandedFeature] = useState(null);

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

    const handleFeatureClick = (index) => {
        setExpandedFeature(expandedFeature === index ? null : index);
    };

    return (
        <div className="home container-fluid d-flex justify-content-center align-items-center">
            <div className="content-wrapper">
                <div className={`left-section ${showBox ? 'slide-in-left' : ''}`}>
                    <h2 className="text-center">Welcome to the Parcel Management System!</h2>
                    <p>
                        Our platform is designed to simplify the process of managing packages for train-based transfers, ensuring that package deliveries are safe, efficient, and seamlessly tracked.
                    </p>
                    <h3>Features</h3>
                    <ul>
                        {[
                            { 
                                text: 'Efficient Parcel Management', 
                                icon: <FaShippingFast />, 
                                description: 'Streamline your parcel management process with intuitive features that reduce time and increase productivity. Easily categorize and organize parcels for quick access.' 
                            },
                            { 
                                text: 'Real-time Tracking Integration', 
                                icon: <FaMapMarkedAlt />, 
                                description: 'Keep track of your parcels in real-time with integrated tracking systems. Get updates on the current location and status of your packages at any time.' 
                            },
                            { 
                                text: 'User-Friendly Insert and Search Functions', 
                                icon: <FaUserPlus />, 
                                description: 'Easily insert new package details or search for existing ones. Our user-friendly interface ensures that anyone can navigate the system without hassle.' 
                            },
                            { 
                                text: 'Comprehensive Data Management', 
                                icon: <FaDatabase />, 
                                description: 'Manage all your data efficiently in one place. Store, retrieve, and analyze package information with advanced data management tools.' 
                            },
                            { 
                                text: 'Security and Privacy', 
                                icon: <FaLock />, 
                                description: 'Rest easy knowing that your data is secure. Our platform uses top-notch security measures to protect your information and ensure privacy at all times.' 
                            }
                        ].map((feature, index) => (
                            <li
                                key={index}
                                className={`feature-item ${expandedFeature === index ? 'expanded' : ''}`}
                                onClick={() => handleFeatureClick(index)}
                            >
                                <div className="feature-content">
                                    {feature.icon} {feature.text}
                                </div>
                                <div className="feature-description">
                                    {expandedFeature === index && (
                                        <p>
                                            {feature.description}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`right-section ${showBox ? 'slide-in-right' : ''}`}>
                    <div className="details-box">
                        <h3>Ready to get started?</h3>
                        <p>Add new package information quickly and easily.</p>
                        <button className="custom-button mb-3" onClick={() => navigate('/insert')}>Insert Package Details</button>
                    </div>
                    <div className="details-box">
                        <p>Find and manage existing packages with just a few clicks.</p>
                        <button className="custom-button" onClick={() => navigate('/view')}>Search and Manage Packages</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
