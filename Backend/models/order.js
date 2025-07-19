const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String, // Buyer's name

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ],
    phone: String,
    email: String,
    address: String,

    paymentMethod: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
