import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



const ViewAll = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleCheckboxChange = async (packageId, completed) => {
    try {
      console.log("AAA")
      await axios.put(`/package/completepackage/${packageId}`);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.package_id === packageId ? { ...pkg, completed:true } : pkg

        )
      );
      toast.success(`Package ${packageId} marked as completed!`);
    } catch (err) {
      console.error("Failed to update package status", err);
    }
  };

  const handleRowClick = (pkg) => {
    setSelectedPackage(pkg); // Set selected package details
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setSelectedPackage(null); // Clear selected package
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
              <tr key={pkg.package_id} className="table-row-hover" onClick={() => handleRowClick(pkg.package_id)}> 
                <td>{pkg.package_id}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.senderUser?.first_name}</td>
                <td>{pkg.senderUser?.last_name}</td>
                <td>{pkg.senderUser?.email}</td>
                <td>
                <input
                    type="checkbox"
                    checked={pkg.completed}
                    onChange={() => handleCheckboxChange(pkg.package_id, true)} 
                    disabled={pkg.completed} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedPackage && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Package Details (ID: {selectedPackage.package_id})</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Destination:</strong> {selectedPackage.destination}</p>
                <p><strong>Sender Name:</strong> {selectedPackage.senderUser?.first_name} {selectedPackage.senderUser?.last_name}</p>
                <p><strong>Sender Email:</strong> {selectedPackage.senderUser?.email}</p>
                <p><strong>Completed:</strong> {selectedPackage.completed ? 'Yes' : 'No'}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewAll;
