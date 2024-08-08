// Home.js
import React, { useEffect, useState } from "react";
import './Home.css';

const Home = () => {
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowBox(true), 100); // Trigger animation after 100ms
    }, []);

    return (
        <div className="home">
            <div className={`welcome-box ${showBox ? 'show' : ''}`}>
                <h1>Welcome to the Parcel Management System!</h1>
                <p>The easier and safest way to deliver your packages.</p>
                <ul className="features">
                    <li>Realtime location tracking using mobile app</li>
                    <li>Online registration</li>
                    <li>SMS service</li>
                    <li>Online chat box</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
