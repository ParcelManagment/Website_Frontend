import React, { useEffect, useState } from "react";
import axios from "axios";

const PackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch package details when the component mounts
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get("/view"); // Update URL to your backend endpoint
        setPackageDetails(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
        setError("Failed to load package details.");
      }
    };

    fetchPackageDetails();
  }, []);

  return (
    <div>
      <h2>Package Details</h2>
      {error && <p>{error}</p>}
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
          {packageDetails.length > 0 ? (
            packageDetails.map((packageDetail) => (
              <tr key={packageDetail.package_id}>
                <td>{packageDetail.package_id}</td>
                <td>{packageDetail.destination}</td>
                <td>{packageDetail.senderUser.first_name}</td>
                <td>{packageDetail.senderUser.last_name}</td>
                <td>{packageDetail.senderUser.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No packages found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PackageDetails;
