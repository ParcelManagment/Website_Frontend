import React, { useState } from 'react';
import './ViewPage.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search_img from '../Assests/search3.png'; 

const ViewPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parcelData, setParcelData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(`/package/fetchbyid/${searchTerm}`);
            if (!response.data || Object.keys(response.data).length === 0) {
                alert('No data found for the given Parcel ID.');
                setParcelData(null);
            } else {
                setParcelData(response.data);
            }
        } catch (err) {
            setError('Failed to fetch parcel data. Please try again.');
            console.log("Failed to fetch data", err);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        const receiverId = parcelData.package.receiver_id;
        if (!receiverId) {
            alert("Receiver ID is missing!");
            return;
        }

        try {
            const response = await axios.put(`/package/edituser/${receiverId}}`, {
                receiver_first_name: parcelData.receiver.first_name,
                receiver_last_name: parcelData.receiver.last_name,
                receiver_email: parcelData.receiver.email,
                receiver_mobile_number: parcelData.receiver.mobile_number
            });

            if (response.status === 200) {
                alert('User details updated successfully');
                setIsEditing(false);
            } else {
                alert('Failed to update user details');
            }
        } catch (err) {
            console.error("Error updating user:", err);
            alert('Failed to update user details');
        }
    };

    const handleDelete = async () => {
        if (!parcelData) {
            alert('No parcel data available to delete.');
            return;
        }

        const packageId = parcelData.package.package_id;
        if (!packageId) {
            alert('Package ID is missing!');
            return;
        }

        try {
            const response = await axios.delete(`/package/deletepackage/${packageId}`);
            if (response.status === 200) {
                alert('Package cancelled successfully');
                setParcelData(null); // Clear parcel data after successful deletion
            } else {
                alert('Failed to cancel package');
            }
        } catch (err) {
            console.error("Error deleting package:", err);
            alert('Failed to cancel package');
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
                <form className="row" onSubmit={(e) => e.preventDefault()}>
                    {/* Package Details */}
                    <div className="form-section package-details col-12 col-md-6 col-lg-3">
                        <h2>Package Details</h2>
                        <div className="form-group">
                            <label htmlFor="type">Type of Package:</label>
                            <input type="text" name="type" value={parcelData.package.type || ''} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="packageCondition">Condition of Package:</label>
                            <input type="text" name="packageCondition" value={parcelData.package.package_condition || ''} readOnly className="form-control" />
                        </div>
                        <div className="form-group"> 
                            <label htmlFor='destination'>Destination:</label>
                            <input type="text" name="destination" value={parcelData.package.destination || ''} readOnly  className="form-control"/>
                        </div>
                    </div>

                    {/* Sender Details */}
                    <div className="form-section sender-details col-12 col-md-6 col-lg-3">
                        <h2>Sender Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="senderName" value={parcelData.sender.first_name || ''} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="senderLastName" value={parcelData.sender.last_name || ''} readOnly className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="senderEmail" value={parcelData.sender.email || ''} readOnly className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="senderPhone" value={parcelData.sender.mobile_number || ''} readOnly className="form-control"/>
                        </div>
                    </div>

                    {/* Receiver Details */}
                    <div className="form-section receiver-details col-12 col-md-6 col-lg-3">
                        <h2>Receiver Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="receiverName"
                                value={parcelData.receiver.first_name || ''}
                                className="form-control"
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        first_name: e.target.value,
                                    },
                                }))}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="receiverLastName"
                                value={parcelData.receiver.last_name || ''}
                                className="form-control"
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        last_name: e.target.value,
                                    },
                                }))}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                name="receiverEmail"
                                value={parcelData.receiver.email || ''}
                                className="form-control"
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        email: e.target.value,
                                    },
                                }))}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                name="receiverPhone"
                                value={parcelData.receiver.mobile_number || ''}
                                className="form-control"
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        mobile_number: e.target.value,
                                    },
                                }))}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    {/* Edit / Save button */}
                    <div className="form-group col-12">
                        {!isEditing ? (
                            <button className="btn btn-primary btn-block" type="button" onClick={handleEdit}>Edit</button>
                        ) : (
                            <button className="btn btn-primary btn-block" type="submit"onClick={handleUpdate} >Save</button>
                        )}
                        <br />
                        <button type="button" className="btn btn-primary btn-block" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
};

export default ViewPage;
