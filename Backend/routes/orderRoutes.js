const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

// @route POST /api/orders
// @desc  Place an order and send emails
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, address, items, total, paymentMethod } = req.body;

        if (!name || !email || !phone || !address || !items || !total || !paymentMethod) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Save the order in MongoDB
        const newOrder = new Order({ name, email, phone, address, items, paymentMethod });
        await newOrder.save();

        // Build item list text
        const itemList = items
            .map(i => `• ${i.name} (x${i.quantity}) - Rs. ${i.price}`)
            .join('\n');

        const time = new Date().toLocaleString();

        // Email to admin
        const adminMessage = `
🛍️ NEW ORDER RECEIVED

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🏠 Address: ${address}
💳 Payment Method: ${paymentMethod}

📦 Items:
${itemList}

💰 Total: Rs. ${total}

🕒 ${time}
`;

        // Email to customer
        const customerMessage = `
Dear ${name},

✅ Thank you for your order from **Pakistan Mart**!

Here are your order details:

📦 Items:
${itemList}

💰 Total: Rs. ${total}
💳 Payment Method: ${paymentMethod}
📞 Phone: ${phone}
🏠 Address: ${address}

We’ll process your order shortly. If you have any questions, just reply to this email.

🕒 ${time}
- Pakistan Mart Team
`;

        // Send both emails
        await sendEmail(process.env.NOTIFY_EMAIL, '🛒 New Order - Pakistan Mart', adminMessage);
        await sendEmail(email, '✅ Your Order Confirmation - Pakistan Mart', customerMessage);

        res.status(201).json({ message: 'Order placed. Confirmation sent to admin and customer.' });
    } catch (err) {
        console.error('❌ Order placement failed', err);
        res.status(500).json({ message: 'Server error. Order not placed.' });
    }
});

// @route GET /api/orders
// @desc  Fetch all orders (admin use)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // latest first
        res.json(orders);
    } catch (err) {
        console.error('❌ Failed to fetch orders', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
