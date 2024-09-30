import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Package List</h1>
      <table>
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
          {packages.map((pkg) => (
            <tr key={pkg.package_id}>
              <td>{pkg.package_id}</td>
              <td>{pkg.destination}</td>
              <td>{pkg.senderUser?.first_name}</td>
              <td>{pkg.senderUser?.last_name}</td>
              <td>{pkg.senderUser?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageList;
