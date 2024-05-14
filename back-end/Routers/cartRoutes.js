const express = require('express')
const router = express.Router()
const cartModels = require('../Models/cartModels')


router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await cartModels.getcartProductByUserID(id)
        res.json(cart);
    } catch (error) {
        next(error)
    }
})
// http://localhost:3001/cart/${cartID}/${userID}
router.delete('/:cartID/:userID', async (req, res, next) => {
    try {
        const cartID = req.params.cartID;
        const userID = req.params.userID
        const cart = await cartModels.deleteProductBycartID(cartID,userID)
        res.json(cart)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const data = {
            UserID: req.body.UserID,
            ProductID: req.body.ProductID,
            Quantity: req.body.Quantity
        };
        const cart = await cartModels.addToTheCart(data)
        res.json(cart)
    } catch (error) {
        next(error)
    }
})

router.put('/:cartID/:value', async (req, res, next) => {
    try {
        const cartID = req.params.cartID
        const value = req.params.value

        const cart = await cartModels.modifyQuantityOfProductInCart(cartID, value)
        res.json(cart)
    } catch (error) {
        next(error)
    }
})
module.exports = router;



