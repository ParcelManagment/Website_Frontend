import React, { useState, useEffect } from 'react';
import './InsertPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
];

const InsertPage = () => {
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
    tracking_device_id: '',
    uploadImages: null,
  });

  const [filteredCities, setFilteredCities] = useState(citiesInSriLanka);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
        if (Number(value) <= 0) {
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
    if (name === 'destination') {
      // Handle destination field differently
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      setSearchTerm(value); // Keep searchTerm synced for filtering
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'file' ? files[0] : value
      }));
    }
    validate(name, value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) {
      alert('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(''); // Clear previous error message

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
      const response = await fetch('/api/package/new', {
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
        // Reset the form
        setFormData({
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
          tracking_device_id: '',
          uploadImages: null,
        });
        setSearchTerm('');
      } else {
        // Format the error message
        const errorText = await response.text();
        let formattedMessage;
        try {
          const errorJson = JSON.parse(errorText);
          formattedMessage = `Error ${response.status}: ${errorJson.message || errorText.trim()}`;
        } catch {
          formattedMessage = `Error ${response.status}: ${errorText.trim()}`;
        }

        setSubmitError(formattedMessage);
        alert(formattedMessage); // Display error in a pop-up
      }
    } catch (error) {
      // Format and display network or JSON parsing errors
      let formattedMessage = 'An unexpected error occurred.';

      if (error.message.includes('Unexpected token')) {
        formattedMessage = 'Error: Invalid JSON response from server';
      } else {
        formattedMessage = `Error: ${error.message}`;
      }
      setSubmitError(formattedMessage);
      alert(formattedMessage); // Display error in a pop-up
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="containerinsert">
      <h1>Package Details Form</h1>

      <form onSubmit={handleSubmit} className="row">
        {/* Sender Details */}
        <div className="section sender-details col-12 col-md-6 col-lg-3">
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
            />
            {errors.senderPhone && <span className="error">{errors.senderPhone}</span>}
          </div>
        </div>

        {/* Package Details */}
        <div className="section package-details col-12 col-md-6 col-lg-3">
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
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="parcelType">Type of Package</label>
            <select
              id="parcelType"
              name="parcelType"
              onChange={handleChange}
              value={formData.parcelType}
              className="form-control"
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
            <label htmlFor="parcelCondition">Condition</label>
            <select
              id="parcelCondition"
              name="parcelCondition"
              onChange={handleChange}
              value={formData.parcelCondition}
              className="form-control"
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
              onChange={handleChange}
              value={formData.destination}
              list="cities"
              required
              className="form-control"
            />
            <datalist id="cities">
              {filteredCities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="section receiver-details col-12 col-md-6 col-lg-3">
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
            />
            {errors.receiverPhone && <span className="error">{errors.receiverPhone}</span>}
          </div>
        </div>

        {/* Price and Tracking Details */}
        <div className="section tracking-details col-12 col-md-6 col-lg-3">
          <h2>Price and Tracking</h2>
          <div className="form-group">
            <label htmlFor="price">Price (LKR)</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              value={formData.price}
              required
              className="form-control"
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="tracking_device_id">Tracking Device ID</label>
            <input
              type="text"
              id="tracking_device_id"
              name="tracking_device_id"
              onChange={handleChange}
              value={formData.tracking_device_id}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uploadImages">Upload Images</label>
            <input
              type="file"
              id="uploadImages"
              name="uploadImages"
              onChange={handleChange}
              accept="image/*"
              className="form-control-file"
            />
          </div>
        </div>

        <div className="form-group col-12">
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isSubmitting} // Disable button if submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertPage;

