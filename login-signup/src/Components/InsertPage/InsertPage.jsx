import React from 'react';
import './InsertPage.css';

const InsertPage = () => {
  return (
    <div className="container">
      <h1>Package Details Form</h1>

      <form>
        <div className="section">
          <h2>Sender Details</h2>
          <div className="form-group">
            <label htmlFor="senderFirstName">First Name</label>
            <input type="text" id="senderFirstName" name="senderFirstName" required />
          </div>
          <div className="form-group">
            <label htmlFor="senderLastName">Last Name</label>
            <input type="text" id="senderLastName" name="senderLastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="senderEmail">Email</label>
            <input type="email" id="senderEmail" name="senderEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="senderPhone">Phone Number</label>
            <input type="tel" id="senderPhone" name="senderPhone" required />
          </div>
        </div>

        <div className="section">
          <h2>Package Details</h2>
          <div className="form-group">
            <label htmlFor="packageId">Package ID</label>
            <input type="text" id="packageId" name="packageId" required />
          </div>
          <div className="form-group">
            <label htmlFor="parcelType">Type of Package</label>
            <select id="parcelType" name="parcelType">
              <option value="furniture">Furniture</option>
              <option value="vehicle">Vehicle</option>
              <option value="food">Food</option>
              <option value="grocery">Grocery</option>
              <option value="chemical">Chemical</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="parcelCondition">Package Condition</label>
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
            <label htmlFor="receiverFirstName">First Name</label>
            <input type="text" id="receiverFirstName" name="receiverFirstName" required />
          </div>
          <div className="form-group">
            <label htmlFor="receiverLastName">Last Name</label>
            <input type="text" id="receiverLastName" name="receiverLastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="receiverEmail">Email</label>
            <input type="email" id="receiverEmail" name="receiverEmail" required />
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
            <label htmlFor="uploadImages">Upload Images of the package here</label>
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


