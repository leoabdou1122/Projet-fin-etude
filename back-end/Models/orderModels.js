const pool = require('../config/connect')

// get all orders
async function getAllOrders() {
    try {
        const [rows] = await pool.query('SELECT * FROM orders')
        return rows;
    } catch (error) {
        console.log('failed to add order', error)
    }
}

// get single order by user id

// gett order by date

// sort orders by totalAmount


async function addOrder(data) {
    try {
        const { UserID, OrderDate, TotalAmount, ProductID, Quantity, Subtotal } = data;
        const [orderRows] = await pool.query('INSERT INTO orders(UserID, OrderDate, TotalAmount) VALUES(?,?,?)',
            [UserID, OrderDate, TotalAmount]);
        const OrderID = orderRows.insertId;

        const [orderItemsRows] = await pool.query('INSERT INTO orderitems(OrderID, ProductID, Quantity, Subtotal) VALUES (?,?,?,?)',
            [OrderID, ProductID, Quantity, Subtotal]);
        return { orderRows, orderItemsRows };
    } catch (error) {
        console.log('Failed to add order', error);
        throw error; 
    }
}

// delete order


module.exports = {
    getAllOrders,
    addOrder
}