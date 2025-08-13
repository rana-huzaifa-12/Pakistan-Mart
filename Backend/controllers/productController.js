const Product = require('../models/product');
const { cloudinary } = require('../cloudinaryConfig');

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

// GET products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products =
            category === 'All' ? await Product.find() : await Product.find({ category });
        res.json(products);
    } catch (err) {
        console.error('Error fetching category products:', err);
        res.status(500).json({ message: 'Failed to fetch products by category' });
    }
};

// GET single product by ID
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

// POST create new product with optional image uploaded to Cloudinary
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : ''; // Cloudinary URL

        const newProduct = new Product({ name, description, price, category, image });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload product' });
    }
};

// PUT update existing product, update image only if new one uploaded
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Update fields if provided
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;

        // Update image if new file uploaded via Cloudinary
        if (req.file && req.file.path) {
            // Delete previous image from Cloudinary if exists
            if (product.image) {
                const segments = product.image.split('/');
                const filename = segments[segments.length - 1];
                const public_id = filename.split('.')[0];
                await cloudinary.uploader.destroy(`products/${public_id}`);
            }
            product.image = req.file.path;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// DELETE product by ID (also delete image from Cloudinary)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Delete image from Cloudinary if exists
        if (product.image) {
            const segments = product.image.split('/');
            const filename = segments[segments.length - 1];
            const public_id = filename.split('.')[0];
            await cloudinary.uploader.destroy(`products/${public_id}`);
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
