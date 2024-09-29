import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PackageDetails = () => {
    const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState([]);
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
  }, []);

  useEffect(() => {
    
    axios
      .get('/view')
      .then((response) => {
        setPackageDetails(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        setError("Failed to load package details.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log("view page All")

  return (


    <div>
      <h1>Package and Sender Details</h1>
      {packageDetails.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Destination</th>
              <th>Sender First Name</th>
              <th>Sender Last Name</th>
              <th>Sender Email</th>
            </tr>
          </thead>
          <tbody>
            {packageDetails.map((pkg) => (
              <tr key={pkg.package_id}>
                <td>{pkg.package_id}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.senderUser.first_name}</td>
                <td>{pkg.senderUser.last_name}</td>
                <td>{pkg.senderUser.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No packages found.</p>
      )}
    </div>
  );
};

export default PackageDetails;
