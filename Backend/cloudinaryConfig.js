// backend/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        // You can change folder based on category or use a default folder
        const folder = req.body.category || 'products';
        return {
            folder,
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: file.originalname.split('.')[0], // filename without extension
        };
    },
});

module.exports = { cloudinary, storage };
