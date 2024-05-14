const connection = require('../config/connect');

async function getAllAdmins () {
    try{
        const [row] = await connection.query('SELECT * FROM admin')
        return row
    } catch (error) {
        console.error('failed to all admins info')
        throw error
    }
}

async function getAdminByEmail (email) {
    try {
        const [row] = await connection.query('SELECT * FROM admin WHERE email = ?', [email])
        return row
    } catch (error) {
        console.error('failed to get admin by email')
        throw error
    }
}

async function getAdminById (id) {
    try {
        const [row] = await connection.query('SELECT * FROM admin WHERE admin_id = ?', [id])
        return row
    } catch (error) {
        console.error('failed to get admin by id')
        throw error
    }
}
module.exports = {
    getAllAdmins,
    getAdminByEmail,
    getAdminById
}