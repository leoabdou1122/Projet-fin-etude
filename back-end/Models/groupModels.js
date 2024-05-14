const pool = require('../config/connect')


// add in the goupe
async function addGroup(data) {
    try {
        const { Name, ImageURL, CategoryID } = data
        const [rows] = await pool.query('INSERT INTO groupes(Name, ImageURL, CategoryID) VALUES(?,?,?)',
            [Name, ImageURL, CategoryID])
        return rows
    } catch (error) {
        console.log('failed to add', error)
        throw error
    }
}
// update 
async function updateGroup(data, id) {
    try {
        const { Name, ImageURL, CategoryID } = data
        const [rows] = await pool.query('UPDATE groupes SET Name = ?, ImageURL = ?, CategoryID = ? WHERE GroupeID = ? ',
            [Name, ImageURL, CategoryID, id])
        return rows
    } catch (error) {
        console.log('failed to update', error)
        throw error
    }
}
// delete 
async function deleteGroup(id) {
    try {
        const [rows] = await pool.query('DELETE FROM groupes WHERE GroupeID = ?', [id])
        return rows
    } catch (error) {
        console.log('failed to delete', error)
        throw error
    }
}
// get all 
async function getAllGroup() {
    try {
        const [rows] = await pool.query('SELECT * FROM groupes')
        return rows
    } catch (error) {
        console.log('failed get all', error)
        throw error
    }
}
// get by ID
async function getGroupByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM groupes WHERE GroupeID = ? ', [id])
        return rows
    } catch (error) {
        console.log('failed get by id', error)
        throw error
    }
}
// get by category ID
async function getGroupByCategoryID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM groupes WHERE CategoryID = ? ', [id])
        return rows
    } catch (error) {
        console.log('failed get by category id', error)
        throw error
    }
}

module.exports = {
    addGroup,
    updateGroup,
    deleteGroup,
    getAllGroup,
    getGroupByID,
    getGroupByCategoryID
}