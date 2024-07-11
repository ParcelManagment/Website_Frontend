const express = require('express');
const router = express.Router();
const { getConnection } = require('../database/database.js');

router.get('/profile/:employee_id', async (req, res) => {
    const connection = getConnection();
    if (!connection) {
        console.log("Database connection unavailable");
        res.status(500).json({ Error: "Database Error" });
        return;
    }

    const employee_id = req.params.employee_id;

    try {
        const employee = await getEmployeeById(employee_id, connection);
        if (!employee) {
            res.status(404).json({ Error: "Employee not found" });
            return;
        }
        res.status(200).json({ Error: null, employee: employee });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

async function getEmployeeById(employee_id, connection) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM station_staff WHERE employee_id = ?';
        connection.query(query, [employee_id], (err, result) => {
            if (err) {
                reject("Something Went Wrong");
                return;
            }
            if (result.length == 0) {
                reject("Employee not found");
                return;
            }
            resolve(result[0]);
        });
    });
}

module.exports = router;
