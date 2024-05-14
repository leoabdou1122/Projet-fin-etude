const express = require('express')
const router = express.Router()
const userModels = require('../Models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// /register
router.post('/register', async (req, res) => {
    try {
        const data = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: req.body.Password,
            PhoneNumber: req.body.PhoneNumber
        }
        const user = await userModels.createUser(data);
        res.status(201).json(user);
    } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModels.findUserByEmail(email);

        if (user.length !== 0) {
            const match = await bcrypt.compare(password, user[0].Password);
            if (match) {
                const accessToken = jwt.sign({ userID: user[0].UserID }, 'secret'); // Using environment variable for JWT secret
                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: true, // Set to true if served over HTTPS
                    sameSite: 'strict' // Better to set sameSite attribute
                });
                return res.status(200).json({ success: true }); // Returning JSON object for consistency
            } else {
                return res.status(401).json({ error: 'Invalid email or password' }); // Change status code to 401 for unauthorized
            }
        } else {
            return res.status(401).json({ error: 'Invalid email or password' }); // Change status code to 401 for unauthorized
        }

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// /authentification

router.get('/authentication', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        if (!cookie) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }

        const decoded = jwt.verify(cookie, 'secret');

        if (!decoded) {
            return res.status(401).json({ error: 'Unauthenticated' });
        }

        const user = await userModels.findUserId(decoded.userID);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Send only non-sensitive user data in the response
        res.json(user);
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// /logout
router.get('/logout', (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send({ message: 'success' });
    } catch (error) {
        throw error;
    }
});

router.get('/allUsers', async (req, res) => {
    try {
        const users = await userModels.getAllusers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'get users failed' });
    }
})


module.exports = router