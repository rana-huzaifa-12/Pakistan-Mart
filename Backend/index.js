// Existing imports...
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Shopping Store API is running');
});

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mern-shopping')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Mongo Error:', err));

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
