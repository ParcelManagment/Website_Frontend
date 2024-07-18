import React, { useState } from 'react';
import './Home.css';
import Search_img from '../Assests/search3.png'; 

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Search Term:', searchTerm);
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

            <div className="form-container">
                <form>
                    <div className="form-section">
                        <h2>Sender Details</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="senderName" />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" name="senderAddress" />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="senderPhone" />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Receiver Details</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="receiverName" />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" name="receiverAddress" />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="receiverPhone" />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Parcel Details</h2>
                        <div className="form-group">
                            <label>Type of Parcel:</label>
                            <input type="text" name="parcelType" />
                        </div>
                        <div className="form-group">
                            <label>Condition:</label>
                            <input type="text" name="parcelCondition" />
                        </div>
                        <div className="form-group">
                            <label>Destination:</label>
                            <input type="text" name="parcelDestination" />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Additional Details</h2>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text" name="price" />
                        </div>
                        <div className="form-group">
                            <label>Tracking Device ID:</label>
                            <input type="text" name="trackingID" />
                        </div>
                        <div className="form-group">
                            <label>Upload Images:</label>
                            <input type="file" name="images" />
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
