const express = require('express')
const router = express.Router()
const adminModels = require('../Models/AdminModels')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    try{
        const admins = await adminModels.getAllAdmins()
        res.json(admins)
    }catch (error) {
        console.error('Error to get all admins', error);
        return res.status(500).json({ error: 'Error to get all admins' });
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const admin = await adminModels.getAdminByEmail(email);

        if(admin.length !== 0){
            if(password === admin[0].password){
                const token = jwt.sign({admin_id : admin[0].admin_id}, 'secret');
                res.cookie('admin', token, {
                    httpOnly: true,
                    maxAge : 24 * 60 * 60 * 1000,
                    secure: true,
                    sameSite: 'strict'
                })
                return res.status(200).json({ success: true });
            } else {
                return res.status(401).json({ error: 'Invalid password' }); 
            }
        } else {
            return res.status(401).json({ error: 'Invalid email' });
        }
    }catch(error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/auth', async (req, res) => {
    try{
        const cookie = req.cookies['admin'];

        if (!cookie) {
            return res.status(401).json({ error: 'Unauthenticated : cookie not found' });
        }

        const decoded = jwt.verify(cookie, 'secret');

        if (!decoded) {
            return res.status(401).json({ error: 'Unauthenticated : Invalid token' });
        }

        const admin = await adminModels.getAdminById(decoded.admin_id);
        
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(admin);
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
})


module.exports = router 