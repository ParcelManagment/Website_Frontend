import React, { useState } from 'react';
import './ViewPage.css';
import Search_img from '../Assets/search3.png'; 

const ViewPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parcelData, setParcelData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null); 
    
        try {
            const response = await fetch(`/api/package/fetchbyid/${searchTerm}`);
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

    const handleDelete = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`/api/package/deletepackage/${searchTerm}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the package');
            }
            alert('Package deleted successfully');
            setParcelData(null);
            setSearchTerm('');
        } catch (err) {
            setError('Failed to delete the package. Please try again.');
            console.log("Failed to delete data", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`/api/package/edituser/${searchTerm}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiver_first_name: parcelData.receiver.receiver_first_name,
                    receiver_last_name: parcelData.receiver.receiver_last_name,
                    receiver_email: parcelData.receiver.receiver_email,
                    receiver_mobile_number: parcelData.receiver.receiver_mobile_number,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update the package');
            }
            alert('Package updated successfully');
            setIsEditing(false);
            setSearchTerm(''); 
        } catch (err) {
            setError('Failed to update the package. Please try again.');
            console.log("Failed to update data", err);
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
                    {/* Sender Details */}
                    <div className="form-section">
                        <h2>Sender Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="senderName" value={parcelData.sender.sender_first_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="senderLastName" value={parcelData.sender.sender_last_name || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" name="senderEmail" value={parcelData.sender.sender_email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="senderPhone" value={parcelData.sender.sender_mobile_number || ''} readOnly />
                        </div>
                    </div>

                    {/* Receiver Details */}
                    <div className="form-section">
                        <h2>Receiver Details</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="receiverName"
                                value={parcelData.receiver.receiver_first_name || ''}
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        receiver_first_name: e.target.value,
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
                                value={parcelData.receiver.receiver_last_name || ''}
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        receiver_last_name: e.target.value,
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
                                value={parcelData.receiver.receiver_email || ''}
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        receiver_email: e.target.value,
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
                                value={parcelData.receiver.receiver_mobile_number || ''}
                                onChange={(e) => setParcelData(prevData => ({
                                    ...prevData,
                                    receiver: {
                                        ...prevData.receiver,
                                        receiver_mobile_number: e.target.value,
                                    },
                                }))}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    {/* Edit / Save button */}
                    <div className="form-actions">
                        {!isEditing ? (
                            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                        ) : (
                            <button type="submit" onClick={handleUpdate}>Save</button>
                        )}
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
};

export default ViewPage;
