import React, { useEffect, useState } from "react";
import axios from "axios";

const PackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios
      .get(`/view/`)
      .then((response) => {
        setPackageDetails(response.data);
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
