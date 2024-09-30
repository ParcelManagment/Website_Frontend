import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPage.css';

const ViewAll = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      await axios.put(`/package/completepackage/${packageId}`, { completed });
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.package_id === packageId ? { ...pkg, completed } : pkg
        )
      );
    } catch (err) {
      console.error("Failed to update package status", err);
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
              <tr key={pkg.package_id} className="table-row-hover"> {/* Custom class for hover effect */}
                <td>{pkg.package_id}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.senderUser?.first_name}</td>
                <td>{pkg.senderUser?.last_name}</td>
                <td>{pkg.senderUser?.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={pkg.completed}
                    onChange={(e) => handleCheckboxChange(pkg.package_id, e.target.checked)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAll;
