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
  'Vavuniya',  
  'Mullaitivu',  
  // Add more cities as needed
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

  useEffect(() => {
    setFilteredCities(
      citiesInSriLanka.filter(city =>
        city.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
    console.log(data)
    try {
      const response = await fetch('api/package/new', {
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
    <div className="container">
      <h1>Package Details Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h2>Sender Details</h2>
          <div className="form-group">
            <label htmlFor="senderFirstName">First Name</label>
            <input type="text" id="senderFirstName" name="senderFirstName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="senderLastName">Last Name</label>
            <input type="text" id="senderLastName" name="senderLastName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="senderEmail">Email</label>
            <input type="email" id="senderEmail" name="senderEmail" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="senderPhone">Phone Number</label>
            <input type="tel" id="senderPhone" name="senderPhone" required onChange={handleChange} />
          </div>
        </div>

        <div className="section">
          <h2>Package Details</h2>
          <div className="form-group">
            <label htmlFor="packageId">Package ID</label>
            <input type="text" id="packageId" name="packageId" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="parcelType">Type of Package</label>
            <select id="parcelType" name="parcelType" onChange={handleChange}>
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
            <select id="parcelCondition" name="parcelCondition" onChange={handleChange}>
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleChange(e);
              }}
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

        <div className="section">
          <h2>Receiver Details</h2>
          <div className="form-group">
            <label htmlFor="receiverFirstName">First Name</label>
            <input type="text" id="receiverFirstName" name="receiverFirstName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="receiverLastName">Last Name</label>
            <input type="text" id="receiverLastName" name="receiverLastName" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="receiverEmail">Email</label>
            <input type="email" id="receiverEmail" name="receiverEmail" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="receiverPhone">Phone Number</label>
            <input type="tel" id="receiverPhone" name="receiverPhone" required onChange={handleChange} />
          </div>
        </div>

        <div className="section">
          <h2>Additional Details</h2>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="tracking_device_id">Tracking Device ID</label>
            <input type="text" id="tracking_device_id" name="tracking_device_id" required onChange={handleChange} />
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

