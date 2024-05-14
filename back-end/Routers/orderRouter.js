const express = require('express')
const router = express.Router()
const orderModel = require('../Models/orderModels')

// api/orders
router.get('/api/allOrders', async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders()
        res.json(orders)
    } catch (error) {
        res.status(401).send({ message: 'failed to get all orders' })
    }
})


router.post('/api/addOrder', async (req, res) => {
    try {
        const data = {
            UserID: req.body.UserID,
            OrderDate: req.body.OrderDate,
            TotalAmount: req.body.TotalAmount,
            ProductID: req.body.ProductID,
            Quantity: req.body.Quantity,
            Subtotal: req.body.Subtotal
        };

        const orders = await orderModel.addOrder(data);
        res.json(orders);
    } catch (error) {
        console.error('Failed to add an order', error);
        res.status(500).json({ error: 'Failed to add an order' });
    }
});

module.exports = router