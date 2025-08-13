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

// POST create new product with Cloudinary image upload
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let imageUrl = '';
        let imagePublicId = '';

        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products', // optional folder
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image: imageUrl,
            imagePublicId
        });

        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        console.error('Create Product error:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};

// PUT update existing product with optional Cloudinary image
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

        // Update image if new file uploaded
        if (req.file) {
            // Delete previous image from Cloudinary if exists
            if (product.imagePublicId) {
                await cloudinary.uploader.destroy(product.imagePublicId);
            }

            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
            });
            product.image = result.secure_url;
            product.imagePublicId = result.public_id;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch (error) {
        console.error('Update Product error:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// DELETE product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Delete image from Cloudinary if exists
        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
