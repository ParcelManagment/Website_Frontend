import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ViewPage from './ViewPage'; // Import ViewPage component

const ViewAll = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parcelData, setParcelData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        await axios.get('/staff/profile');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };

    checkAuthorization();
  }, [navigate]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/view');
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleCheckboxChange = async (e, packageId, completed) => {
    e.stopPropagation();
    try {
      await axios.put(`/package/completepackage/${packageId}`);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.package_id === packageId ? { ...pkg, completed: true } : pkg
        )
      );
      toast.success(`Package ${packageId} marked as completed!`);
    } catch (err) {
      console.error("Failed to update package status", err);
    }
  };

  const handleRowClick = (packageId) => {
    const selectedPackage = packages.find(pkg => pkg.package_id === packageId);
    
    if (selectedPackage) {
      setParcelData(selectedPackage);
      setShowModal(true); // Show the modal when a row is clicked
    } else {
      toast.error('Package not found!');
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setParcelData(null); // Reset editing state
  };

  const handleEdit = () => {
    setIsEditing(true); // Set editing state to true
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const receiverId = parcelData.package.receiver_id;
    if (!receiverId) {
      alert("Receiver ID is missing!");
      return;
    }

    try {
      const response = await axios.put(`/package/edituser/${receiverId}`, {
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
      alert('User already registered. Cannot Update Details for already registered Users.');
    }
  };

  const handleDelete = async () => {
    if (!parcelData) {
      alert('No parcel data available to delete.');
      return;
    }

    try {
      const response = await axios.delete(`/package/deletepackage/${parcelData.package_id}`);

      if (response.status === 200) {
        alert('Package deleted successfully');
        setParcelData(null); // Clear the parcel data after deletion
        setShowModal(false); // Close the modal after deletion
      } else {
        alert('Failed to delete package');
      }
    } catch (err) {
      console.error("Error deleting package:", err);
      alert('Failed to delete package');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Package List</h1>
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered" style={{ width: '100%', margin: '0 auto' }}>
          <thead className="thead-dark">
            <tr>
              <th>Package ID</th>
              <th>Destination</th>
              <th>Sender First Name</th>
              <th>Sender Last Name</th>
              <th>Sender Email</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.package_id} className="table-row-hover" onClick={() => handleRowClick(pkg)}> 
                <td>{pkg.package_id}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.senderUser?.first_name}</td>
                <td>{pkg.senderUser?.last_name}</td>
                <td>{pkg.senderUser?.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={pkg.completed}
                    onChange={(e) => handleCheckboxChange(e, pkg.package_id, pkg.completed)} 
                    disabled={pkg.completed} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <ViewPage 
        show={showModal} 
        onClose={handleCloseModal} 
        parcelData={parcelData} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default ViewAll;
