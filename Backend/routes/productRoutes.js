const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// 📂 Setup multer storage for product images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/*                              GET all products                            */
/* -------------------------------------------------------------------------- */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching all products:', err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

/* -------------------------------------------------------------------------- */
/*                       GET products by category route                     */
/* -------------------------------------------------------------------------- */
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const products = category === 'All'
            ? await Product.find()
            : await Product.find({ category });

        res.json(products);
    } catch (err) {
        console.error('Error fetching category products:', err);
        res.status(500).json({ message: 'Failed to fetch products by category' });
    }
});

/* -------------------------------------------------------------------------- */
/*          POST - Add product with image upload (admin only)               */
/* -------------------------------------------------------------------------- */
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : '';

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload product' });
    }
});

/* -------------------------------------------------------------------------- */
/*                           PUT - Update product                           */
/* -------------------------------------------------------------------------- */
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const updateData = { name, description, price, category };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Failed to update product' });
    }
});


/* -------------------------------------------------------------------------- */
/*                         DELETE - Delete product                          */
/* -------------------------------------------------------------------------- */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});


// 📦 Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});


module.exports = router;
