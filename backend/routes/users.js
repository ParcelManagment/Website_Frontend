const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getConnection } = require('../database/database');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password, mobile_number } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the database connection
    const connection = getConnection();

    // Insert user into the database
    connection.query(
        'INSERT INTO user (username, email, password, mobile_number) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, mobile_number || null],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        }
    );
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Get the database connection
    const connection = getConnection();

    // Find user in the database
    connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];

            // Compare the password
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

            // Set the cookie
            res.cookie('token', token, { httpOnly: true });

            res.status(200).json({ message: "Login successful", token });
        }
    );
});





module.exports = router;
