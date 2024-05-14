const express = require('express')
const router = express.Router()
const categoryModels = require('../Models/categoyModels')

router.get('/', async (req, res, next) => {
    try {
        const categories = await categoryModels.getAllCategory()
        res.json(categories)
    } catch (error) {
        next(error)
    }

})
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await categoryModels.getCategoryById(id)
        res.json(category)
    } catch (error) {
        next(error)
    }

})
router.get('/sorted/order', async (req, res, next) => {
    try {
        const order = req.query.order
        const category = await categoryModels.getCategorySorted(order)
        res.json(category)
    } catch (error) {
        next(error)
    }

})
router.post('/', async (req, res, next) => {
    try {
        const data = {
            CategoryName: req.body.CategoryName
        }
        const category = await categoryModels.createCategory(data)
        res.json(category)
    } catch (error) {
        next(error)
    }

})
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = {
            CategoryName: req.body.CategoryName
        }
        const category = await categoryModels.updateCategory(data,id)
        res.json(category)
    } catch (error) {
        next(error)
    }

})
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const category = await categoryModels.deleteCategory(id)
        res.json(category)
    } catch (error) {
        next(error)
    }

})



module.exports = router




