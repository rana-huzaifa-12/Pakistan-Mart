const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching all products:', err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

// GET by category
exports.getProductsByCategory = async (req, res) => {
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
};

// GET single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};

// POST create product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : '';

        const newProduct = new Product({ name, description, price, category, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload product' });
    }
};

// PUT update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const updateData = { name, description, price, category };

        if (req.file) updateData.image = req.file.path;

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
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
