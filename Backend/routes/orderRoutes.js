const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getAllOrders,
    deleteOrder,
} = require('../controllers/orderController');

// Place a new order
router.post('/', placeOrder);

// Get all orders
router.get('/', getAllOrders);

// Delete an order by ID
router.delete('/:id', deleteOrder);

module.exports = router;
