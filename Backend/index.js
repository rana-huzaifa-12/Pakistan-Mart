//  Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

//  Route Imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

//  Load .env variables
dotenv.config();

//  Create Express App
const app = express();
app.use(cors({
    origin: 'https://pakistan-mart-kzrs.onrender.com',  // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

//  Serve image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

//  Test Route
app.get('/', (req, res) => {
    res.send('🛒 Shopping Store API is running');
});

//  MongoDB Atlas Connection with async/await
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit the app if DB fails
    }
};

connectDB();

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
