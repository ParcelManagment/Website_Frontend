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
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchQuery]);

  const handleCheckboxChange = async ( e, packageId) => {
    e.stopPropagation();
    try {
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

    const handleRowClick = ( packageId) => {
        console.log(packageId)
        navigate(`/view/${packageId}`);
    };



  const filteredPackages = packages.filter((pkg) => {
    const senderFirstName = pkg.senderUser?.first_name?.toLowerCase() || '';
    const senderLastName = pkg.senderUser?.last_name?.toLowerCase() || '';
    // const senderEmail = pkg.senderUser?.email?.toLowerCase() || '';
    const destination = pkg.destination?.toLowerCase() || '';
    const packageId = pkg.package_id?.toString().toLowerCase() || '';
    const price = pkg.price?.toString().toLowerCase() || '';

    return (
      packageId.includes(searchQuery.toLowerCase()) ||
      destination.includes(searchQuery.toLowerCase()) ||
      senderFirstName.includes(searchQuery.toLowerCase()) ||
      senderLastName.includes(searchQuery.toLowerCase()) ||
      // senderEmail.includes(searchQuery.toLowerCase())
      price.includes(searchQuery.toLowerCase()) 
    );
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Package List</h1>
      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered" style={{ width: '100%', margin: '0 auto' }}>
          <thead className="thead-dark">
            <tr>
              <th>Package ID</th>
              <th>Destination</th>
              <th>Sender First Name</th>
              <th>Sender Last Name</th>
              <th>Package Price</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
          {filteredPackages.map((pkg) => (
          // <tr key={pkg.package_id} className="table-row-hover" onClick={() => handleRowClick(pkg.package_id)}>
          <tr key={pkg.package_id} className={`table-row-hover ${pkg.completed ? 'table-success' : ''}`} onClick={() => handleRowClick(pkg.package_id)}>
            <td>{pkg.package_id}</td>
            <td>{pkg.destination}</td>
            <td>{pkg.senderUser?.first_name || 'N/A'}</td>
            <td>{pkg.senderUser?.last_name || 'N/A'}</td>
            <td>{pkg.price || 'N/A'}</td>
            <td>
                <input
                    type="checkbox"
                    checked={pkg.completed}
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleCheckboxChange(e, pkg.package_id);
                  }}
                    onClick={(e) => e.stopPropagation()} 
                    disabled={pkg.completed}
                />
            </td>
        </tr>
    ))}
</tbody>

        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAll;
