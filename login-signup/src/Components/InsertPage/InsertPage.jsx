import React from 'react';
import './InsertPage.css';

const InsertPage = () => {
  return (
    <div className="container">
      <h1>Parcel Details Form</h1>

      <form>
        <div className="section">
          <h2>Sender Details</h2>
          <div className="form-group">
            <label htmlFor="senderName">Name</label>
            <input type="text" id="senderName" name="senderName" required />
          </div>
          <div className="form-group">
            <label htmlFor="senderAddress">Address</label>
            <input type="text" id="senderAddress" name="senderAddress" required />
          </div>
          <div className="form-group">
            <label htmlFor="senderPhone">Phone Number</label>
            <input type="tel" id="senderPhone" name="senderPhone" required />
          </div>
        </div>

        <div className="section">
          <h2>Parcel Details</h2>
          <div className="form-group">
            <label htmlFor="parcelType">Type of Parcel</label>
            <select id="parcelType" name="parcelType">
              <option value="furniture">Furniture</option>
              <option value="vehicle">Vehicle</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="parcelCondition">Condition</label>
            <select id="parcelCondition" name="parcelCondition">
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" name="destination" required />
          </div>
        </div>

        <div className="section">
          <h2>Receiver Details</h2>
          <div className="form-group">
            <label htmlFor="receiverName">Name</label>
            <input type="text" id="receiverName" name="receiverName" required />
          </div>
          <div className="form-group">
            <label htmlFor="receiverAddress">Address</label>
            <input type="text" id="receiverAddress" name="receiverAddress" required />
          </div>
          <div className="form-group">
            <label htmlFor="receiverPhone">Phone Number</label>
            <input type="tel" id="receiverPhone" name="receiverPhone" required />
          </div>
        </div>

        <div className="section">
          <h2>Additional Details</h2>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" required />
          </div>
          <div className="form-group">
            <label htmlFor="trackingId">Tracking Device ID</label>
            <input type="text" id="trackingId" name="trackingId" required />
          </div>
          <div className="form-group">
            <label htmlFor="uploadImages">Upload Images</label>
            <input type="file" id="uploadImages" name="uploadImages" accept="image/*" />
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InsertPage;


