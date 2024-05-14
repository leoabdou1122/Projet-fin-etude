const pool = require('../config/connect')

// get all a cart by userID
async function getcartProductByUserID(UserID) {
    try {
        const [rows] = await pool.query('SELECT p.*, c.Quantity, c.CartID, c.UserID FROM products p JOIN cart c ON p.ProductID = c.ProductID WHERE c.UserID = ?', [UserID])
        return rows;
    } catch (error) {
        console.error('failde to get the cart')
        throw error
    }
}
// delete from cart by productID
async function deleteProductBycartID(cartID, UserID) {
    try {
        const [row] = await pool.query('DELETE FROM cart WHERE CartID = ? AND UserID = ?', [cartID, UserID])
        return row
    } catch (error) {
        console.error('failed to delete a product from the cart')
        throw error
    }
}
// Clear the cart
async function clearTheCart() {
    try {

    } catch (error) {

    }
}

// Add Item to Cart
async function addToTheCart(data) {
    try {
        const {UserID, ProductID, Quantity } = data
        const [row] = await pool.query('INSERT INTO cart(UserID, ProductID, Quantity) VALUES(?, ?, ?)', [UserID, ProductID, Quantity])
        return row
    } catch (error) {
        console.error('failed to add to the cart')
        throw error
    }
}

// update product quantity in the cart
async function modifyQuantityOfProductInCart(cartId, value) {
    try {
        const [row] = await pool.query('UPDATE cart SET Quantity = Quantity + ? WHERE CartID = ?', [value, cartId])
        return row
    } catch (error) {
        console.error('failed to update quantity of product in the cart')
        throw error
    }
}

module.exports = {
    getcartProductByUserID,
    deleteProductBycartID,
    addToTheCart,
    modifyQuantityOfProductInCart
}






