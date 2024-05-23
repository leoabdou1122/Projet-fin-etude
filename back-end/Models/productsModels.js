const pool = require('../config/connect')


// TO get all products : 
async function getAllProducts() {
    try {
        const query = `SELECT p.*, c.CategoryName, g.Name as groupeName
                        FROM Products p
                        JOIN categories c ON p.categoryID = c.CategoryID
                        JOIN groupes g ON p.groupeID = g.GroupeID`
        const [rows] = await pool.query(query);
        return rows
    } catch (error) {
        console.error('Failed to get All Products')
        throw error
    }
}

// to get single products by ID :
async function getProductById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM Products WHERE ProductID = ?', [id])
        return rows
    } catch (error) {
        console.error('Failed to get Product by id')
        throw error
    }
}
// to get a products by category :
async function getProductByCategory(category) {
    try {
        const [row] = await pool.query('SELECT * FROM Products JOIN categories ON categories.CategoryID = Products.CategoryID WHERE categories.CategoryID = ? LIMIT 4', [category])
        return row
    } catch (error) {
        console.error('Failed to get Product by category')
        throw error
    }
}
// to get a products by group :
async function getProductByGroupe(groupe) {
    try {                           
        const [row] = await pool.query('SELECT p.* FROM products p JOIN groupes g ON p.GroupeID = g.GroupeID WHERE g.Name = ?', [groupe])
        return row
    } catch (error) {
        console.error('Failed to get Product by category')
        throw error
    }
}

// to search for a product by name : 
async function searchForProductByName(name) {
    try {
        const [row] = await pool.query('SELECT * FROM Products JOIN categories ON categories.CategoryID = Products.CategoryID WHERE Products.Name = ?', [name])
        return row
    } catch (error) {
        console.error('Failed to search for a  Product by name')
        throw error
    }
}
// sort a product ASC or DESC => http://localhost:3001/products/sorted/order?sort=price&order=DESC
async function getSortedProducts(sort, order) {
    try {
        const [rows] = await pool.query(`SELECT * FROM products ORDER BY ${sort} ${order}`)
        return rows;
    } catch (error) {
        throw error
    }
}
// to update a product :
async function updateProduct(id, data) {
    try {
        const { Name, Description, ImageURL, Price, StockQuantity, CategoryID, GroupeID } = data
        const [row] = await pool.query(' UPDATE Products SET Name=?,Description= ?,ImageURL= ?,Price= ?,StockQuantity= ?,CategoryID= ?,GroupeID = ? WHERE ProductID = ?',
            [Name, Description, ImageURL, Price, StockQuantity, CategoryID, GroupeID, id])
        return row
    } catch (error) {
        console.error('Failed to update a  Product by id')
        throw error
    }
}

// to delete a product by id :
async function deleteProduct(id) {
    try {
        const [row] = await pool.query('DELETE FROM Products WHERE ProductID = ?', [id])
        return row;
    } catch (error) {
        console.error('Failed to dalete a  Product by id')
        throw error
    }
}

// create a product : 
async function createProduct(data) {
    try {
        const { Name, Description, ImageURL, Price, StockQuantity, CategoryID, GroupeID } = data;
        const [row] = await pool.query('INSERT INTO Products(Name, Description, ImageURL, Price, StockQuantity, CategoryID, GroupeID) VALUES(?,?,?,?,?,?,?)',
            [Name, Description, ImageURL, Price, StockQuantity, CategoryID, GroupeID]);
        return row;
    } catch (error) {
        console.error('Failed to create a Product:', error); // Added the error message in the console.log
        throw error;
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    searchForProductByName,
    updateProduct,
    deleteProduct,
    createProduct,
    getSortedProducts,
    getProductByGroupe
}