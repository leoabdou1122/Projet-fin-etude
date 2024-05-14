const pool = require('../config/connect')


// get all categorys 
async function getAllCategory() {
    try {
        const [rows] = await pool.query('SELECT * FROM categories')
        return rows
    } catch (error) {
        console.error('faled to get all categories')
        throw error
    }
}
// get a category by id :
async function getCategoryById(id) {
    try {
        const [row] = await pool.query('SELECT * FROM categories WHERE CategoryID = ?', [id])
        return row
    } catch (error) {
        console.error('failed to get a category by id')
        throw error
    }
}
// get category ASC or DESC : => http://localhost:3001/category/sorted/order?order='ASC or DESC'
async function getCategorySorted(order) {
    try {
        const [rows] = await pool.query('SELECT * FROM categories ORDER BY CategoryName ' + order);
        return rows;
    } catch (error) {
        console.error('Failed to get a sorted category:', error);
        throw error;
    }
}

// add category
async function createCategory(data) {
    try {
        const { CategoryName } = data
        const [row] = await pool.query('INSERT INTO categories(CategoryName) VALUES(?)', [CategoryName])
        return row
    } catch (error) {
        console.error('failed to create a category')
        throw error
    }
}
// update category
async function updateCategory(data, id) {
    try {
        const { CategoryName } = data
        const [row] = await pool.query('UPDATE categories SET CategoryName= ? WHERE CategoryID = ?', [CategoryName, id])
        return row
    } catch (error) {
        console.error('failde to update a category')
        throw error
    }
}
// delete category
async function deleteCategory(id) {
    try {
        const [row] = await pool.query('DELETE FROM categories WHERE CategoryID = ?', [id])
        return row
    } catch (error) {
        console.error('failed to delete a category')
        throw error
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategorySorted
}