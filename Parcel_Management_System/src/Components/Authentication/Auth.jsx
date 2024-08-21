import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
    const [staffList, setStaffList] = useState([]);

    // Fetch staff list data from the API
    useEffect(() => {
        const fetchStaffList = async () => {
            try {
                const response = await axios.get('/staff/stafflist');
                setStaffList(response.data);
            } catch (error) {
                console.error('Error fetching staff list:', error);
            }
        };

        fetchStaffList();
    }, []);

    // Handle the approve button click
    const handleApprove = async (employeeId) => {
        try {
            const response = await axios.post('/staff/approve', {
                employee_id: employeeId,
                approved: true,
            });
            console.log('User approved:', response.data);

            // Update the staff list to remove the approved user
            setStaffList(staffList.filter(staff => staff.employee_id !== employeeId));
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>User Approval</h2>
            <div className="table-container">
                <table className="auth-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff) => (
                            <tr key={staff.employee_id}>
                                <td>{staff.employee_id}</td>
                                <td>{staff.first_name}</td>
                                <td>{staff.last_name}</td>
                                <td>{staff.role}</td>
                                <td>
                                    {staff.role === 'not_approved' && (
                                        <button
                                            className="approve-button"
                                            onClick={() => handleApprove(staff.employee_id)}
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Auth;
