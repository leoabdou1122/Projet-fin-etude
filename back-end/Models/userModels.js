const pool = require('../config/connect')
const bcrypt = require('bcrypt')


async function createUser(data) {
    try {
        const { FirstName, LastName, Email, Password, PhoneNumber } = data;
        const hashPassword = await bcrypt.hash(Password, 10);
        const [row] = await pool.query('INSERT INTO users(FirstName, LastName, Email, Password, PhoneNumber) VALUES (?,?,?,?,?)',
            [FirstName, LastName, Email, hashPassword, PhoneNumber])
        return row
    } catch (error) {
        console.error('failed to create a user')
        throw error
    }
}

async function findUserByEmail(email) {
    try {
        const [row] = await pool.query('SELECT * FROM users WHERE Email = ?', [email]);
        return row;
    } catch (error) {
        console.error('Failed to find a user:', error);
        throw error; // Throw the error to be caught by the calling function or middleware
    }
}

async function findUserId(id) {
    try {
        const [row] = await pool.query('SELECT UserID, FirstName, LastName, Email, PhoneNumber FROM users WHERE UserID = ?', [id]);
        return row;
    } catch (error) {
        console.error('Failed to find a user:', error);
        throw error; // Throw the error to be caught by the calling function or middleware
    }
}
async function getAllusers() {
    try {
        const [row] = await pool.query('SELECT UserID ,FirstName, LastName, Email, PhoneNumber FROM users');
        return row;
    } catch (error) {
        console.error('Failed to find a user:', error);
        throw error; 
    }
}
module.exports = {
    createUser,
    findUserByEmail,
    findUserId,
    getAllusers
}