const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { parser } = require('../cloudinaryConfig');

const {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', verifyToken, parser.single('image'), createProduct);
router.put('/:id', verifyToken, parser.single('image'), updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
