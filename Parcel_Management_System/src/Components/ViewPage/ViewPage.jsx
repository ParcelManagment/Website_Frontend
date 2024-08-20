import React, { useState } from 'react';
import './ViewPage.css';
import Search_img from '../Assests/search3.png'; 

const ViewPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parcelData, setParcelData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null); 
    
        try {
            const response = await fetch(`http://localhost:3000/package/fetchbyid/${searchTerm}`);  // Updated URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data || Object.keys(data).length === 0) {
                
                
                alert('No data found for the given Parcel ID.');
                setParcelData(null);
            } else {
                setParcelData(data);
            }
            
        } catch (err) {
            setError('Failed to fetch parcel data. Please try again.');
            console.log("Failed to fetch data", err);
        }
    };
    
   

    

    return (
        <div className="search-form-container">
            <form className="form" onSubmit={handleSearch}>
                <div className='input_wrapper'>
                    <input
                        type="text"
                        placeholder="Enter Parcel ID Here..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='input_box'
                    />
                    <button type="submit" className='search_button'>
                        <img src={Search_img} alt='search_image' className='search_img' />
                    </button>
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}
            {parcelData && (
            <div className="form-container">
                <form>
                    <div className="form-section">
                        <h2>Sender Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="senderName" value={parcelData.sender.sender_first_name || ''} readOnly  />
                        </div>
                        <div className="form-group">
                            <label>Second Name:</label>
                            <input type="text" name="secondName"  value={parcelData.sender.sender_last_name || ''} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="senderEmail" value={parcelData.sender.sender_email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="senderPhone"  value={parcelData.sender.sender_mobile_number || ''} readOnly/>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Receiver Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="receiverName" value={parcelData.receiver.receiver_first_name || ''} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="receiverLastName"  value={parcelData.receiver.receiver_last_name || ''} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="receiverEmail" value={parcelData.receiver.receiver_email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="receiverPhone" value={parcelData.receiver.receiver_mobile_number || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Package Details</h2>
                        
                        <div className="form-group">
                            <label>Type of Package:</label>
                            <input type="text" name="parcelType" value={parcelData.package.type || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Package Condition:</label>
                            <input type="text" name="parcelCondition" value={parcelData.package.package_condition || ''} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Destination:</label>
                            <input type="text" name="parcelDestination"  value={parcelData.package.destination || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Additional Details</h2>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text" name="price"  value={parcelData.package.price || ''} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Tracking Device ID:</label>
                            <input type="text" name="trackingID" value={parcelData.package.tracking_device_id || ''} readOnly   />
                        </div>
                        
                    </div>

                    <button type="button" className="submit_button">Delete</button>
                </form>
            </div>
            )}
           
        </div>
    );
};

export default ViewPage;
