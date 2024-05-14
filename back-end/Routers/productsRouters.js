const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra')
const productModel = require('../Models/productsModels');
router.get('/', async (req, res, next) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await productModel.getProductById(id)
        res.json(product)
    } catch (error) {
        next(error)
    }
})


router.get('/category/:category', async (req, res, next) => {
    try {
        const category = req.params.category
        const product = await productModel.getProductByCategory(category)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.get('/groupe/:groupe', async (req, res, next) => {
    try {
        const groupe = req.params.groupe
        const product = await productModel.getProductByGroupe(groupe)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.get('/sorted/order', async (req, res, next) => {
    try {
        const sort = req.query.sort
        const order = req.query.order
        const product = await productModel.getSortedProducts(sort, order)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.get('/search/:name', async (req, res, next) => {
    try {
        const name = req.params.name
        const product = await productModel.searchForProductByName(name)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = {
            Name: req.body.Name, // Corrected from req.body.name
            Description: req.body.Description,
            ImageURL: req.body.ImageURL,
            Price: req.body.Price,
            StockQuantity: req.body.StockQuantity,
            CategoryID: req.body.CategoryID,
            GroupeID: req.body.GroupeID
        };
        const product = await productModel.updateProduct(id, data)
        res.json(product)
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await productModel.deleteProduct(id)
        res.json(product)
    } catch (error) {
        next(error)
    }
})


// Multer storage configuration
const directory = 'C:\\Users\\bouka\\OneDrive\\Bureau\\Projet Fin D\'etude\\front-end\\public\\images';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log('Directory created successfully.');
} else {
    console.log('Directory already exists.');
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Set the filename for uploaded images
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { Name, Description, Price, StockQuantity, CategoryID, GroupeID } = req.body;

        const data = {
            Name,
            Description,
            ImageURL: req.file.path,
            Price,
            StockQuantity,
            CategoryID,
            GroupeID
        };

        const product = await productModel.createProduct(data);

        res.json(product);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
 