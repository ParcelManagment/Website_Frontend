import React, { useState, useEffect } from 'react';
import './InsertPage.css';

const citiesInSriLanka = [
  'Colombo',
  'Kandy',
  'Galle',
  'Jaffna',
  'Negombo',
  'Anuradhapura',
  'Trincomalee',
  'Batticaloa',
  'Matara',
  'Kurunegala',
  'Puttalam',	
  'Vavuniya',	
  'Polonnaruwa',	
  'Kilinochchi',	
  'Mannar',		
  'Mullaitivu',	
  // Add more cities as needed
];

const InsertPage = () => {
  const [filteredCities, setFilteredCities] = useState(citiesInSriLanka);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    senderFirstName: '',
    senderLastName: '',
    senderEmail: '',
    senderPhone: '',
    packageId: '',
    parcelType: 'furniture',
    parcelCondition: 'new',
    destination: '',
    receiverFirstName: '',
    receiverLastName: '',
    receiverEmail: '',
    receiverPhone: '',
    price: '',
    trackingId: '',
    uploadImages: null,
  });

  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFilteredCities(
      citiesInSriLanka.filter(city =>
        city.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'senderFirstName':
      case 'senderLastName':
      case 'receiverFirstName':
      case 'receiverLastName':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name must contain only letters and spaces';
        }
        if (!value.trim()) {
          error = 'This field is required';
        }
        break;
      case 'senderPhone':
      case 'receiverPhone':
        if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'senderEmail':
      case 'receiverEmail':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'price':
        if (value <= 0) {
          error = 'Price must be greater than zero';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation check
    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      alert('Please fix the errors before submitting');
      return;
    }
    const data = {
      package: {
        tag_id: formData.packageId,
        type: formData.parcelType,
        package_condition: formData.parcelCondition,
        destination: formData.destination,
        price: formData.price,
        tracking_device_id: formData.tracking_device_id
      },
      sender: {
        email: formData.senderEmail,
        first_name: formData.senderFirstName,
        last_name: formData.senderLastName,
        mobile_number: formData.senderPhone
      },
      receiver: {
        email: formData.receiverEmail,
        first_name: formData.receiverFirstName,
        last_name: formData.receiverLastName,
        mobile_number: formData.receiverPhone
      }
    };

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Package submitted successfully:', result);
        alert('Package submitted successfully');
      } else {
        console.error('Failed to submit package:', await response.json());
        alert('Failed to submit package');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the package');
    }
  };

  return (
    <div className="containeri">
      <h1>Package Details Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Sender Details */}
        <div className="section sender-details">
          <h2>Sender Details</h2>
          <div className="form-group">
            <label htmlFor="senderFirstName">First Name</label>
            <input
              type="text"
              id="senderFirstName"
              name="senderFirstName"
              onChange={handleChange}
              value={formData.senderFirstName}
              required
            />
            {errors.senderFirstName && <span className="error">{errors.senderFirstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="senderLastName">Last Name</label>
            <input
              type="text"
              id="senderLastName"
              name="senderLastName"
              onChange={handleChange}
              value={formData.senderLastName}
              required
            />
            {errors.senderLastName && <span className="error">{errors.senderLastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="senderEmail">Email</label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              onChange={handleChange}
              value={formData.senderEmail}
              required
            />
            {errors.senderEmail && <span className="error">{errors.senderEmail}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="senderPhone">Phone Number</label>
            <input
              type="tel"
              id="senderPhone"
              name="senderPhone"
              onChange={handleChange}
              value={formData.senderPhone}
              required
            />
            {errors.senderPhone && <span className="error">{errors.senderPhone}</span>}
          </div>
        </div>

        {/* Package Details */}
        <div className="section package-details">
          <h2>Package Details</h2>
          <div className="form-group">
            <label htmlFor="packageId">Package ID</label>
            <input
              type="text"
              id="packageId"
              name="packageId"
              onChange={handleChange}
              value={formData.packageId}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parcelType">Type of Package</label>
            <select
              id="parcelType"
              name="parcelType"
              onChange={handleChange}
              value={formData.parcelType}
            >
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
            <select
              id="parcelCondition"
              name="parcelCondition"
              onChange={handleChange}
              value={formData.parcelCondition}
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); handleChange(e); }}
              placeholder="Search for a city"
              list="cities"
              required
            />
            <datalist id="cities">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="section receiver-details">
          <h2>Receiver Details</h2>
          <div className="form-group">
            <label htmlFor="receiverFirstName">First Name</label>
            <input
              type="text"
              id="receiverFirstName"
              name="receiverFirstName"
              onChange={handleChange}
              value={formData.receiverFirstName}
              required
            />
            {errors.receiverFirstName && <span className="error">{errors.receiverFirstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="receiverLastName">Last Name</label>
            <input
              type="text"
              id="receiverLastName"
              name="receiverLastName"
              onChange={handleChange}
              value={formData.receiverLastName}
              required
            />
            {errors.receiverLastName && <span className="error">{errors.receiverLastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="receiverEmail">Email</label>
            <input
              type="email"
              id="receiverEmail"
              name="receiverEmail"
              onChange={handleChange}
              value={formData.receiverEmail}
              required
            />
            {errors.receiverEmail && <span className="error">{errors.receiverEmail}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="receiverPhone">Phone Number</label>
            <input
              type="tel"
              id="receiverPhone"
              name="receiverPhone"
              onChange={handleChange}
              value={formData.receiverPhone}
              required
            />
            {errors.receiverPhone && <span className="error">{errors.receiverPhone}</span>}
          </div>
        </div>

        {/* Additional Details */}
        <div className="section additional-details">
          <h2>Additional Details</h2>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              value={formData.price}
              required
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="trackingId">Tracking Device ID</label>
            <input
              type="text"
              id="trackingId"
              name="trackingId"
              onChange={handleChange}
              value={formData.trackingId}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="uploadImages">Upload Images of the package here</label>
            <input
              type="file"
              id="uploadImages"
              name="uploadImages"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InsertPage;