import React, { useState } from 'react';
import './ViewPage.css';
import Search_img from '../Assests/search3.png'; 

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parcelData, setParcelData] = useState(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://ec2-13-60-83-24.eu-north-1.compute.amazonaws.com:3001/package/fetch/${searchTerm}`);
        const data = await response.json();
        setParcelData(data);
        console.log('Fetched Data:', data);
    };

    return (
        <div className="search-form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className='input_wrapper'>
                    <input
                        type="text"
                        placeholder="Enter Parcel ID Here..."
                        value={searchTerm}
                        onChange={handleChange}
                        className='input_box'
                    />
                    <button type="submit" className='search_button'>
                        <img src={Search_img} alt='search_image' className='search_img' />
                    </button>
                </div>
            </form>

            {parcelData && (

            <div className="form-container">
                <form>
                    <div className="form-section">
                        <h2>Sender Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="senderName" value={parcelData.sender.first_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Second Name:</label>
                            <input type="text" name="secondName" value={parcelData.sender.last_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="senderEmail" value={parcelData.sender.email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="senderPhone" value={parcelData.sender.mobile_number || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Receiver Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="receiverName" value={parcelData.receiver.first_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="receiverLastName" value={parcelData.receiver.last_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="receiverEmail" value={parcelData.receiver.email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="receiverPhone" value={parcelData.receiver.mobile_number || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Package Details</h2>
                        <div className="form-group">
                            <label>Package ID:</label>
                            <input type="text" name="parcelID" value={parcelData.package.package_id || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Type of Package:</label>
                            <input type="text" name="parcelType" value={parcelData.package.type || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Package Condition:</label>
                            <input type="text" name="parcelCondition" value={parcelData.package.package_condition || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Destination:</label>
                            <input type="text" name="parcelDestination" value={parcelData.package.destination || ''} readOnly />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Additional Details</h2>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text" name="price" value={parcelData.package.price || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Tracking Device ID:</label>
                            <input type="text" name="trackingID" value={parcelData.package.tracking_device_id || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Uploaded Documents:</label>
                            <input type="file" name="images" readOnly />
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
            )}
        </div>
    );
};

export default SearchBox;
