const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

// @desc  Place an order and send emails
exports.placeOrder = async (req, res) => {
    try {
        const { name, email, phone, address, items, total, paymentMethod } = req.body;

        if (!name || !email || !phone || !address || !items || !total || !paymentMethod) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newOrder = new Order({ name, email, phone, address, items, paymentMethod });
        await newOrder.save();

        const itemList = items
            .map(i => `• ${i.name} (x${i.quantity}) - Rs. ${i.price}`)
            .join('\n');

        const time = new Date().toLocaleString();

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

        const customerMessage = `
Dear ${name},

✅ Thank you for your order from **Pakistan Mart**!

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

        await sendEmail(process.env.NOTIFY_EMAIL, '🛒 New Order - Pakistan Mart', adminMessage);
        await sendEmail(email, '✅ Your Order Confirmation - Pakistan Mart', customerMessage);

        res.status(201).json({ message: 'Order placed. Confirmation sent to admin and customer.' });
    } catch (err) {
        console.error('❌ Order placement failed', err);
        res.status(500).json({ message: 'Server error. Order not placed.' });
    }
};

// @desc  Fetch all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error('❌ Failed to fetch orders', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc  Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.json({ message: 'Order deleted successfully.' });
    } catch (err) {
        console.error('❌ Failed to delete order', err);
        res.status(500).json({ message: 'Server error' });
    }
};
